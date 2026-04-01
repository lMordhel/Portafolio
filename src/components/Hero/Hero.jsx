import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';
import Button from '../ui/Button/Button';
import './Hero.css';

gsap.registerPlugin(useGSAP);

const FASTAPI_CODE = [
  { text: "from fastapi import FastAPI", type: "keyword" },
  { text: "app = FastAPI()", type: "function" },
  { text: "", type: "plain" },
  { text: "@app.get(\"/work\")", type: "decorator" },
  { text: "def get_work():", type: "function" },
  { text: "    return {", type: "plain" },
  { text: "        \"message\": \"Hola, Trabajemos juntos !\"", type: "string" },
  { text: "    }", type: "plain" }
];

function ScramblingText({ text, isHovering }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\/[]{}—=+*^?#_';

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval = null;

    const scramble = () => {
      setDisplayText(text.split('').map((char, index) => {
        if (index < iteration) {
          return text[index];
        }
        if (text[index] === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)]
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    };

    interval = setInterval(scramble, 30);
    return () => clearInterval(interval);
  }, [isHovering, text]);

  return <span>{displayText}</span>;
}

function Hero() {
  const containerRef = useRef(null);
  const terminalRef = useRef(null);
  const reduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  // Soft Parallax Cursor Tracking
  const handleMouseMove = (e) => {
    if (reduced || !terminalRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;

    gsap.to(terminalRef.current, {
      rotationY: x,
      rotationX: -y,
      ease: 'power3.out',
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (reduced || !terminalRef.current) return;
    gsap.to(terminalRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power3.out',
      duration: 0.8
    });
    setIsHovering(false);
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Text stagger
    tl.from('.hero__content > *', {
      y: reduced ? 0 : 40,
      opacity: 0,
      duration: reduced ? 0.1 : 0.8,
      stagger: reduced ? 0 : 0.15,
    });

    // Terminal container entrance
    tl.from(terminalRef.current, {
      scale: reduced ? 1 : 0.9,
      opacity: 0,
      y: reduced ? 0 : 30,
      duration: reduced ? 0.1 : 1,
    }, "-=0.4");

    // Code lines stagger
    tl.from('.code-line', {
      opacity: 0,
      x: reduced ? 0 : -10,
      duration: reduced ? 0.1 : 0.4,
      stagger: reduced ? 0 : 0.08
    }, "-=0.3");

  }, { scope: containerRef, dependencies: [reduced] });

  return (
    <section
      id="inicio"
      className="hero"
      aria-label="Presentación principal"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero__container">

        {/* Left: Text */}
        <div className="hero__content">
          <h1 className="hero__name">Matias<br />Rodriguez</h1>

          <p className="hero__role">
            <span className="hero__role-accent">Backend</span> Developer
          </p>

          <p className="hero__desc">
            Construyo el motor invisible que hace funcionar tus proyectos.
            APIs rápidas, escalables y arquitectura lista para producción usando FastAPI y Python.
          </p>

          <div className="hero__actions">
            <Button variant="primary" size="lg" href="#proyectos">Explorar Demo</Button>
            <Button variant="secondary" size="lg" href="#contacto">Contacto</Button>
          </div>
        </div>

        {/* Right: Code Terminal */}
        <div
          className="hero__terminal"
          ref={terminalRef}
          onMouseEnter={() => setIsHovering(true)}
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-close"></span>
              <span className="dot dot-min"></span>
              <span className="dot dot-max"></span>
            </div>
            <div className="terminal-title">main.py — FastAPI</div>
          </div>

          <div className="terminal-body">
            <div className="code-editor">
              {FASTAPI_CODE.map((line, idx) => (
                <div key={idx} className="code-line">
                  <span className="line-number">{idx + 1}</span>
                  <span className={`syntax-${line.type}`}>
                    <ScramblingText text={line.text} isHovering={isHovering} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;