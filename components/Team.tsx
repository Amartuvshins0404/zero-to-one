import React from 'react';
import { CONTENT } from '../content';

const Team: React.FC = () => {
  return (
    <section id="team" className="bg-surface-dark py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {CONTENT.team.label}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary-dark leading-tight mt-4">
            {CONTENT.team.headline}
          </h2>
          <p className="mt-6 text-lg text-text-secondary-dark leading-relaxed">
            {CONTENT.team.description}
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTENT.team.members.map((member) => (
            <div key={member.id} className="relative group overflow-hidden rounded-2xl">
              <img
                src={member.imageUrl}
                alt={`Portrait of team member ${member.name}`}
                className="w-full h-[450px] object-cover transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-sm text-primary font-semibold tracking-wider">
                  {member.role}
                </p>
                <h3 className="text-2xl font-semibold text-white mt-1 mb-4">
                  {member.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
