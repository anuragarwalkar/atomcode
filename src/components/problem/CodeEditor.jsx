import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Sparkles, Check, AlignLeft, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function CodeEditor({
  code,
  onChange,
  breakpoints = new Set(),
  onToggleBreakpoint,
  currentDebugLine = null,
  fontSize = 14,
}) {
  const { theme } = useTheme();
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Listen for mouse click on the gutter to toggle breakpoints
    editor.onMouseDown((e) => {
      if (e.target.type === monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN) {
        const line = e.target.position?.lineNumber;
        if (line && onToggleBreakpoint) {
          onToggleBreakpoint(line);
        }
      }
    });

    // Custom dark theme with atom cyan highlights
    monaco.editor.defineTheme('atom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00d4ff', fontStyle: 'bold' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'string', foreground: '50fa7b' },
        { token: 'identifier', foreground: 'f8f8f2' },
      ],
      colors: {
        'editor.background': '#0b0f19',
        'editor.foreground': '#f8fafc',
        'editor.lineHighlightBackground': '#141b2a',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#00d4ff',
        'editorGutter.background': '#090d16',
      },
    });

    if (theme === 'dark') {
      monaco.editor.setTheme('atom-dark');
    } else {
      monaco.editor.setTheme('vs');
    }
  };

  // Update Monaco theme when app theme changes
  useEffect(() => {
    if (monacoRef.current) {
      if (theme === 'dark') {
        monacoRef.current.editor.setTheme('atom-dark');
      } else {
        monacoRef.current.editor.setTheme('vs');
      }
    }
  }, [theme]);

  // Update Breakpoint glyphs and Active Debugger line decorations
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return;

    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const newDecorations = [];

    // Add Breakpoints
    for (const line of breakpoints) {
      newDecorations.push({
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: false,
          glyphMarginClassName: 'monaco-breakpoint-glyph',
          glyphMarginHoverMessage: { value: `Breakpoint at line ${line}` },
        },
      });
    }

    // Add Active Execution Line Highlight
    if (currentDebugLine) {
      newDecorations.push({
        range: new monaco.Range(currentDebugLine, 1, currentDebugLine, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-active-line-highlight',
          glyphMarginClassName: 'monaco-active-line-glyph',
        },
      });

      // Keep paused line in view
      editor.revealLineInCenter(currentDebugLine);
    }

    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );
  }, [breakpoints, currentDebugLine]);

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#0b0f19] overflow-hidden">
      {/* Editor Sub-Header (matches reference screenshot) */}
      <div className="h-9 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 bg-slate-50/70 dark:bg-[#0e1320] flex-shrink-0 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Code2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>Code</span>
          </div>

          <div className="h-3 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Language selector (JavaScript) */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800/80 text-[11px] font-mono text-slate-800 dark:text-cyan-400 font-semibold border border-slate-300/60 dark:border-slate-700/60">
            <span>JavaScript (ES6+)</span>
          </div>

          <span className="text-[11px] text-slate-400 flex items-center gap-1 hidden sm:inline-flex">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            Auto-saved
          </span>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleFormatCode}
            title="Format Code"
            className="p-1 rounded text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 w-full relative">
        <Editor
          height="100%"
          language="javascript"
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={handleEditorDidMount}
          theme={theme === 'dark' ? 'atom-dark' : 'vs'}
          options={{
            fontSize: fontSize,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            glyphMargin: true, // Enables gutter margin for breakpoints!
            lineNumbers: 'on',
            lineDecorationsWidth: 6,
            lineNumbersMinChars: 3,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true },
            wordWrap: 'on',
            smoothScrolling: true,
            padding: { top: 8, bottom: 8 },
          }}
        />
      </div>
    </div>
  );
}
