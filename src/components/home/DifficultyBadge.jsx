import React from 'react';
import { Badge } from '../ui/Badge';

export function DifficultyBadge({ difficulty, className }) {
  const diff = difficulty?.toLowerCase() || 'easy';

  const dotColors = {
    easy: 'bg-emerald-500',
    medium: 'bg-amber-500',
    hard: 'bg-rose-500',
  };

  return (
    <Badge variant={diff} className={className}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColors[diff] || 'bg-slate-400'}`} />
      {difficulty}
    </Badge>
  );
}
