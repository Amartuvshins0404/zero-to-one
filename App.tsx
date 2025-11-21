import React, { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import AIChat from './components/AIChat';
import { CONTENT } from './content';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="bg-zinc-950 min-h-screen text-white selection:bg-indigo-500 selection:text-white font-sans">
      <Hero />
      <About />
      <Projects />
      <Team />
      
      {/* Footer / Contact Section */}
      <section id="contact" className="py-32 px-6 text-center bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />
        
        <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-bold mb-12 tracking-tight whitespace-pre-line">
                {CONTENT.contact.headline}
            </h2>
            <a href={`mailto:${CONTENT.contact.email}`} className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all text-xl hover:scale-105">
                {CONTENT.contact.ctaButton}
            </a>
            
            <div className="mt-24 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto text-zinc-500 text-sm uppercase tracking-widest border-t border-zinc-900 pt-8">
                <p>&copy; {new Date().getFullYear()} {CONTENT.contact.copyright}</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    {CONTENT.contact.socials.map((social, idx) => (
                         <a key={idx} href={social.link} className="hover:text-white transition-colors">{social.name}</a>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <AIChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </main>
  );
};

export default App;