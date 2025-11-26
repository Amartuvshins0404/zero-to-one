import React from 'react';
import { CONTENT } from '../content';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative bg-background-dark py-24 sm:py-40 overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <img
          src={CONTENT.contact.backgroundImage}
          alt="Abstract background"
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px]"></div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-text-primary-dark leading-tight">
          {CONTENT.contact.headline}
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-secondary-dark">
          {CONTENT.contact.description}
        </p>

        <a
          href="#"
          className="mt-12 inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 text-lg"
        >
          <span>{CONTENT.contact.ctaButton}</span>
          <span className="material-symbols-outlined">send</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
