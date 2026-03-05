import './Projects.css';
import SectionHeader from '../ui/SectionHeader/SectionHeader';
import Tag from '../ui/Tag/Tag';
import Card from '../ui/Card/Card';
import Button from '../ui/Button/Button';

const projects = [
  {
    title: 'E-commerce Primavera Lulu',
    problem: 'Una florería necesitaba presencia digital rápida para vender arreglos online.',
    solution: 'Desarrollo full-stack clásico con integración de pasarela de pagos, carrito persistente y panel de gestión de catálogo básico.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL'],
    result: 'Sistema transaccional desplegado en producción con tiempos de respuesta bajo 200ms.',
    Render: "Actualmente estoy trabajando para migrar a Fast-API y darle una mejor experiencia al usuario.",
    demo: 'https://florerialuuu.vercel.app/',
    code: 'https://github.com/lMordhel/florerialuuu',
  },
  {
    title: 'E-commerce Poke-Web',
    problem: 'Tienda de peluches que requería gestión de inventario y autenticación segura.',
    solution: 'Arquitectura desacoplada. API REST desarrollada desde cero asegurada con JWT y validación estricta de datos.',
    stack: ['Python', 'FastAPI', 'MongoDB', 'React'],
    result: 'Servicio backend estable, documentado automáticamente con Swagger y desplegado en Render.',
    Render: "Uso de Render - Free el sistema entra en modo suspendido por falta de interactividadad, para volver a activar el sistema se debe esperar de 60 a 90 s.",
    demo: 'https://poke-web-tawny.vercel.app/',
    code: 'https://github.com/lMordhel/Poke-Web',
  },
];

function Projects() {
  return (
    <section id="proyectos" className="projects bg-primary">
      <div className="section-container">
        <SectionHeader
          title="Proyectos"
          subtitle="Implementaciones técnicas en producción."
        />

        <div className="projects__grid">
          {projects.map(project => (
            <Card key={project.title} className="projects__card" hover={false}>
              <div className="projects__body">
                <h3 className="projects__title">{project.title}</h3>

                <div className="projects__detail-group">
                  <div className="projects__detail">
                    <span className="projects__label">Problema</span>
                    <p>{project.problem}</p>
                  </div>

                  <div className="projects__detail">
                    <span className="projects__label">Solución Técnica</span>
                    <p>{project.solution}</p>
                  </div>

                  <div className="projects__detail">
                    <span className="projects__label">Resultado</span>
                    <p>{project.result}</p>
                  </div>
                  {project.Render && (
                    <div className="projects__detail">
                      <span className="projects__label">Aviso</span>
                      <p className="projects__warning">{project.Render}</p>
                    </div>
                  )}
                </div>

                <div className="projects__tags">
                  <span className="projects__label">Stack</span>
                  <div className="projects__tags-list">
                    {project.stack.map(tech => (
                      <Tag key={tech} variant="muted">{tech}</Tag>
                    ))}
                  </div>
                </div>

                <div className="projects__actions">
                  <Button variant="secondary" size="sm" href={project.code}>Código Fuente</Button>
                  <Button variant="ghost" size="sm" href={project.demo}>Ver Demo</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
