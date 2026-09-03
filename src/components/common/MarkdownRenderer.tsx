import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose-markdown text-zinc-800 dark:text-zinc-200 text-xs sm:text-[13px] leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2.5 last:mb-0 leading-relaxed">{children}</p>,
          strong: ({ children }) => <strong className="font-bold text-zinc-950 dark:text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-zinc-700 dark:text-zinc-300">{children}</em>,
          h1: ({ children }) => <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mt-3 mb-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mt-3 mb-1.5">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mt-2 mb-1">{children}</h3>,
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 mb-2.5 marker:text-purple-500">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 mb-2.5 marker:text-purple-500">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-purple-500 pl-3 py-1 my-2 text-zinc-600 dark:text-zinc-300 italic bg-purple-50/40 dark:bg-purple-950/20 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code className="font-mono text-[11px] bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-1.5 py-0.5 rounded border border-purple-200 dark:border-purple-800/40" {...props}>
                {children}
              </code>
            ) : (
              <div className="my-2.5 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0a1a] shadow-md">
                <div className="bg-[#15102a] px-3 py-1 text-[10px] font-mono text-purple-300 border-b border-purple-900/30 flex items-center justify-between">
                  <span>code</span>
                </div>
                <pre className="p-3 overflow-x-auto font-mono text-xs text-zinc-200 bg-[#0d0a1a]">
                  <code>{children}</code>
                </pre>
              </div>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-3 border-purple-100 dark:border-purple-900/30" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
