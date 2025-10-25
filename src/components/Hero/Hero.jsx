import './Hero.css'
import { useEffect } from 'react'

function Hero() {
  useEffect(() => {
    const typeEffect = () => {
      const text = document.querySelector('.hero h2');
      if (text) {
        const originalText = text.textContent;
        text.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
          if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 100);
      }
    };

    typeEffect();
  }, []); // Se ejecuta una sola vez al montar

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1>Hola, soy <span className="highlight">Matias Rodriguez</span></h1>
        <h2 className="typing">Estudiante de Programación en UTP</h2>
        <p>Desarrollador web en formación con pasión por crear soluciones digitales</p>
        <div className="cta-buttons">
          <a href="#proyectos" className="btn primary">Ver Proyectos</a>
          <a href="#contacto" className="btn secondary">Contactarme</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
