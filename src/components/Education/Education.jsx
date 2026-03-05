import './Education.css';
import SectionHeader from '../ui/SectionHeader/SectionHeader';

const education = [
  {
    period: '2020 – Presente',
    title: 'Ingeniería de Sistemas',
    institution: 'Universidad Tecnológica del Perú (UTP)',
    description: 'Noveno ciclo. Cursos clave: Arquitectura de Software, Bases de Datos, Algoritmos.',
  },
  {
    period: '2023 – 2024',
    title: 'Especializaciones Backend',
    institution: 'Diversos Programas (MoureDev y Otros)',
    description: 'Fundamentos de Python, diseño de REST APIs con FastAPI, integraciones MongoDB y SQL.',
  },
];

function Education() {
  return (
    <section id="educacion" className="education bg-secondary">
      <div className="section-container">
        <SectionHeader title="Educación Formal" subtitle="Base académica técnica." />

        <div className="education__list">
          {education.map((item, index) => (
            <div key={index} className="education__card">
              <span className="education__period">{item.period}</span>
              <div className="education__content">
                <h3 className="education__title">{item.title}</h3>
                <p className="education__institution">{item.institution}</p>
                <p className="education__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;