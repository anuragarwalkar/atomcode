import React from 'react';
import {
  Play,
  Pause,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Square,
  FastForward,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../ui/Button';

export function DebuggerControls({
  currentLine,
  isFinished,
  onResume,
  onStepOver,
  onStepInto,
  onStepOut,
  onStop,
  isAutoStepping,
  onToggleAutoStep,
  autoStepSpeed,
  onChangeSpeed,
  stepCount = 0,
}) {
  return (
    <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
      {/* Left: Stepping Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Resume (▶) */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onResume}
          disabled={isFinished}
          className="h-7 px-2.5 text-xs gap-1 border-amber-500/30 hover:border-amber-500"
          title="Resume execution to next breakpoint (F8)"
        >
          <Play className="w-3 h-3 fill-current text-amber-500" />
          <span className="font-semibold">Resume</span>
        </Button>

        {/* Step Over (↷) */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onStepOver}
          disabled={isFinished}
          className="h-7 px-2.5 text-xs gap-1"
          title="Step Over to next line in current function (F10)"
        >
          <ArrowRight className="w-3 h-3 text-cyan-400" />
          <span>Step Over</span>
        </Button>

        {/* Step Into (↧) */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onStepInto}
          disabled={isFinished}
          className="h-7 px-2.5 text-xs gap-1"
          title="Step Into function call (F11)"
        >
          <ArrowDown className="w-3 h-3 text-emerald-400" />
          <span>Step Into</span>
        </Button>

        {/* Step Out (↥) */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onStepOut}
          disabled={isFinished}
          className="h-7 px-2.5 text-xs gap-1"
          title="Step Out of current function (Shift+F11)"
        >
          <ArrowUp className="w-3 h-3 text-purple-400" />
          <span>Step Out</span>
        </Button>

        {/* Auto-Step / Visualizer Mode */}
        <Button
          size="sm"
          variant={isAutoStepping ? 'debug' : 'secondary'}
          onClick={onToggleAutoStep}
          disabled={isFinished}
          className={`h-7 px-2.5 text-xs gap-1 transition-all ${
            isAutoStepping ? 'bg-amber-500 text-slate-950 font-bold' : ''
          }`}
          title="Toggle Auto-Play Visualizer"
        >
          {isAutoStepping ? (
            <>
              <Pause className="w-3 h-3 fill-current" />
              <span>Pause Auto</span>
            </>
          ) : (
            <>
              <FastForward className="w-3 h-3 text-amber-500" />
              <span>Auto-Play</span>
            </>
          )}
        </Button>

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800/80 px-2 py-0.5 rounded text-[11px] font-mono">
          <span className="text-slate-500 font-sans text-[10px]">Speed:</span>
          <select
            value={autoStepSpeed}
            onChange={(e) => onChangeSpeed(Number(e.target.value))}
            className="bg-transparent border-none text-slate-800 dark:text-slate-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value={800} className="dark:bg-slate-900">Slow (0.8s)</option>
            <option value={400} className="dark:bg-slate-900">Normal (0.4s)</option>
            <option value={150} className="dark:bg-slate-900">Fast (0.15s)</option>
          </select>
        </div>

        {/* Stop (⏹) */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onStop}
          className="h-7 px-2 text-xs text-rose-500 hover:bg-rose-500/10 hover:text-rose-600 gap-1"
          title="Stop debugging session"
        >
          <Square className="w-3 h-3 fill-current" />
          <span>Stop</span>
        </Button>
      </div>

      {/* Right: Line Status indicator */}
      <div className="flex items-center gap-2">
        {isFinished ? (
          <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Finished ({stepCount} steps)
          </span>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-slate-600 dark:text-slate-300">
              Paused at line <strong className="text-amber-500 font-bold">{currentLine || 1}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
