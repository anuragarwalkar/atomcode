import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Variable, Box } from 'lucide-react';

function VariableValue({ value }) {
  if (value === undefined || value === 'undefined') {
    return <span className="text-slate-400 italic">undefined</span>;
  }
  if (value === null || value === 'null') {
    return <span className="text-slate-400 italic">null</span>;
  }
  if (typeof value === 'number') {
    return <span className="text-purple-600 dark:text-purple-400 font-semibold">{value}</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-sky-600 dark:text-sky-400 font-semibold">{String(value)}</span>;
  }
  if (typeof value === 'string') {
    return <span className="text-emerald-600 dark:text-emerald-400">"{value}"</span>;
  }
  if (Array.isArray(value)) {
    return (
      <span className="text-slate-600 dark:text-slate-300">
        [{value.map((v, i) => (
          <span key={i}>
            <VariableValue value={v} />
            {i < value.length - 1 ? ', ' : ''}
          </span>
        ))}]
      </span>
    );
  }
  if (typeof value === 'object') {
    return (
      <span className="text-slate-600 dark:text-slate-300">
        {'{'}
        {Object.entries(value).map(([k, v], i, arr) => (
          <span key={k}>
            <span className="text-cyan-600 dark:text-cyan-400">{k}</span>: <VariableValue value={v} />
            {i < arr.length - 1 ? ', ' : ''}
          </span>
        ))}
        {'}'}
      </span>
    );
  }

  return <span className="text-slate-700 dark:text-slate-300">{String(value)}</span>;
}

function VariableItem({ name, value }) {
  const isExpandable = typeof value === 'object' && value !== null;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="font-mono text-xs py-0.5">
      <div className="flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 px-1 py-0.5 rounded transition-colors">
        {isExpandable ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        ) : (
          <span className="w-3" />
        )}

        <span className="font-semibold text-cyan-600 dark:text-cyan-400">{name}:</span>
        <VariableValue value={value} />
      </div>

      {isExpandable && isExpanded && (
        <div className="pl-6 border-l border-slate-200 dark:border-slate-800 ml-2 mt-0.5 space-y-0.5">
          {Object.entries(value).map(([k, v]) => (
            <VariableItem key={k} name={k} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ScopeInspector({ scope = { local: {}, closure: {}, global: {} } }) {
  const localKeys = Object.keys(scope.local || {});
  const closureKeys = Object.keys(scope.closure || {});
  const globalKeys = Object.keys(scope.global || {});

  const [localOpen, setLocalOpen] = useState(true);
  const [closureOpen, setClosureOpen] = useState(true);
  const [globalOpen, setGlobalOpen] = useState(false);

  return (
    <div className="p-3 space-y-3">
      {/* Local Scope */}
      <div>
        <button
          onClick={() => setLocalOpen(!localOpen)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-cyan-500 mb-1 cursor-pointer select-none"
        >
          {localOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
          <span>Local Scope</span>
          <span className="text-[10px] text-slate-400 font-normal">({localKeys.length})</span>
        </button>

        {localOpen && (
          <div className="pl-2 border-l border-cyan-500/30 space-y-0.5">
            {localKeys.length === 0 ? (
              <span className="text-xs text-slate-400 italic block py-0.5">
                No local variables in current frame
              </span>
            ) : (
              localKeys.map((key) => (
                <VariableItem key={key} name={key} value={scope.local[key]} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Closure Scope */}
      {closureKeys.length > 0 && (
        <div>
          <button
            onClick={() => setClosureOpen(!closureOpen)}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-cyan-500 mb-1 cursor-pointer select-none"
          >
            {closureOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
            <span>Closure Scope</span>
            <span className="text-[10px] text-slate-400 font-normal">({closureKeys.length})</span>
          </button>

          {closureOpen && (
            <div className="pl-2 border-l border-amber-500/30 space-y-0.5">
              {closureKeys.map((key) => (
                <VariableItem key={key} name={key} value={scope.closure[key]} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Global Scope */}
      <div>
        <button
          onClick={() => setGlobalOpen(!globalOpen)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-cyan-500 mb-1 cursor-pointer select-none"
        >
          {globalOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3 text-slate-400" />}
          <span>Global Scope</span>
          <span className="text-[10px] text-slate-400 font-normal">({globalKeys.length})</span>
        </button>

        {globalOpen && (
          <div className="pl-2 border-l border-slate-300 dark:border-slate-800 space-y-0.5 max-h-36 overflow-y-auto">
            {globalKeys.length === 0 ? (
              <span className="text-xs text-slate-400 italic block py-0.5">
                No custom global variables
              </span>
            ) : (
              globalKeys.map((key) => (
                <VariableItem key={key} name={key} value={scope.global[key]} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
