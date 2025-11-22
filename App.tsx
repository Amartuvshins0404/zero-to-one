import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useState } from 'react';
import About from './components/About';
import AIChat from './components/AIChat';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Team from './components/Team';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const mainRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    // Set initial theme
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');

    const ctx = gsap.context(() => {
      // Contact Section: Light Mode
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top top",
        onEnter: () => {
          document.body.classList.remove('theme-dark');
          document.body.classList.add('theme-light');
        },
        onEnterBack: () => {
          document.body.classList.remove('theme-dark');
          document.body.classList.add('theme-light');
        },
        onLeaveBack: () => {
          document.body.classList.remove('theme-dark');
          document.body.classList.add('theme-light');
        },
      });

      // Team Section: Dark Mode
      ScrollTrigger.create({
        trigger: "#team",
        start: "top top",

        onEnter: () => {
          document.body.classList.remove('theme-light');
        },
        onLeaveBack: () => {
          document.body.classList.remove('theme-light');
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen text-white selection:bg-indigo-500 selection:text-white font-sans transition-colors duration-500">
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Team />
      <Footer />


      <AIChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </main>
  );
};

export default App;
