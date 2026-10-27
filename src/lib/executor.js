// Deep comparison utility for test evaluation
export function deepEqual(a, b) {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;

  if (a === null || b === null || typeof a !== 'object') {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

export function formatValue(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

/**
 * Fast multi-testcase runner for Run and Submit
 */
export function executeCode(userCode, functionName, testCases) {
  const capturedLogs = [];
  
  // Custom console capture
  const customConsole = {
    log: (...args) => {
      capturedLogs.push(
        args.map(arg => {
          if (typeof arg === 'object') {
            try { return JSON.stringify(arg); } catch { return String(arg); }
          }
          return String(arg);
        }).join(' ')
      );
    },
    warn: (...args) => customConsole.log('[WARN]', ...args),
    error: (...args) => customConsole.log('[ERROR]', ...args),
    info: (...args) => customConsole.log('[INFO]', ...args),
  };

  try {
    // Construct runner script
    const wrappedCode = `
      ${userCode}
      if (typeof ${functionName} !== 'function') {
        throw new Error("Function '${functionName}' is not defined. Please define '${functionName}'.");
      }
      return ${functionName};
    `;

    // Instantiate user function
    const fnFactory = new Function('console', wrappedCode);
    const userFn = fnFactory(customConsole);

    const results = [];
    let allPassed = true;
    let totalRuntime = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      // Deep clone inputs so user function doesn't mutate testcase permanently across runs
      const clonedArgs = JSON.parse(JSON.stringify(tc.input));
      
      const start = performance.now();
      let actualOutput;
      let error = null;
      let passed = false;

      try {
        actualOutput = userFn(...clonedArgs);
        passed = deepEqual(actualOutput, tc.expected);
      } catch (err) {
        error = err.message || String(err);
        passed = false;
      }
      
      const runtime = Math.max(0.1, Number((performance.now() - start).toFixed(2)));
      totalRuntime += runtime;

      if (!passed) {
        allPassed = false;
      }

      results.push({
        index: i + 1,
        input: tc.input,
        expected: tc.expected,
        actual: actualOutput,
        passed,
        runtime,
        error
      });
    }

    return {
      success: true,
      allPassed,
      results,
      totalRuntime: Number(totalRuntime.toFixed(2)),
      logs: capturedLogs,
    };
  } catch (err) {
    return {
      success: false,
      allPassed: false,
      error: err.message || String(err),
      results: [],
      totalRuntime: 0,
      logs: capturedLogs,
    };
  }
}
