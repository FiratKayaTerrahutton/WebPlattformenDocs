import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language = 'json', children }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: '8px',
        padding: '24px',
        background: '#1E1E1E',
        fontSize: '1.1rem',
        lineHeight: '1.6',
      }}
      wrapLines
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default CodeBlock; 