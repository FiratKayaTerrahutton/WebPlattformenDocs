import './TextRight.css'
import IntroductionPage from './pages/IntroductionPage'
import JsonStructurePage from './pages/JsonStructurePage'
import UsageGuidePage from './pages/UsageGuidePage'
import OnLoadPipelinePage from './pages/OnLoadPipelinePage'
import KnownBugsPage from './pages/KnownBugsPage'
import BrainDumpPage from './pages/BrainDumpPage'

const pages = {
  introduction: <IntroductionPage />,
  jsonStructure: <JsonStructurePage />,
  usageGuide: <UsageGuidePage />,
  onLoadPipeline: <OnLoadPipelinePage />,
  knownBugs: <KnownBugsPage />,
  braindump: <BrainDumpPage />,
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