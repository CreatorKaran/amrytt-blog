import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for different markdown elements
          h1: ({ children }: any) => (
            <h1 className="font-nato text-4xl font-bold mt-8 mb-6 leading-tight text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }: any) => (
            <h2 className="font-nato text-3xl font-bold mt-8 mb-6 leading-tight text-gray-900">
              {children}
            </h2>
          ),
          h3: ({ children }: any) => (
            <h3 className="font-nato text-2xl font-semibold mt-6 mb-4 leading-snug text-gray-900">
              {children}
            </h3>
          ),
          h4: ({ children }: any) => (
            <h4 className="font-nato text-xl font-semibold mt-6 mb-4 leading-snug text-gray-900">
              {children}
            </h4>
          ),
          h5: ({ children }: any) => (
            <h5 className="font-nato text-lg font-semibold mt-4 mb-3 leading-snug text-gray-900">
              {children}
            </h5>
          ),
          h6: ({ children }: any) => (
            <h6 className="font-nato text-base font-semibold mt-4 mb-3 leading-snug text-gray-900">
              {children}
            </h6>
          ),
          p: ({ children }: any) => (
            <p className="mb-6 text-gray-600 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }: any) => (
            <ul className="my-6 pl-8 text-gray-600 space-y-2 list-disc">
              {children}
            </ul>
          ),
          ol: ({ children }: any) => (
            <ol className="my-6 pl-8 text-gray-600 space-y-2 list-decimal">
              {children}
            </ol>
          ),
          li: ({ children }: any) => (
            <li className="pl-2">
              {children}
            </li>
          ),
          blockquote: ({ children }: any) => (
          <blockquote className="font-nato! border-y pl-6 my-6 italic text-gray-300 bg-gray-50 py-4">
              {children}
            </blockquote>
          ),
          code: ({ inline, children, className, ...props }: any) => {
            if (inline) {
              return (
                <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={`w-full ${className} block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto`} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }: any) => (
            <pre className="my-6 overflow-x-auto">
              {children}
            </pre>
          ),
          a: ({ children, href }: any) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }: any) => (
            <img 
              src={src} 
              alt={alt} 
              className="my-6 rounded-lg shadow-md max-w-full h-auto"
            />
          ),
          table: ({ children }: any) => (
            <div className="my-6 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: any) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          tbody: ({ children }: any) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }: any) => (
            <tr className="border-b border-gray-200">
              {children}
            </tr>
          ),
          th: ({ children }: any) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }: any) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-600">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-8 border-t-2 border-gray-200" />
          ),
          strong: ({ children }: any) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }: any) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}