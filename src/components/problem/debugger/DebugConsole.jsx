import React from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export function DebugConsole({ logs = [], onClearLogs }) {
  return (
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
          <span>Debugger Console ({logs.length})</span>
        </div>
        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="min-h-[120px] max-h-[220px] overflow-y-auto p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs space-y-1.5 border border-slate-800">
        {logs.length === 0 ? (
          <div className="text-slate-500 italic">
            Console output from your code will appear here line-by-line as you step...
          </div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-2 hover:bg-slate-900/60 px-1 py-0.5 rounded">
              <span className="text-cyan-500 select-none">&gt;</span>
              <span className="flex-1 whitespace-pre-wrap">{log.text}</span>
              {log.line && (
                <span className="text-[10px] text-slate-500 select-none">
                  line {log.line}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
