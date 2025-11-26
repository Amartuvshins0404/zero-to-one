import React from 'react';
import { CONTENT } from '../content';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-background-dark py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {CONTENT.about.label}
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary-dark leading-tight">
              {CONTENT.about.headline}
            </h2>
            <p className="text-lg text-text-secondary-dark leading-relaxed">
              {CONTENT.about.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONTENT.about.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-surface-dark p-8 rounded-2xl border border-border-dark group hover:border-primary transition-all duration-300 transform hover:-translate-y-2"
              >
                <p className={`text-5xl md:text-6xl font-bold ${index === 0 || index === 3 ? 'text-primary' : 'text-text-primary-dark'}`}>
                  {stat.num}
                </p>
                <p className="mt-2 text-sm text-text-secondary-dark">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
