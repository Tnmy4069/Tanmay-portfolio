import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default async function TestPage() {
    return (
        <div className="blog-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                # Hello World
            </ReactMarkdown>
        </div>
    );
}
