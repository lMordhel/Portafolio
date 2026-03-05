import './Skills.css';
import SectionHeader from '../ui/SectionHeader/SectionHeader';

const backend = ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'REST APIs', 'JWT Auth', 'Pydantic'];
const frontend = ['React', 'JavaScript', 'HTML5', 'CSS3'];
const tools = ['Git', 'Postman'];

function Skills() {
  return (
    <section id="habilidades" className="skills">
      <div className="section-container">
        <SectionHeader title="Skills" subtitle="Stack tecnológico por nivel de dominio." />

        {/* Primary: Backend — full width, visually dominant */}
        <div className="skills__primary">
          <h3 className="skills__cat-title">
            <span className="skills__cat-badge">01</span>
            Backend &amp; Data Engineering
          </h3>
          <div className="skills__pills skills__pills--backend">
            {backend.map(s => (
              <span key={s} className="skills__pill skills__pill--accent">{s}</span>
            ))}
          </div>
        </div>

        {/* Secondary grid */}
        <div className="skills__secondary">
          <div className="skills__group">
            <h3 className="skills__cat-title">
              <span className="skills__cat-badge">02</span>
              Frontend
            </h3>
            <div className="skills__pills">
              {frontend.map(s => (
                <span key={s} className="skills__pill">{s}</span>
              ))}
            </div>
          </div>

          <div className="skills__group">
            <h3 className="skills__cat-title">
              <span className="skills__cat-badge">03</span>
              Tools &amp; DevOps
            </h3>
            <div className="skills__pills">
              {tools.map(s => (
                <span key={s} className="skills__pill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;