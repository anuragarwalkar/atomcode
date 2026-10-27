import React, { useState } from 'react';
import { DebuggerControls } from './DebuggerControls';
import { ScopeInspector } from './ScopeInspector';
import { CallStackPanel } from './CallStackPanel';
import { BreakpointsList } from './BreakpointsList';
import { DebugConsole } from './DebugConsole';
import { CheckCircle2, AlertTriangle, Variable, Layers, CircleDot, Terminal } from 'lucide-react';
import { formatValue } from '../../../lib/executor';

export function DebuggerPanel({
  debuggerState,
  breakpoints,
  onToggleBreakpoint,
  onClearBreakpoints,
  onResume,
  onStepOver,
  onStepInto,
  onStepOut,
  onStop,
  isAutoStepping,
  onToggleAutoStep,
  autoStepSpeed,
  onChangeSpeed,
  onClearLogs,
}) {
  const [subTab, setSubTab] = useState('variables'); // 'variables' | 'stack' | 'breakpoints' | 'console'

  if (!debuggerState) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        Debugger is not active. Click the <strong>Debug</strong> button in the top toolbar to start.
      </div>
    );
  }

  const {
    currentLine,
    isFinished,
    error,
    returnValue,
    logs = [],
    scope,
    callStack = [],
    stepCount = 0,
  } = debuggerState;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0a0e17] overflow-hidden">
      {/* Top Debug Controls Header */}
      <DebuggerControls
        currentLine={currentLine}
        isFinished={isFinished}
        onResume={onResume}
        onStepOver={onStepOver}
        onStepInto={onStepInto}
        onStepOut={onStepOut}
        onStop={onStop}
        isAutoStepping={isAutoStepping}
        onToggleAutoStep={onToggleAutoStep}
        autoStepSpeed={autoStepSpeed}
        onChangeSpeed={onChangeSpeed}
        stepCount={stepCount}
      />

      {/* Completion or Error notification banner */}
      {isFinished && (
        <div className="p-3 bg-emerald-500/10 border-b border-emerald-500/20 px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Execution Finished!
            </span>
            <span className="text-slate-600 dark:text-slate-300 font-mono">
              Return Value: <strong className="text-emerald-600 dark:text-emerald-300">{formatValue(returnValue)}</strong>
            </span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-rose-500/10 border-b border-rose-500/20 px-4 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-mono">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Sub-tabs header */}
      <div className="h-8 border-b border-slate-200 dark:border-slate-800 flex items-center px-2 bg-slate-50/70 dark:bg-[#0e1320] flex-shrink-0 gap-1">
        <button
          onClick={() => setSubTab('variables')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
            subTab === 'variables'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Variable className="w-3 h-3 text-cyan-500" />
          <span>Variables</span>
        </button>

        <button
          onClick={() => setSubTab('stack')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
            subTab === 'stack'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3 h-3 text-cyan-500" />
          <span>Call Stack</span>
          {callStack.length > 0 && (
            <span className="text-[10px] text-slate-400">({callStack.length})</span>
          )}
        </button>

        <button
          onClick={() => setSubTab('breakpoints')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
            subTab === 'breakpoints'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CircleDot className="w-3 h-3 text-rose-500" />
          <span>Breakpoints</span>
          <span className="text-[10px] text-slate-400">({breakpoints.size})</span>
        </button>

        <button
          onClick={() => setSubTab('console')}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
            subTab === 'console'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 font-semibold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3 h-3 text-cyan-500" />
          <span>Console</span>
          {logs.length > 0 && (
            <span className="text-[10px] text-slate-400">({logs.length})</span>
          )}
        </button>
      </div>

      {/* Sub-tab Panels */}
      <div className="flex-1 overflow-y-auto">
        {subTab === 'variables' && <ScopeInspector scope={scope} />}
        {subTab === 'stack' && <CallStackPanel callStack={callStack} />}
        {subTab === 'breakpoints' && (
          <BreakpointsList
            breakpoints={breakpoints}
            onToggleBreakpoint={onToggleBreakpoint}
            onClearAll={onClearBreakpoints}
          />
        )}
        {subTab === 'console' && (
          <DebugConsole logs={logs} onClearLogs={onClearLogs} />
        )}
      </div>
    </div>
  );
}
