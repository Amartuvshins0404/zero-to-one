import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sentencesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const sentences = sentencesRef.current;

      // Neon Glow Animation for Title (not scroll-triggered)
      // Disabled due to mobile rendering issues causing duplicate text
      /*
      if (titleRef.current) {
        gsap.timeline({ repeat: -1, yoyo: true })
          .to(titleRef.current, {
            filter: 'drop-shadow(0 0 40px rgba(38, 194, 193, 0.8)) drop-shadow(0 0 60px rgba(38, 194, 193, 0.6)) drop-shadow(0 0 80px rgba(38, 194, 193, 0.4)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            duration: 2,
            ease: 'power1.inOut'
          })
          .to(titleRef.current, {
            filter: 'drop-shadow(0 0 30px rgba(38, 194, 193, 0.6)) drop-shadow(0 0 50px rgba(38, 194, 193, 0.4)) drop-shadow(0 0 70px rgba(38, 194, 193, 0.3)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))',
            duration: 2,
            ease: 'power1.inOut'
          });
      }
      */

      // Initial State: Video is collapsed to a small box in the center, scaled down, and dark
      gsap.set(videoWrapperRef.current, {
        clipPath: "inset(50% 30% 50% 30% round 20px)",
        webkitClipPath: "inset(50% 30% 50% 30% round 20px)",
        scale: 0.5,
        filter: "brightness(0.2)"
      });

      // DESKTOP ANIMATION (> 768px)
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%", // Extended for reading time
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

        // 2. Expand Video from center (Scale + ClipPath expansion)
        tl.to(videoWrapperRef.current, {
          clipPath: "inset(0% 5% 0% 5% round 32px)",
          webkitClipPath: "inset(0% 5% 0% 5% round 32px)",
          scale: 1,
          filter: "brightness(1)",
          duration: 1.5,
          ease: "power4.inOut"
        }, "-=0.4");

        // 3. Sequence the sentences
        sentences.forEach((sentence, i) => {
          if (!sentence) return;

          // Fade In
          tl.fromTo(sentence,
            { opacity: 0, scale: 0.9, filter: "blur(10px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
            ">-=0.5"
          );

          // Fade Out
          if (i < sentences.length) {
            tl.to(sentence,
              { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 1, ease: "power2.in" },
              ">+1.5"
            );
          }
        });
      });

      // MOBILE ANIMATION (<= 768px)
      mm.add("(max-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=500%",
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

        // 2. Expand Video
        tl.to(videoWrapperRef.current, {
          clipPath: "inset(0% 3% 0% 3% round 20px)",
          webkitClipPath: "inset(0% 3% 0% 3% round 20px)",
          scale: 1,
          filter: "brightness(1)",
          duration: 1.5,
          ease: "power4.inOut"
        }, "-=0.3");

        // 3. Sentences sequence
        sentences.forEach((sentence, i) => {
          if (!sentence) return;

          tl.fromTo(sentence,
            { opacity: 0, y: 20, filter: "blur(5px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power1.out" },
            ">-=0.2"
          );

          tl.to(sentence,
            { opacity: 0, y: -20, filter: "blur(5px)", duration: 0.8, ease: "power1.in" },
            ">+1.5"
          );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">

      {/* Video Background Layer */}
      <div
        ref={videoWrapperRef}
        className="absolute top-0 left-0 w-full h-full overflow-hidden shadow-2xl z-0 will-change-[clip-path,transform,filter]"
        style={{ clipPath: 'inset(50% 30% 50% 30% round 20px)' }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={CONTENT.hero.videoPoster}
          className="w-full h-full object-cover"
        >
          <source src={CONTENT.hero.videoUrl} type="video/mp4" />
        </video>
      </div>

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

        {/* Dynamic Sequence Container - Appears sentence by sentence */}
        <div className="col-start-1 row-start-1 z-10 w-full max-w-5xl flex items-center justify-center text-center">
          {CONTENT.hero.sequence.map((text, i) => (
            <p
              key={i}
              ref={(el) => { sentencesRef.current[i] = el; }}
              className="absolute w-full text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white opacity-0 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
            >
              {text}
            </p>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Hero;
