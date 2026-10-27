import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Terminal, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatValue } from '../../lib/executor';

export function TestResultPanel({
  result,
  isRunning,
  isSubmitMode,
}) {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  // Trigger celebratory confetti on all passed submission!
  useEffect(() => {
    if (result && result.allPassed && isSubmitMode) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d4ff', '#22c55e', '#38bdf8', '#fbbf24'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [result, isSubmitMode]);

  // Initial empty state matching LeetCode screenshot
  if (!result && !isRunning) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-center text-slate-400 text-sm">
        <span>You must run your code first</span>
      </div>
    );
  }

  if (isRunning) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Executing JavaScript test cases...
        </span>
      </div>
    );
  }

  // Runtime or Syntax Error
  if (!result.success) {
    return (
      <div className="p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Runtime / Evaluation Error</span>
        </div>
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 whitespace-pre-wrap">
          {result.error}
        </div>
      </div>
    );
  }

  const currentCase = result.results[selectedCaseIdx] || result.results[0];

  return (
    <div className="p-4 space-y-4 font-mono text-xs">
      {/* Top Status Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          {result.allPassed ? (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-base font-bold font-sans">
              <CheckCircle2 className="w-5 h-5" />
              <span>{isSubmitMode ? 'Accepted' : 'All Testcases Passed'}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-base font-bold font-sans">
              <XCircle className="w-5 h-5" />
              <span>Wrong Answer</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-slate-500 text-xs font-sans">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Runtime: <strong className="text-slate-800 dark:text-slate-200">{result.totalRuntime} ms</strong></span>
          </div>
        </div>
      </div>

      {/* Case Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {result.results.map((res, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCaseIdx(idx)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCaseIdx === idx
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                res.passed ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
            <span>Case {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Case Details */}
      {currentCase && (
        <div className="space-y-3">
          {/* Inputs */}
          <div>
            <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">
              Input:
            </span>
            <div className="mt-1 p-2.5 rounded-lg bg-slate-100 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
              {formatValue(currentCase.input)}
            </div>
          </div>

          {/* Actual Output */}
          <div>
            <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">
              Output:
            </span>
            <div
              className={`mt-1 p-2.5 rounded-lg border overflow-x-auto font-bold ${
                currentCase.passed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
              }`}
            >
              {currentCase.error ? currentCase.error : formatValue(currentCase.actual)}
            </div>
          </div>

          {/* Expected Output */}
          <div>
            <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">
              Expected:
            </span>
            <div className="mt-1 p-2.5 rounded-lg bg-slate-100 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
              {formatValue(currentCase.expected)}
            </div>
          </div>
        </div>
      )}

      {/* Stdout Logs */}
      {result.logs && result.logs.length > 0 && (
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-500 font-sans text-xs font-semibold mb-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Stdout:</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 text-xs overflow-x-auto space-y-1">
            {result.logs.map((log, lIdx) => (
              <div key={lIdx}>&gt; {log}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
