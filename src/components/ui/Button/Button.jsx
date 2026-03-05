import './Button.css';

function Button({ children, variant = 'primary', size = 'md', href, onClick, type, disabled, className = '' }) {
    const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

    if (href) {
        return (
            <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {children}
            </a>
        );
    }

    return (
        <button type={type || 'button'} className={classes} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;
