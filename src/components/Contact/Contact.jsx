import { useState } from 'react';
import './Contact.css';
import SectionHeader from '../ui/SectionHeader/SectionHeader';
import Button from '../ui/Button/Button';

const BACKEND_URL = 'https://portafolio-back-end-phi.vercel.app/contact';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, info: { error: false, msg: null } });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, info: { error: false, msg: null } });

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, info: { error: false, msg: 'Mensaje transmitido exitosamente.' } });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.detail || 'Error en la solicitud HTTP.');
      }
    } catch (error) {
      setStatus({ submitting: false, info: { error: true, msg: 'Error de conexión: ' + error.message } });
    }
  };

  return (
    <section id="contacto" className="contact bg-primary">
      <div className="section-container">
        <SectionHeader
          title="Contacto"
          subtitle="Abierto a discutir arquitectura, código y oportunidades de desarrollo backend."
        />

        <div className="contact__layout">
          <div className="contact__info">
            <h3 className="contact__info-title">Canales de Comunicación</h3>
            <p className="contact__info-text">
              Para consultas técnicas o propuestas profesionales, puedes enviarme un correo directamente
              o revisar mis repositorios en GitHub.
            </p>

            <div className="contact__details">
              <a href="mailto:matiasrv9@gmail.com" className="contact__anchor">
                matiasrv9@gmail.com
              </a>
              <a href="https://github.com/lMordhel" target="_blank" rel="noopener noreferrer" className="contact__anchor">
                github.com/lMordhel
              </a>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name">Nombre completo</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Ada Lovelace"
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-email">Correo de contacto</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ada@ejemplo.com"
                required
              />
            </div>

            <div className="contact__field">
              <label htmlFor="contact-message">Consulta de proyecto</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Detalla los requerimientos técnicos..."
                minLength="5"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status.submitting}
            >
              {status.submitting ? 'Transmitiendo...' : 'Enviar Consulta'}
            </Button>

            {status.info.msg && (
              <div className={`contact__feedback ${status.info.error ? 'contact__feedback--error' : 'contact__feedback--success'}`}>
                {status.info.msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;