import Interpreter from 'js-interpreter';
import { extractScopeVariables } from './scopeReader';

/**
 * Creates and manages a live debugging session with Neil Fraser's JS-Interpreter
 */
export class DebuggerSession {
  constructor({ userCode, functionName, testArgs, onLog }) {
    this.userCode = userCode;
    this.functionName = functionName;
    this.testArgs = testArgs || [];
    this.onLog = onLog || (() => {});
    
    this.userLineCount = userCode.split('\n').length;
    this.stepCount = 0;
    this.maxSteps = 50000;
    this.isFinished = false;
    this.error = null;
    this.returnValue = undefined;
    this.currentLine = 1;
    this.logs = [];

    this._initInterpreter();
  }

  _initInterpreter() {
    // Format input arguments safely for execution
    const serializedArgs = this.testArgs
      .map(arg => JSON.stringify(arg))
      .join(', ');

    // Harness script: user's code followed by test invocation
    this.harness = `
${this.userCode}
var __atomResult = ${this.functionName}(${serializedArgs});
`;

    const initFunc = (interp, globalObject) => {
      // Create custom console
      const consoleObj = interp.createObjectProto(interp.OBJECT_PROTO);
      interp.setProperty(globalObject, 'console', consoleObj);

      const logHandler = (...args) => {
        const nativeArgs = args.map(arg => {
          try {
            return interp.pseudoToNative(arg);
          } catch {
            return String(arg);
          }
        });
        const formatted = nativeArgs.map(item => {
          if (typeof item === 'object') {
            try { return JSON.stringify(item); } catch { return String(item); }
          }
          return String(item);
        }).join(' ');

        const logEntry = {
          text: formatted,
          line: this.currentLine,
          timestamp: new Date().toLocaleTimeString(),
        };
        this.logs.push(logEntry);
        this.onLog(logEntry);
      };

      interp.setProperty(consoleObj, 'log', interp.createNativeFunction(logHandler));
      interp.setProperty(consoleObj, 'warn', interp.createNativeFunction(logHandler));
      interp.setProperty(consoleObj, 'error', interp.createNativeFunction(logHandler));
      interp.setProperty(consoleObj, 'info', interp.createNativeFunction(logHandler));
    };

    try {
      this.interpreter = new Interpreter(this.harness, initFunc);
      // Advance to the first executable statement
      this._advanceToNextLine(0);
    } catch (err) {
      this.error = err.message || String(err);
      this.isFinished = true;
    }
  }

  /**
   * Helper to get active AST line from top of stateStack
   */
  _getActiveLine() {
    if (!this.interpreter || !this.interpreter.stateStack) return null;
    const stack = this.interpreter.stateStack;
    for (let i = stack.length - 1; i >= 0; i--) {
      const state = stack[i];
      if (state.node && state.node.loc && state.node.loc.start) {
        const line = state.node.loc.start.line;
        // User code lines are 1-indexed (lines 1 to this.userLineCount)
        if (line >= 1 && line <= this.userLineCount) {
          return line;
        }
      }
    }
    return null;
  }

  /**
   * Helper to get call stack frame names and lines
   */
  _getCallStack() {
    if (!this.interpreter || !this.interpreter.stateStack) return [];
    const stack = this.interpreter.stateStack;
    const frames = [];

    for (let i = stack.length - 1; i >= 0; i--) {
      const state = stack[i];
      if (state.node && state.node.loc && state.node.loc.start) {
        const line = state.node.loc.start.line;
        if (line >= 1 && line <= this.userLineCount) {
          let funcName = '(anonymous)';
          if (state.scope && state.scope.object && state.scope.object.properties) {
            if (state.scope.parentScope) {
              funcName = this.functionName;
            }
          }
          frames.push({
            name: funcName,
            line,
            depth: i,
          });
        }
      }
    }

    // Deduplicate consecutive identical lines in stack
    const deduped = [];
    for (const f of frames) {
      if (!deduped.length || deduped[deduped.length - 1].line !== f.line) {
        deduped.push(f);
      }
    }
    return deduped;
  }

  /**
   * Advance interpreter until currentLine changes from startLine
   */
  _advanceToNextLine(startLine, maxDepth = Infinity) {
    if (this.isFinished) return;

    while (this.stepCount < this.maxSteps) {
      let hasMore;
      try {
        hasMore = this.interpreter.step();
      } catch (err) {
        this.error = err.message || String(err);
        this.isFinished = true;
        return;
      }

      this.stepCount++;

      if (!hasMore) {
        this._finalize();
        return;
      }

      const line = this._getActiveLine();
      const currentDepth = this.interpreter.stateStack.length;

      if (line && line !== startLine && currentDepth <= maxDepth) {
        this.currentLine = line;
        return;
      }
    }

    if (this.stepCount >= this.maxSteps) {
      this.error = 'Maximum execution step limit reached (potential infinite loop).';
      this.isFinished = true;
    }
  }

  _finalize() {
    this.isFinished = true;
    this.currentLine = null;
    try {
      const rawRes = this.interpreter.getValueFromScope('__atomResult');
      if (rawRes !== undefined) {
        this.returnValue = this.interpreter.pseudoToNative(rawRes);
      }
    } catch {
      // In case __atomResult is not set or throws
    }
  }

  /**
   * Step Into (↧): Advance to the very next executable line
   */
  stepInto(breakpoints = new Set()) {
    if (this.isFinished) return this.getState();
    const startLine = this.currentLine;
    this._advanceToNextLine(startLine, Infinity);

    return this.getState();
  }

  /**
   * Step Over (↷): Advance to next line at the current or shallower call-stack depth
   */
  stepOver(breakpoints = new Set()) {
    if (this.isFinished) return this.getState();
    const startLine = this.currentLine;
    const startDepth = this.interpreter.stateStack ? this.interpreter.stateStack.length : 1;
    this._advanceToNextLine(startLine, startDepth);

    return this.getState();
  }

  /**
   * Step Out (↥): Advance until current function frame pops
   */
  stepOut() {
    if (this.isFinished) return this.getState();
    const startDepth = this.interpreter.stateStack ? this.interpreter.stateStack.length : 1;
    const targetDepth = Math.max(1, startDepth - 2);

    while (!this.isFinished && this.stepCount < this.maxSteps) {
      let hasMore;
      try {
        hasMore = this.interpreter.step();
      } catch (err) {
        this.error = err.message || String(err);
        this.isFinished = true;
        break;
      }
      this.stepCount++;

      if (!hasMore) {
        this._finalize();
        break;
      }

      const currentDepth = this.interpreter.stateStack ? this.interpreter.stateStack.length : 0;
      const line = this._getActiveLine();
      if (currentDepth <= targetDepth && line) {
        this.currentLine = line;
        break;
      }
    }

    return this.getState();
  }

  /**
   * Resume / Continue (▶): Run until a breakpoint is encountered or finished
   */
  resume(breakpoints = new Set()) {
    if (this.isFinished) return this.getState();
    const startLine = this.currentLine;

    // First advance at least one step away from current line
    this._advanceToNextLine(startLine, Infinity);

    // Keep stepping until hitting a breakpoint or finishing
    while (!this.isFinished && this.stepCount < this.maxSteps) {
      if (this.currentLine && breakpoints.has(this.currentLine)) {
        // Paused at breakpoint!
        return this.getState();
      }
      const cur = this.currentLine;
      this._advanceToNextLine(cur, Infinity);
    }

    return this.getState();
  }

  /**
   * Snapshot of debugger state
   */
  getState() {
    const scope = this.interpreter ? extractScopeVariables(this.interpreter) : { local: {}, closure: {}, global: {} };
    const callStack = this._getCallStack();

    return {
      currentLine: this.currentLine,
      isFinished: this.isFinished,
      error: this.error,
      returnValue: this.returnValue,
      logs: this.logs,
      scope,
      callStack,
      stepCount: this.stepCount,
    };
  }
}
