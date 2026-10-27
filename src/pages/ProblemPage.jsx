import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROBLEMS } from '../data/problems';
import { MainActionToolbar } from '../components/problem/MainActionToolbar';
import { ProblemDescription } from '../components/problem/ProblemDescription';
import { CodeEditor } from '../components/problem/CodeEditor';
import { TestCasePanel } from '../components/problem/TestCasePanel';
import { TestResultPanel } from '../components/problem/TestResultPanel';
import { DebuggerPanel } from '../components/problem/debugger/DebuggerPanel';
import { executeCode } from '../lib/executor';
import { DebuggerSession } from '../lib/debugger/interpreterEngine';
import { Code2, Play, Bug, CheckSquare, Terminal } from 'lucide-react';

export function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const problemId = Number(id) || 1;
  const problem = PROBLEMS.find((p) => p.id === problemId) || PROBLEMS[0];

  // User Code State (persisted per problem in localStorage)
  const [code, setCode] = useState(() => {
    try {
      const saved = localStorage.getItem(`atomcode-code-${problem.id}`);
      return saved || problem.starterCode;
    } catch {
      return problem.starterCode;
    }
  });

  // When switching problems, update code
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`atomcode-code-${problem.id}`);
      setCode(saved || problem.starterCode);
    } catch {
      setCode(problem.starterCode);
    }
    // Clean up debugger on problem change
    stopDebugging();
    setRunResult(null);
  }, [problem.id]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    try {
      localStorage.setItem(`atomcode-code-${problem.id}`, newCode);
    } catch (e) {
      console.warn('Could not save code to localStorage', e);
    }
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code to starter template?')) {
      setCode(problem.starterCode);
      try {
        localStorage.removeItem(`atomcode-code-${problem.id}`);
      } catch (e) {}
    }
  };

  // Solved State
  const [isSolved, setIsSolved] = useState(() => {
    try {
      const saved = localStorage.getItem('atomcode-solved');
      const solvedList = saved ? JSON.parse(saved) : [];
      return solvedList.includes(problem.id);
    } catch {
      return false;
    }
  });

  const markProblemSolved = () => {
    try {
      const saved = localStorage.getItem('atomcode-solved');
      const solvedList = saved ? JSON.parse(saved) : [];
      if (!solvedList.includes(problem.id)) {
        const updated = [...solvedList, problem.id];
        localStorage.setItem('atomcode-solved', JSON.stringify(updated));
        setIsSolved(true);
      }
    } catch (e) {
      console.warn('Could not update solved status', e);
    }
  };

  // Submission History
  const [submissionHistory, setSubmissionHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(`atomcode-submissions-${problem.id}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addSubmissionRecord = (status, runtime) => {
    const record = {
      status,
      runtime,
      timestamp: new Date().toLocaleTimeString(),
    };
    const updated = [record, ...submissionHistory.slice(0, 9)];
    setSubmissionHistory(updated);
    try {
      localStorage.setItem(`atomcode-submissions-${problem.id}`, JSON.stringify(updated));
    } catch (e) {}
  };

  // Testcase Panel State
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  // Bottom Tabs State ('testcase' | 'result' | 'debugger')
  const [bottomTab, setBottomTab] = useState('testcase');

  // Fast Runner State
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [isSubmitMode, setIsSubmitMode] = useState(false);

  // Live Debugger State
  const [isDebugging, setIsDebugging] = useState(false);
  const [debuggerState, setDebuggerState] = useState(null);
  const [breakpoints, setBreakpoints] = useState(new Set());
  const [isAutoStepping, setIsAutoStepping] = useState(false);
  const [autoStepSpeed, setAutoStepSpeed] = useState(400); // ms per step

  const debuggerSessionRef = useRef(null);
  const autoStepTimerRef = useRef(null);

  // Breakpoints toggling
  const handleToggleBreakpoint = (line) => {
    setBreakpoints((prev) => {
      const next = new Set(prev);
      if (next.has(line)) {
        next.delete(line);
      } else {
        next.add(line);
      }
      return next;
    });
  };

  const handleClearBreakpoints = () => {
    setBreakpoints(new Set());
  };

  // Fast Run Action
  const handleRun = () => {
    stopDebugging();
    setIsRunning(true);
    setIsSubmitMode(false);
    setBottomTab('result');

    setTimeout(() => {
      const currentCase = problem.testCases[selectedCaseIndex] || problem.testCases[0];
      const result = executeCode(code, problem.functionName, [currentCase]);
      setRunResult(result);
      setIsRunning(false);
    }, 150);
  };

  // Submit Action (runs sample testcases + hidden testcases)
  const handleSubmit = () => {
    stopDebugging();
    setIsRunning(true);
    setIsSubmitMode(true);
    setBottomTab('result');

    setTimeout(() => {
      const allTests = [...problem.testCases, ...(problem.hiddenTestCases || [])];
      const result = executeCode(code, problem.functionName, allTests);
      setRunResult(result);
      setIsRunning(false);

      if (result.success && result.allPassed) {
        markProblemSolved();
        addSubmissionRecord('Accepted', result.totalRuntime);
      } else {
        addSubmissionRecord('Wrong Answer', result.totalRuntime || 0);
      }
    }, 250);
  };

  // Launch Live JS-Interpreter Debugger
  const handleStartDebug = () => {
    stopDebugging();
    const currentCase = problem.testCases[selectedCaseIndex] || problem.testCases[0];

    const session = new DebuggerSession({
      userCode: code,
      functionName: problem.functionName,
      testArgs: currentCase.input,
      onLog: (log) => {
        setDebuggerState((prev) => prev ? { ...prev, logs: [...prev.logs, log] } : prev);
      },
    });

    debuggerSessionRef.current = session;
    setIsDebugging(true);
    setBottomTab('debugger');
    setDebuggerState(session.getState());
  };

  const stopDebugging = useCallback(() => {
    if (autoStepTimerRef.current) {
      clearInterval(autoStepTimerRef.current);
      autoStepTimerRef.current = null;
    }
    debuggerSessionRef.current = null;
    setIsDebugging(false);
    setIsAutoStepping(false);
    setDebuggerState(null);
  }, []);

  const handleResume = () => {
    if (!debuggerSessionRef.current) return;
    const newState = debuggerSessionRef.current.resume(breakpoints);
    setDebuggerState(newState);
    if (newState.isFinished) {
      setIsAutoStepping(false);
    }
  };

  const handleStepOver = () => {
    if (!debuggerSessionRef.current) return;
    const newState = debuggerSessionRef.current.stepOver(breakpoints);
    setDebuggerState(newState);
    if (newState.isFinished) {
      setIsAutoStepping(false);
    }
  };

  const handleStepInto = () => {
    if (!debuggerSessionRef.current) return;
    const newState = debuggerSessionRef.current.stepInto(breakpoints);
    setDebuggerState(newState);
    if (newState.isFinished) {
      setIsAutoStepping(false);
    }
  };

  const handleStepOut = () => {
    if (!debuggerSessionRef.current) return;
    const newState = debuggerSessionRef.current.stepOut();
    setDebuggerState(newState);
    if (newState.isFinished) {
      setIsAutoStepping(false);
    }
  };

  const handleToggleAutoStep = () => {
    if (isAutoStepping) {
      setIsAutoStepping(false);
      if (autoStepTimerRef.current) {
        clearInterval(autoStepTimerRef.current);
        autoStepTimerRef.current = null;
      }
    } else {
      setIsAutoStepping(true);
    }
  };

  // Auto-step effect loop
  useEffect(() => {
    if (isAutoStepping && debuggerSessionRef.current && !debuggerState?.isFinished) {
      autoStepTimerRef.current = setInterval(() => {
        if (!debuggerSessionRef.current) {
          clearInterval(autoStepTimerRef.current);
          return;
        }
        const state = debuggerSessionRef.current.stepOver(breakpoints);
        setDebuggerState(state);
        if (state.isFinished || (state.currentLine && breakpoints.has(state.currentLine))) {
          setIsAutoStepping(false);
          clearInterval(autoStepTimerRef.current);
          autoStepTimerRef.current = null;
        }
      }, autoStepSpeed);

      return () => {
        if (autoStepTimerRef.current) {
          clearInterval(autoStepTimerRef.current);
          autoStepTimerRef.current = null;
        }
      };
    }
  }, [isAutoStepping, autoStepSpeed, breakpoints, debuggerState?.isFinished]);

  const handleClearDebugLogs = () => {
    if (debuggerSessionRef.current) {
      debuggerSessionRef.current.logs = [];
      setDebuggerState((prev) => prev ? { ...prev, logs: [] } : prev);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 dark:bg-[#070a12] text-slate-900 dark:text-slate-100 overflow-hidden select-none">
      {/* Top Main Toolbar */}
      <MainActionToolbar
        currentProblem={problem}
        allProblems={PROBLEMS}
        onRun={handleRun}
        onDebug={handleStartDebug}
        onSubmit={handleSubmit}
        onResetCode={handleResetCode}
        isRunning={isRunning}
        isDebugging={isDebugging}
        isSolved={isSolved}
      />

      {/* Main Resizable Split-Pane Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-2 gap-2">
        {/* Left Panel: Problem Description & Tabs */}
        <div className="w-full lg:w-[48%] h-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col bg-white dark:bg-[#0a0e17]">
          <ProblemDescription
            problem={problem}
            isSolved={isSolved}
            submissionHistory={submissionHistory}
          />
        </div>

        {/* Right Panel: Editor (Top) & Work Area (Bottom) */}
        <div className="w-full lg:w-[52%] h-full flex flex-col gap-2 overflow-hidden">
          {/* Top Half: Monaco Code Editor */}
          <div className="flex-1 min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col bg-white dark:bg-[#0b0f19]">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              breakpoints={breakpoints}
              onToggleBreakpoint={handleToggleBreakpoint}
              currentDebugLine={debuggerState?.currentLine}
            />
          </div>

          {/* Bottom Half: Testcase / Test Result / Live Debugger */}
          <div className="h-[280px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col bg-white dark:bg-[#0a0e17]">
            {/* Work Area Tabs Header */}
            <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 bg-slate-50/70 dark:bg-[#0e1320] flex-shrink-0">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setBottomTab('testcase')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    bottomTab === 'testcase'
                      ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Testcase</span>
                </button>

                <button
                  onClick={() => setBottomTab('result')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    bottomTab === 'result'
                      ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-sky-500" />
                  <span>Test Result</span>
                  {runResult && (
                    <span
                      className={`w-2 h-2 rounded-full ${
                        runResult.allPassed ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  )}
                </button>

                <button
                  onClick={() => setBottomTab('debugger')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    bottomTab === 'debugger'
                      ? 'text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Bug className="w-3.5 h-3.5 text-amber-500" />
                  <span>Live Debugger</span>
                  {isDebugging && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              </div>

              {/* Gutter Breakpoint reminder */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Breakpoints:</span>
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  {breakpoints.size}
                </span>
              </div>
            </div>

            {/* Work Area Content */}
            <div className="flex-1 overflow-y-auto">
              {bottomTab === 'testcase' && (
                <TestCasePanel
                  testCases={problem.testCases}
                  selectedCaseIndex={selectedCaseIndex}
                  onSelectCase={setSelectedCaseIndex}
                />
              )}

              {bottomTab === 'result' && (
                <TestResultPanel
                  result={runResult}
                  isRunning={isRunning}
                  isSubmitMode={isSubmitMode}
                />
              )}

              {bottomTab === 'debugger' && (
                <DebuggerPanel
                  debuggerState={debuggerState}
                  breakpoints={breakpoints}
                  onToggleBreakpoint={handleToggleBreakpoint}
                  onClearBreakpoints={handleClearBreakpoints}
                  onResume={handleResume}
                  onStepOver={handleStepOver}
                  onStepInto={handleStepInto}
                  onStepOut={handleStepOut}
                  onStop={stopDebugging}
                  isAutoStepping={isAutoStepping}
                  onToggleAutoStep={handleToggleAutoStep}
                  autoStepSpeed={autoStepSpeed}
                  onChangeSpeed={setAutoStepSpeed}
                  onClearLogs={handleClearDebugLogs}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
