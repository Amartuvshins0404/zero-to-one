import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import React, { useLayoutEffect, useRef } from 'react';
import { CONTENT } from '../content';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const projectsList = CONTENT.projects.items;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const projects = gsap.utils.toArray(".project-card");

            gsap.to(projects, {
                xPercent: -100 * (projects.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (projects.length - 1),
                        duration: { min: 0.2, max: 0.5 },
                        delay: 0.1
                    },
                    end: () => "+=" + (window.innerWidth * (projectsList.length)),
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projectsList.length]);

    return (
        <section ref={sectionRef} className="relative bg-zinc-950 text-white overflow-hidden">
            <div ref={triggerRef} className="h-screen flex items-center overflow-hidden">
                {/* Horizontal Scroll Content - Full Width with Responsive Padding */}
                <div className="flex pl-6 md:pl-[10vw] gap-6 md:gap-12 items-center">
                    {projectsList.map((project) => (
                        <div key={project.id} className="project-card relative w-[85vw] md:w-[70vw] h-[60vh] md:h-[75vh] flex-shrink-0 group cursor-pointer">
                            <a href={project.link} className="block w-full h-full overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 relative shadow-2xl">
                                {/* Image Layer with Zoom Effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 md:p-12 flex flex-col justify-end">
                                    {/* Content Container with Staggered Slide */}
                                    <div className="transform md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <span className="px-3 py-1 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 font-mono text-xs mb-4 inline-block backdrop-blur-sm">
                                            {project.category}
                                        </span>

                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl md:text-5xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
                                                {project.title}
                                            </h3>
                                            <div
                                                className="group/btn w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-indigo-500 hover:text-white hover:scale-110 transition-all duration-300 shadow-lg"
                                            >
                                                <ArrowUpRight size={24} className="transition-transform duration-300 group-hover/btn:rotate-45 md:w-8 md:h-8" />
                                            </div>
                                        </div>

                                        {/* Description - Reveal Animation */}
                                        <p className="text-zinc-300 text-sm md:text-lg opacity-100 md:opacity-0 group-hover:opacity-100 transform md:translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out md:delay-75 leading-relaxed max-w-2xl">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
