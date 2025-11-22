import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP ANIMATION (> 768px)
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%", // Reduced since no sequence
            pin: true,
            scrub: 1,
          }
        });

        // 1. Fade out initial Title
        tl.to(".hero-main-text", {
          opacity: 0,
          scale: 0.95,
          filter: "blur(10px)",
          duration: 0.5,
          ease: "power2.inOut"
        });
      });

      // MOBILE ANIMATION (<= 768px)
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 0.5,
          }
        });

        // 1. Fade out main title
        tl.to(".hero-main-text", {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power1.inOut"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">

      {/* Content Layer - Grid for centering */}
      <div className="absolute inset-0 z-20 grid place-items-center pointer-events-none px-6">

        {/* Initial Title - Disappears on Scroll */}
        <div className="hero-main-text text-center col-start-1 row-start-1 z-10 flex flex-col items-center pointer-events-auto will-change-transform">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-tighter mb-4 whitespace-nowrap text-white"
            style={{
              textShadow: '0 0 20px rgba(38, 194, 193, 0.8), 0 0 40px rgba(38, 194, 193, 0.5), 0 0 60px rgba(38, 194, 193, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {CONTENT.hero.title}
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl text-white/80 font-light tracking-[0.2em] uppercase mb-8 drop-shadow-lg">
            {CONTENT.hero.subtitle}
          </p>
        </div>

      </div>

    </section>
  );
};

export default Hero;
