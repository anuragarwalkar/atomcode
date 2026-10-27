import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({
  className,
  variant = 'default',
  size = 'default',
  disabled,
  children,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer';

  const variants = {
    default: 'bg-slate-800 text-white hover:bg-slate-700 shadow-sm border border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700',
    primary: 'bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 shadow-md shadow-cyan-500/20 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700/60',
    ghost: 'text-slate-700 hover:bg-slate-200/60 dark:text-slate-300 dark:hover:bg-slate-800/60',
    outline: 'border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-200',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 font-semibold',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-600/20 font-semibold',
    debug: 'bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 shadow-md shadow-amber-500/25',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-8',
    default: 'text-sm px-3.5 py-2 gap-2 h-9',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-11',
    icon: 'h-9 w-9 p-0',
    iconSm: 'h-7 w-7 p-0',
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
