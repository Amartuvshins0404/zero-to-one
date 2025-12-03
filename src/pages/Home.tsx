import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useState } from 'react';
import About from '../../components/About';
import AIChat from '../../components/AIChat';
import Contact from '../../components/Contact';
import Hero from '../../components/Hero';
import Pricing from '../../components/Pricing';
import Projects from '../../components/Projects';
import Team from '../../components/Team';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const mainRef = React.useRef<HTMLElement>(null);

    React.useLayoutEffect(() => {
        // Set initial theme
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');

        const ctx = gsap.context(() => {
            // Contact Section: Light Mode
            ScrollTrigger.create({
                trigger: "#contact",
                start: "top top",
                onEnter: () => {
                    document.body.classList.remove('theme-dark');
                    document.body.classList.add('theme-light');
                },
                onEnterBack: () => {
                    document.body.classList.remove('theme-dark');
                    document.body.classList.add('theme-light');
                },
                onLeaveBack: () => {
                    document.body.classList.remove('theme-dark');
                    document.body.classList.add('theme-light');
                },
            });

            // Team Section: Dark Mode
            ScrollTrigger.create({
                trigger: "#team",
                start: "top top",

                onEnter: () => {
                    document.body.classList.remove('theme-light');
                },
                onLeaveBack: () => {
                    document.body.classList.remove('theme-light');
                },
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    React.useEffect(() => {
        // Glow effect logic
        const glowDuration = 6000; // 6 seconds
        const startTime = Date.now();

        const interval = setInterval(() => {
            if (Date.now() - startTime > glowDuration) {
                clearInterval(interval);
                // Remove glow class if needed, or just let state handle it if we used state
                const btn = document.getElementById('ai-toggle-btn');
                if (btn) btn.classList.remove('animate-pulse-glow');
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    id="ai-toggle-btn"
                    aria-label="Open AI Chat"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`bg-surface-dark p-4 rounded-full shadow-lg border border-border-dark hover:bg-primary hover:text-white transition-all duration-300 group backdrop-blur-sm bg-opacity-50 flex items-center justify-center ${!isChatOpen ? 'animate-pulse-glow' : ''
                        }`}
                >
                    <span className="material-symbols-outlined text-text-primary-dark group-hover:text-white transition-colors duration-300">
                        smart_toy
                    </span>
                </button>
            </div>

            <main ref={mainRef} className="overflow-x-hidden">
                <Hero />
                <About />
                <Projects />
                <Pricing />
                <Contact />
                <Team />

                <AIChat
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    onToggle={() => setIsChatOpen(!isChatOpen)}
                />
            </main>
        </>
    );
};

export default Home;
