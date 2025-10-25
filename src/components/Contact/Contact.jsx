import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section id="contacto" className="contact">
      <h2 className="section-title">Contacto</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>¡Hablemos!</h3>
          <p>Estoy interesado en oportunidades de prácticas y proyectos. Si tienes alguna pregunta o propuesta, no dudes en contactarme.</p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>matiasrv9@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+51 987 654 321</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Lima, Perú</span>
            </div>
          </div>
          <div className="social-links">
            <a href="https://github.com/lMordhel" target="_blank" rel="noopener noreferrer"className="social-link">GitHub</a>
            <a href="https://wa.me/51929540815" target="_blank" rel="noopener noreferrer" className="social-link">WhatsApp</a>
            
          </div>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn primary">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;