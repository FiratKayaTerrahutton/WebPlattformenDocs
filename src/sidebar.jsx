import './sidebar.css'

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>TERRAHUTTON</h1>
      </div>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3>Getting Started</h3>
          <button onClick={() => onSelect('introduction')}>Introduction</button>
          <button onClick={() => onSelect('jsonStructure')}>json structuren</button>
          <button onClick={() => onSelect('usageGuide')}>hur du skulle bruka den</button>
          <button onClick={() => onSelect('knownBugs')}>Known Bugs and TODO</button>
          <button onClick={() => onSelect('braindump')}>Braindump</button>
        </div>
        <div className="sidebar-section">
          <h3>Kärn engine</h3>
          <button onClick={() => onSelect('onLoadPipeline')}>On load pipline</button>
          <a href="#">lerum ipsum</a>
          <a href="#">lerum ipsum</a>
          <a href="#">lerum ipsum</a>
        </div>
        <div className="sidebar-section">
          <h3>Detailed</h3>
          <a href="#">lerum ipsum</a>
          <a href="#">lerum ipsum</a>
          <a href="#">lerum ipsum</a>
        </div>
        <div className="sidebar-section">
          <h3>Examples</h3>
          <a href="#">lerum ipsum</a>
          <a href="#">lerum ipsum</a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
