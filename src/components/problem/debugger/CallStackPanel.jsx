import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export function CallStackPanel({ callStack = [] }) {
  if (callStack.length === 0) {
    return (
      <div className="p-4 text-xs text-slate-400 italic">
        Stack is idle or execution completed.
      </div>
    );
  }

  return (
    <div className="p-3 space-y-1">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5 text-cyan-500" />
        <span>Call Stack</span>
      </div>

      <div className="space-y-1">
        {callStack.map((frame, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono transition-colors ${
              idx === 0
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />}
              <span>{frame.name}</span>
            </div>
            <span className="text-[11px] text-slate-400">line {frame.line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
