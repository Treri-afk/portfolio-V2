import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { isSafeHref } from '../../lib/url/index.ts';
import { Link } from '../Link/index.ts';
import styles from './Prose.module.css';

/** Sanitizing keeps only https and mailto protocols; links that are neither those nor a site path become plain text. */
const schema = { ...defaultSchema, protocols: { ...defaultSchema.protocols, href: ['https', 'mailto'] } };

const components: Components = {
  a: ({ href = '', children }) => (isSafeHref(href) ? <Link to={href}>{children}</Link> : <span>{children}</span>),
};

/** Safe Markdown: raw HTML is never rendered and the tree is sanitized. */
export function Prose({ markdown }: { markdown: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown rehypePlugins={[[rehypeSanitize, schema]]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
