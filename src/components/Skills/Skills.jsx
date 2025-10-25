import React from 'react';
import './Skills.css';

function Skills() {
  return (
    <section id="habilidades" className="skills">
      <h2 className="section-title">Habilidades</h2>
      <div className="skills-container">
        <div className="skill-category">
          <h3>Desarrollo Frontend</h3>
          <ul className="skill-list">
            <li className="skill-item">HTML</li>
            <li className="skill-item">CSS</li>
            <li className="skill-item">JavaScript</li>
            <li className="skill-item">React</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;