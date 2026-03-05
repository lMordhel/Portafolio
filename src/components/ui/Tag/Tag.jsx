import './Tag.css';

function Tag({ children, variant = 'default' }) {
    return (
        <span className={`tag tag--${variant}`}>
            {children}
        </span>
    );
}

export default Tag;
