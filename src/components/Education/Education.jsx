import React from 'react';
import './Education.css';

function Education() {
  return (
    <section id="educacion" className="education">
      <h2 className="section-title">Educación</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-date">2020 - Presente</div>
          <div className="timeline-content">
            <h3>Ingeniería de Sistemas</h3>
            <p>Universidad Tecnológica de Perú (UTP)</p>
            <p>Octavo ciclo en curso. Especialización en desarrollo de software.</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-dot"></div>
          <div className="timeline-date">2025(cursando)</div>
          <div className="timeline-content">
            <h3>Curso de Python</h3>
            <p>Udemy</p>
            <p>Fundamentos de programación con Python y aplicaciones prácticas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;