import React, { useState } from 'react';
import {
  FileText,
  BookOpen,
  FlaskConical,
  History,
  ThumbsUp,
  ThumbsDown,
  Star,
  Share2,
  HelpCircle,
  Tag,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { DifficultyBadge } from '../home/DifficultyBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function ProblemDescription({
  problem,
  isSolved,
  submissionHistory = [],
}) {
  const [activeTab, setActiveTab] = useState('description');
  const [likes, setLikes] = useState(71420);
  const [dislikes, setDislikes] = useState(210);
  const [userVoted, setUserVoted] = useState(null); // 'like' | 'dislike' | null
  const [isStarred, setIsStarred] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleLike = () => {
    if (userVoted === 'like') {
      setUserVoted(null);
      setLikes((l) => l - 1);
    } else {
      if (userVoted === 'dislike') setDislikes((d) => d - 1);
      setUserVoted('like');
      setLikes((l) => l + 1);
    }
  };

  const handleDislike = () => {
    if (userVoted === 'dislike') {
      setUserVoted(null);
      setDislikes((d) => d - 1);
    } else {
      if (userVoted === 'like') setLikes((l) => l - 1);
      setUserVoted('dislike');
      setDislikes((d) => d + 1);
    }
  };

  const copyExample = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0a0e17] border-r border-slate-200 dark:border-slate-800/80 overflow-hidden">
      {/* Top Description Tabs (matching reference screenshot) */}
      <div className="h-10 border-b border-slate-200 dark:border-slate-800 flex items-center px-2 bg-slate-50/50 dark:bg-[#0d121f] flex-shrink-0">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'description'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Description</span>
        </button>

        <button
          onClick={() => setActiveTab('editorial')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'editorial'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Editorial</span>
        </button>

        <button
          onClick={() => setActiveTab('solutions')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'solutions'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Solutions</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
            activeTab === 'submissions'
              ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-slate-800 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Submissions</span>
          {submissionHistory.length > 0 && (
            <span className="text-[10px] px-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
              {submissionHistory.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-5 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            {/* Title Header */}
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {problem.id}. {problem.title}
                </h1>
                {isSolved && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Solved
                  </span>
                )}
              </div>

              {/* Tags & Pills */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <DifficultyBadge difficulty={problem.difficulty} />
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem Statement Body */}
            <div
              className="problem-text space-y-3 leading-relaxed text-slate-700 dark:text-slate-300"
              dangerouslySetInnerHTML={{ __html: problem.description }}
            />

            {/* Examples */}
            <div className="space-y-4 pt-2">
              {problem.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0f1422] p-4 relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Example {idx + 1}:
                    </span>
                    <button
                      onClick={() =>
                        copyExample(
                          `Input: ${example.input}\nOutput: ${example.output}`,
                          idx
                        )
                      }
                      title="Copy example"
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-opacity p-1"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="font-mono text-xs space-y-1.5 text-slate-800 dark:text-slate-200">
                    <div>
                      <span className="text-slate-400 font-sans font-medium mr-1.5">Input:</span>
                      <code>{example.input}</code>
                    </div>
                    <div>
                      <span className="text-slate-400 font-sans font-medium mr-1.5">Output:</span>
                      <code>{example.output}</code>
                    </div>
                    {example.explanation && (
                      <div className="text-slate-500 dark:text-slate-400 font-sans text-xs pt-1">
                        <span className="font-medium mr-1">Explanation:</span>
                        {example.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Constraints:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-600 dark:text-slate-400">
                {problem.constraints.map((c, i) => (
                  <li key={i}>
                    <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">
                      {c}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Editorial */}
        {activeTab === 'editorial' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Official Solution & Editorial
            </h2>
            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs">
              <strong>Complexity Breakdown:</strong> {problem.editorial?.complexity || 'Time: O(n) | Space: O(n)'}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {problem.editorial?.summary ||
                'To solve this problem efficiently in JavaScript, avoid nested loops that result in O(n²) time. Use appropriate data structures such as Hash Maps or Two Pointers.'}
            </p>
          </div>
        )}

        {/* Tab 3: Solutions */}
        {activeTab === 'solutions' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Community JavaScript Solutions
            </h2>
            {problem.solutions?.map((sol, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f1422] p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                    {sol.title}
                  </span>
                  <div className="flex gap-2 text-[10px] font-mono text-slate-500">
                    <span>{sol.time}</span>
                    <span>•</span>
                    <span>{sol.space}</span>
                  </div>
                </div>
                <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto">
                  <code>{sol.code}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Submissions */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Your Submissions
            </h2>
            {submissionHistory.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No submissions yet for this problem. Click "Submit" to test your code!
              </div>
            ) : (
              <div className="space-y-2">
                {submissionHistory.map((sub, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f1422] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          sub.status === 'Accepted'
                            ? 'text-emerald-500'
                            : 'text-rose-500'
                        }`}
                      >
                        {sub.status}
                      </span>
                      <span className="text-slate-400 font-mono">
                        {sub.runtime} ms
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">
                      {sub.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Bar: Likes, Star, Online Counter (matches reference screenshot) */}
      <div className="h-10 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 bg-slate-50/60 dark:bg-[#0d121f] text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer ${
              userVoted === 'like' ? 'text-cyan-500 dark:text-cyan-400 font-semibold' : ''
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{(likes / 1000).toFixed(1)}K</span>
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors cursor-pointer ${
              userVoted === 'dislike' ? 'text-rose-500 font-semibold' : ''
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5" />
            <span>{dislikes}</span>
          </button>

          <button
            onClick={() => setIsStarred(!isStarred)}
            className={`hover:text-amber-400 transition-colors cursor-pointer ${
              isStarred ? 'text-amber-400 fill-amber-400' : ''
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
            889 Online
          </span>
        </div>
      </div>
    </div>
  );
}
