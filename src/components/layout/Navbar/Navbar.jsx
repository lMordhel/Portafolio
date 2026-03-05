import './Navbar.css';
import { useState, useEffect } from 'react';

const links = [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Skills', href: '#habilidades' },
    { label: 'Sobre mí', href: '#sobre-mi' },
    { label: 'Contacto', href: '#contacto' },
];

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Bloquear scroll cuando el menu esta abierto
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
            <div className="navbar__inner">

                {/* Logo */}
                <a href="#inicio" className="navbar__logo" aria-label="Inicio">
                    <span className="navbar__logo-bracket">&lt;</span>
                    matias.dev
                    <span className="navbar__logo-bracket">&nbsp;/&gt;</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar__nav" aria-label="Navegación principal">
                    <ul className="navbar__links" role="list">
                        {links.map(link => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="navbar__link"
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA + Burger */}
                <div className="navbar__right">
                    <a
                        href="/cv.pdf"
                        className="navbar__cv-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ver CV
                    </a>

                    <button
                        className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
                        onClick={() => setOpen(prev => !prev)}
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <nav
                className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
                aria-label="Navegación mobile"
                aria-hidden={!open}
            >
                <ul role="list">
                    {links.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="navbar__mobile-link"
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="/cv.pdf"
                            className="navbar__mobile-link navbar__mobile-link--cta"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                        >
                            Ver CV ↗
                        </a>
                    </li>
                </ul>
            </nav>

            {open && (
                <div
                    className="navbar__overlay"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}
        </header>
    );
}

export default Navbar;
