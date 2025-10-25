import React from 'react';
import './Projects.css';

function Projects() {
  return (
    <section id="proyectos" className="projects">
      <h2 className="section-title">Proyectos</h2>
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-img" style={{backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.W7_pq-nBnWAlE50hNmTHYAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
          <h3>Sistema de Gestión Académica</h3>
          <p>Aplicación web para administrar calificaciones y asistencias de estudiantes.</p>
          <div className="project-tags">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Python</span>
          </div>
          <div className="project-links">
            <a href="#" className="btn small">Ver Demo</a>
            <a href="#" className="btn small secondary">Código</a>
          </div>
        </div>
        <div className="project-card">
          <div className="project-img" style={{backgroundImage: "url('https://img.freepik.com/vector-premium/elementos-gui-diseno-interfaz-aplicacion-clima-movil-aplicacion-movil-pronostico-tiempo-telefono-realista-generador-interfaz-usuario-condiciones-climaticas-temperatura-ui-ux-kit-herramientas-ilustracion-vectorial_397674-1044.jpg?w=1060')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
          <h3>Aplicación de Clima</h3>
          <p>App que muestra el pronóstico del tiempo utilizando APIs externas.</p>
          <div className="project-tags">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>API</span>
          </div>
          <div className="project-links">
            <a href="#" className="btn small">Ver Demo</a>
            <a href="#" className="btn small secondary">Código</a>
          </div>
        </div>
        <div className="project-card">
          <div className="project-img" style={{backgroundImage: "url('./img/primaveralulu.png')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
          <h3>E-commerce Básico</h3>
          <p>Tienda de flores eternas.</p>
          <div className="project-tags">
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
          </div>
          <div className="project-links">
            <a href="#" className="btn small">Ver Demo</a>
            <a href="#" className="btn small secondary">Código</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;