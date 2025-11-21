import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

const Team: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch devices to disable hover effects
    const checkTouch = () => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(".team-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
              trigger: container.current,
              start: "top 80%",
          }
        }
      );

      // Cards Animation
      gsap.fromTo(".team-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleInteraction = (id: number) => {
    setActiveMemberId(activeMemberId === id ? null : id);
  };

  return (
    <section ref={container} className="py-32 bg-zinc-50 text-zinc-900 min-h-screen">
      <div className="container mx-auto px-6">

        <div className="mb-24 max-w-3xl team-header opacity-0">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-black uppercase leading-[0.9]">
                {CONTENT.team.headline}
            </h2>
            <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                {CONTENT.team.subHeadline}
            </p>
        </div>

        <div ref={gridRef} className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CONTENT.team.members.map((member) => {
                const isActive = activeMemberId === member.id;

                return (
                    <div
                        key={member.id}
                        className={`team-card group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-700 ease-in-out h-[600px] w-full bg-black opacity-0`}
                        onClick={() => handleInteraction(member.id)}
                        onMouseEnter={() => !isTouch && setActiveMemberId(member.id)}
                        onMouseLeave={() => !isTouch && setActiveMemberId(null)}
                    >
                        {/* Image Layer */}
                        <div className="absolute inset-0 w-full h-full">
                             <img
                                src={member.imageUrl}
                                alt={member.name}
                                className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isActive ? 'scale-110 grayscale-0' : 'scale-100 grayscale'} ${member.name == "Э. Дөлгөөнтамир" && `mt-16`} ${member.role == "COO" && `ml-8 scale-125 mb-10 hover:scale-150`}`}
                            />
                             <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-60'}`} />
                        </div>

                        {/* Mobile/Active Toggle Indicator */}
                        <div className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${isActive ? 'bg-white text-black border-white' : 'bg-black/30 text-white border-white/20'}`}>
                            {isActive ? <Minus size={18} /> : <Plus size={18} />}
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10 flex flex-col justify-end h-full pointer-events-none">

                            {/* Name & Role - Slides up when active */}
                            <div className={`transform transition-transform duration-500 ease-out origin-bottom-left ${isActive ? '-translate-y-2' : 'translate-y-0'}`}>
                                <div className="flex items-center gap-3 mb-3 overflow-hidden">
                                    <span className={`h-[1px] bg-indigo-500 transition-all duration-500 ${isActive ? 'w-12' : 'w-6'}`}></span>
                                    <p className="text-indigo-400 font-mono text-xs tracking-[0.2em] uppercase font-bold">
                                        {member.role}
                                    </p>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-none font-['Space_Grotesk'] mb-2">
                                    {member.name}
                                </h3>
                            </div>

                            {/* Bio Container - Reveals when active */}
                            <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 transform translate-y-0">
                                    <p className="text-zinc-200 text-sm md:text-[15px] leading-relaxed font-light tracking-wide font-sans border-l-2 border-indigo-500 pl-4">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>

      </div>
    </section>
  );
};

export default Team;
