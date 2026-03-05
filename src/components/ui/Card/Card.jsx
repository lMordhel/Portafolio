import './Card.css';

function Card({ children, className = '', hover = true }) {
    return (
        <div className={`card ${hover ? 'card--hover' : ''} ${className}`.trim()}>
            {children}
        </div>
    );
}

export default Card;
