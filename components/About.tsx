import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Pin the section
      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: true,
      });

      // Animate lines revealing
      const tl = gsap.timeline({
        scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=100%",
            scrub: 1
        }
      });

      tl.from(".stat-item", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out"
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="h-screen w-full bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[128px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px]"></div>
        </div>

        <div ref={contentRef} className="container mx-auto px-6 z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            
            <div className="w-full md:w-1/2">
                <h4 className="text-indigo-500 font-mono text-sm tracking-widest mb-6 uppercase">{CONTENT.about.label}</h4>
                <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-8 whitespace-pre-line">
                    {CONTENT.about.headline}
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
                    {CONTENT.about.description}
                </p>
            </div>

            <div className="w-full md:w-1/2 grid grid-cols-2 gap-8">
                {CONTENT.about.stats.map((stat, i) => (
                    <div key={i} className="stat-item border-l border-zinc-800 pl-6">
                        <div className="text-5xl font-bold text-white mb-2">{stat.num}</div>
                        <div className="text-zinc-500 uppercase tracking-wider text-xs font-bold">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default About;