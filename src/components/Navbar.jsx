import './Navbar.css'

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Exchange Rate</h1>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'exchange' ? 'active' : ''}`}
                onClick={() => setActiveTab('exchange')}
              >
                Cotações
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'extract' ? 'active' : ''}`}
                onClick={() => setActiveTab('extract')}
              >
                Extrato
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar