import React from 'react';
import './About.css';

function About() {
  return (
    <section id="sobre-mi" className="about">
      <h2 className="section-title">Sobre Mí</h2>
      <div className="about-content">
        <div className="about-text">
          <p>Soy estudiante de Octavo cilo de Ingeniería de Sistemas en la Universidad Tecnológica de Perú (UTP), apasionado por el desarrollo de software y la resolución de problemas mediante la programación.</p>
          <p>Mi objetivo es convertirme en un desarrollador front-end, combinando mis conocimientos técnicos con una sólida comprensión de las necesidades del usuario.</p>
          <p>Actualmente me enfoco en tecnologías web modernas y estoy en constante aprendizaje para mantenerme actualizado con las últimas tendencias en el mundo del desarrollo.</p>
        </div>
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">4+</span>
            <span className="stat-text">Años de Estudio (Universidad)</span>
          </div>
          <div className="stat">
            <span className="stat-number">1 </span>
            <span className="stat-text">Proyectos Completado</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;