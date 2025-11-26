import React from 'react';
import { CONTENT } from '../content';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer - Full Width */}
      <div className="absolute inset-0 w-screen h-full z-0">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <img
          src={CONTENT.hero.backgroundImage}
          alt="Abstract background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 w-full h-full bg-black/50"></div>
      </div>

      {/* Glowing Orb Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-60 z-0"></div>

      {/* Content */}
      <div className="w-full text-center relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-text-primary-dark tracking-tighter leading-tight drop-shadow-2xl">
          {CONTENT.hero.headline.prefix} <span className="text-primary"><br className="hidden sm:block" />{CONTENT.hero.headline.highlight}</span>
          {CONTENT.hero.headline.suffix}
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-text-secondary-dark leading-relaxed">
          {CONTENT.hero.description}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg shadow-primary/20">
            <span>{CONTENT.hero.ctaPrimary}</span>
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </a>
          <a href="#portfolio" className="w-full sm:w-auto text-text-secondary-dark font-medium hover:text-white transition-colors duration-300 group flex items-center gap-2">
            <span>{CONTENT.hero.ctaSecondary}</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">east</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
