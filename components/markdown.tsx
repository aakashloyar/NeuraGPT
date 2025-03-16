import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Theme for syntax highlighting

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeHighlight]} 
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
