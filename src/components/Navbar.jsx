import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>Exchange Rate</h1>
        </div>
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#converter" className="nav-link">Conversor</a>
            </li>
            <li className="nav-item">
              <a href="#rates" className="nav-link">Cotações</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">Sobre</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar