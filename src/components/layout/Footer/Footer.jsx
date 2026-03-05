import './Footer.css';

const socials = [
    { label: 'GitHub', href: 'https://github.com/lMordhel', icon: 'GH' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/matias-rodriguez-v', icon: 'LI' },
    { label: 'Email', href: 'mailto:matiasrv9@gmail.com', icon: '✉' },
];

function Footer() {
    return (
        <footer className="footer" role="contentinfo">
            <div className="footer__inner">
                <div className="footer__left">
                    <span className="footer__logo">
                        <span className="footer__logo-bracket">&lt;</span>
                        matias.dev
                        <span className="footer__logo-bracket">&nbsp;/&gt;</span>
                    </span>
                    <p className="footer__tagline">Backend Developer · Perú · Available for remote</p>
                </div>

                <div className="footer__right">
                    <nav className="footer__links" aria-label="Redes sociales">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="footer__link"
                                target={s.href.startsWith('http') ? '_blank' : undefined}
                                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={s.label}
                            >
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <p className="footer__copy">© 2025 Matias Rodriguez. Built with React + Vite.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
