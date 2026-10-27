import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Bug,
  RotateCcw,
  Sun,
  Moon,
  List,
  Sparkles,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export function MainActionToolbar({
  currentProblem,
  allProblems = [],
  onRun,
  onDebug,
  onSubmit,
  onResetCode,
  isRunning,
  isDebugging,
  isSolved,
}) {
  const { theme, toggleTheme } = useTheme();

  const currentIndex = allProblems.findIndex((p) => p.id === currentProblem.id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  return (
    <header className="h-12 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0a0e17] px-3 flex items-center justify-between z-30 select-none">
      {/* Left: Problem list link & Navigator */}
      <div className="flex items-center gap-2">
        <Link
          to="/"
          title="Back to Problem List"
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-medium"
        >
          <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
          <List className="w-4 h-4 ml-1" />
          <span className="hidden sm:inline">Problem List</span>
        </Link>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-1">
          {prevProblem ? (
            <Link
              to={`/problem/${prevProblem.id}`}
              title={`Previous: ${prevProblem.title}`}
              className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          ) : (
            <span className="p-1 text-slate-300 dark:text-slate-700 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </span>
          )}

          {nextProblem ? (
            <Link
              to={`/problem/${nextProblem.id}`}
              title={`Next: ${nextProblem.title}`}
              className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="p-1 text-slate-300 dark:text-slate-700 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden md:inline truncate max-w-[200px]">
          {currentProblem.id}. {currentProblem.title}
        </span>

        {isSolved && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            Solved
          </span>
        )}
      </div>

      {/* Center: Action Buttons [Run] [Debug] [Submit] */}
      <div className="flex items-center gap-2">
        {/* Run Button */}
        <Button
          size="sm"
          variant="secondary"
          onClick={onRun}
          disabled={isRunning || isDebugging}
          className="text-xs font-semibold px-3 py-1.5 h-8 gap-1.5"
          title="Run testcase"
        >
          <Play className="w-3.5 h-3.5 fill-current text-slate-700 dark:text-slate-300" />
          <span>Run</span>
        </Button>

        {/* Live Debugger Button (JS-Interpreter) */}
        <Button
          size="sm"
          variant={isDebugging ? 'debug' : 'secondary'}
          onClick={onDebug}
          disabled={isRunning}
          className={`text-xs font-semibold px-3 py-1.5 h-8 gap-1.5 transition-all ${
            isDebugging
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'hover:border-amber-500/40 hover:text-amber-500 dark:hover:text-amber-400'
          }`}
          title="Launch Live Step-by-Step JS-Interpreter Debugger"
        >
          <Bug className="w-3.5 h-3.5" />
          <span>{isDebugging ? 'Debugging...' : 'Debug'}</span>
        </Button>

        {/* Submit Button */}
        <Button
          size="sm"
          variant="success"
          onClick={onSubmit}
          disabled={isRunning || isDebugging}
          className="text-xs font-bold px-3.5 py-1.5 h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20"
          title="Submit solution against all testcases"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Submit</span>
        </Button>
      </div>

      {/* Right: Reset + Theme + Profile */}
      <div className="flex items-center gap-2">
        <Button
          size="iconSm"
          variant="ghost"
          onClick={onResetCode}
          title="Reset starter template"
          className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>

        <Button
          size="iconSm"
          variant="ghost"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          className="text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </Button>

        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
          JS
        </div>
      </div>
    </header>
  );
}
