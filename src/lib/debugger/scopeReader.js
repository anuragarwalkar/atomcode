/**
 * Extracts and formats variables from the JS-Interpreter scope chain
 */
export function extractScopeVariables(interpreter, maxDepth = 2) {
  if (!interpreter) return { local: {}, closure: {}, global: {} };

  const scope = interpreter.getScope();
  if (!scope) return { local: {}, closure: {}, global: {} };

  const standardGlobals = new Set([
    'window', 'self', 'this', 'arguments', 'Infinity', 'NaN', 'undefined',
    'Object', 'Function', 'Array', 'String', 'Boolean', 'Number', 'Date',
    'RegExp', 'Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError',
    'TypeError', 'URIError', 'Math', 'JSON', 'console', 'eval', 'parseInt',
    'parseFloat', 'isNaN', 'isFinite', 'escape', 'unescape'
  ]);

  const safeConvert = (pseudoVal, depth = 0) => {
    if (pseudoVal === undefined) return 'undefined';
    if (pseudoVal === null) return 'null';

    try {
      const nativeVal = interpreter.pseudoToNative(pseudoVal);
      if (typeof nativeVal === 'function') {
        return '[Function]';
      }
      return nativeVal;
    } catch {
      if (typeof pseudoVal === 'object') {
        if (pseudoVal.data !== undefined) return pseudoVal.data;
        return '[Object]';
      }
      return String(pseudoVal);
    }
  };

  const local = {};
  const closure = {};
  const global = {};

  let currentScope = scope;
  let scopeLevel = 0;

  while (currentScope) {
    const isGlobal = !currentScope.parentScope;
    const obj = currentScope.object;

    if (obj && obj.properties) {
      const propNames = Object.keys(obj.properties);
      for (const key of propNames) {
        if (key.startsWith('__')) continue; // Skip internal harness variables

        if (isGlobal) {
          if (!standardGlobals.has(key)) {
            global[key] = safeConvert(obj.properties[key]);
          }
        } else if (scopeLevel === 0) {
          if (key !== 'this' && key !== 'arguments') {
            local[key] = safeConvert(obj.properties[key]);
          }
        } else {
          if (key !== 'this' && key !== 'arguments') {
            closure[key] = safeConvert(obj.properties[key]);
          }
        }
      }
    }

    currentScope = currentScope.parentScope;
    scopeLevel++;
  }

  return { local, closure, global };
}
