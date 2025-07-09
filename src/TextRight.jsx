import './TextRight.css'
import IntroductionPage from './pages/IntroductionPage'
import JsonStructurePage from './pages/JsonStructurePage'
import UsageGuidePage from './pages/UsageGuidePage'
import OnLoadPipelinePage from './pages/OnLoadPipelinePage'

const pages = {
  introduction: <IntroductionPage />,
  jsonStructure: <JsonStructurePage />,
  usageGuide: <UsageGuidePage />,
  onLoadPipeline: <OnLoadPipelinePage />,
}

const TextRight = ({ page = 'introduction' }) => {
  return (
    <div className="panel">
      <div className="text-content">
        {pages[page] || <p>Page not found.</p>}
      </div>
    </div>
  )
}

export default TextRight