import './Hero.css';
import Button from '../ui/Button/Button';
import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense } from 'react';

/* Lazy load the 3D scene for performance */
const NetworkScene = lazy(() => import('./NetworkScene'));

function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="inicio" className="hero" aria-label="Presentación principal">
      <div className="hero__container">

        {/* Left: Text */}
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__availability" role="text">
            <span className="hero__dot" aria-hidden="true" />
            <span>Available for opportunities</span>
          </div>

          <h1 className="hero__name">Matias<br />Rodriguez</h1>

          <p className="hero__role">
            <span className="hero__role-accent">Backend</span> Developer
          </p>

          <p className="hero__desc">
            Construyo los sistemas que hacen funcionar los productos digitales.
            APIs robustas, arquitecturas limpias, código preparado para producción.
          </p>

          <div className="hero__actions">
            <Button variant="primary" size="lg" href="#proyectos">Ver Proyectos</Button>
            <Button variant="secondary" size="lg" href="#contacto">Contacto</Button>
          </div>

          <div className="hero__tech-row">
            <span className="hero__tech-label">Stack</span>
            <div className="hero__tech-list">
              {['Python', 'FastAPI', 'MongoDB', 'PostgreSQL'].map(t => (
                <span key={t} className="hero__tech-pill">{t}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Network Scene */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {!reduced ? (
            <Suspense fallback={<div className="hero__scene-fallback" />}>
              <NetworkScene />
            </Suspense>
          ) : (
            <div className="hero__scene-fallback">
              <span className="hero__scene-fallback-text">Backend Architecture</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;