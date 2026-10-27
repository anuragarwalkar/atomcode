import React from 'react';
import { formatValue } from '../../lib/executor';

export function TestCasePanel({
  testCases = [],
  selectedCaseIndex,
  onSelectCase,
  customInput,
  onChangeCustomInput,
}) {
  const currentCase = testCases[selectedCaseIndex] || testCases[0];

  return (
    <div className="p-4 space-y-4">
      {/* Testcase Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        {testCases.map((tc, idx) => (
          <button
            key={idx}
            onClick={() => onSelectCase(idx)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCaseIndex === idx
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-cyan-400 border border-slate-300 dark:border-slate-600'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
            }`}
          >
            Case {idx + 1}
          </button>
        ))}
      </div>

      {/* Input Argument Displays */}
      {currentCase && (
        <div className="space-y-3 font-mono text-xs">
          {currentCase.input.map((param, pIdx) => (
            <div key={pIdx} className="space-y-1">
              <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">
                param_{pIdx + 1} =
              </span>
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-[#090d16] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
                {formatValue(param)}
              </div>
            </div>
          ))}

          {/* Expected Output */}
          <div className="space-y-1 pt-1">
            <span className="text-slate-500 font-sans text-[11px] font-semibold uppercase tracking-wider">
              Expected =
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 overflow-x-auto font-semibold">
              {formatValue(currentCase.expected)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
