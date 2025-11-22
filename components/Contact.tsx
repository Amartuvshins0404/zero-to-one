import React from 'react';
import { CONTENT } from '../content';


const Contact: React.FC = () => {
  // Ref removed as it was only for theme trigger which is now handled globally


  return (
    <section id="contact" className="py-32 px-6 text-center relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-5xl md:text-8xl text-black font-bold mb-12 tracking-tight whitespace-pre-line">
          {CONTENT.contact.headline}
        </h2>
        <a href={`mailto:${CONTENT.contact.email} `} className="group inline-flex items-center gap-4 px-10 py-5 bg-black text-white border border-black hover:bg-transparent hover:text-black transition-all font-bold rounded-full text-xl hover:scale-105">
          {CONTENT.contact.ctaButton}
        </a>
      </div>
    </section>
  );
};

export default Contact;
