import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import AdminPanel from './components/AdminPanel';
import BootScreen from './components/BootScreen/BootScreen';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <Router>
      <AnimatePresence>
        {isBooting && <BootScreen key="bootscreen" onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {!isBooting && (
        <Routes>
          {/* RUTA PRINCIPAL: Tu Portafolio */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Education />
                <Contact />
              </main>
              <Footer />
            </>
          } />

          {/* RUTA SECRETA: Tu Panel de Admin */}
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;