import './About.css';
import SectionHeader from '../ui/SectionHeader/SectionHeader';
import Tag from '../ui/Tag/Tag';

const stack = ['Python', 'FastAPI', 'MongoDB', 'PostgreSQL', 'Git', 'REST APIs'];

const stats = [
  { value: '+10', label: 'Endpoints', desc: 'diseñados y desplegados' },
  { value: '2', label: 'APIs', desc: 'en producción activa' },
  { value: '9°', label: 'Ciclo', desc: 'Ing. de Sistemas, UTP' },
];

function About() {
  return (
    <section id="sobre-mi" className="about">
      <div className="section-container">
        <SectionHeader title="Sobre Mí" />

        <div className="about__layout">
          {/* Text Column */}
          <div className="about__text">
            <p className="about__kicker">INGENIERÍA DE SISTEMAS · PERÚ</p>

            <p>
              No me especializo en hacer páginas web bonitas.
              Me especializo en diseñar el código que las hace funcionar.
            </p>
            <p>
              APIs REST que procesan miles de requests. Pipelines de datos
              que no fallan. Arquitecturas que escalan con el negocio.
            </p>
            <p>
              Mi enfoque está en la <strong>claridad arquitectónica</strong>,
              el <strong>rendimiento bajo carga</strong> y el
              <strong> código mantenible en el largo plazo</strong>.
            </p>

            <div className="about__tags">
              {stack.map(t => <Tag key={t} variant="muted">{t}</Tag>)}
            </div>
          </div>

          {/* Stats Column */}
          <div className="about__stats">
            {stats.map(s => (
              <div key={s.label} className="about__stat">
                <span className="about__stat-value">{s.value}</span>
                <span className="about__stat-label">{s.label}</span>
                <span className="about__stat-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;