import { useState } from 'react'
import './Header.css'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header>
      <nav>
        <div onClick={() => window.location.href = '#inicio'} className="logo">DEV.PORTFOLIO</div>
        <ul className={`nav-links ${mobileMenuOpen ? 'nav-active' : ''}`}>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#sobre-mi">Sobre Mí</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#habilidades">Habilidades</a></li>
          <li><a href="#educacion">Educación</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div className={`burger ${mobileMenuOpen ? 'toggle' : ''}`} onClick={toggleMobileMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  )
}

export default Header