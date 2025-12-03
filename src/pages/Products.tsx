import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShoppingCart, Globe, Cpu, MessageSquare, Search, Settings, Code2, Rocket, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { CONTENT } from '../../content';

// Icon mappings
const tabIcons: Record<string, React.ReactNode> = {
    'Ecommerce': <ShoppingCart className="w-6 h-6" />,
    'Portfolio': <Globe className="w-6 h-6" />,
    'DAN System': <Cpu className="w-6 h-6" />,
    'AI Chatbot': <MessageSquare className="w-6 h-6" />
};

const processIcons: Record<string, React.ReactNode> = {
    'Discovery': <Search className="w-7 h-7" />,
    'Strategy': <Settings className="w-7 h-7" />,
    'Development': <Code2 className="w-7 h-7" />,
    'Launch': <Rocket className="w-7 h-7" />
};

export default function Products() {
    const { header, tabs, process, faq, cta } = CONTENT.productsPage;
    const tabList = Object.values(tabs);
    const [activeTabId, setActiveTabId] = useState<string>(tabList[0].id);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const activeTabData = tabList.find(t => t.id === activeTabId) || tabList[0];

    // Animation when tab changes
    useEffect(() => {
        if (contentRef.current && imageRef.current) {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
            );
        }
    }, [activeTabId]);

    return (
        <div className='min-h-screen bg-background-dark text-text-primary-dark font-display pb-20'>
            {/* Header Section */}
            <div className='container mx-auto px-6 pt-32 pb-16'>
                <div className='flex flex-col items-center text-center max-w-3xl mx-auto'>
                    <span className='text-sm md:text-base text-primary font-bold tracking-[0.2em] uppercase mb-4 py-1 px-3 rounded-full bg-primary/5'>
                        {header.label}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        {header.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">{header.highlight}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary-dark leading-relaxed">
                        {header.description}
                    </p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className='container mx-auto px-6'>
                <div className='bg-primary/50 backdrop-blur-sm rounded-[2rem] p-2 md:p-3 flex flex-wrap justify-center gap-2 mb-16 max-w-4xl mx-auto shadow-lg shadow-primary/5'>
                    {tabList.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTabId(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${activeTabId === tab.id
                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                                : 'text-text-secondary-dark hover:text-primary hover:bg-primary/5'
                                }`}
                        >
                            {tabIcons[tab.id]}
                            {tab.id}
                        </button>
                    ))}
                </div>

                {/* Content Section */}
                <div className='bg-surface-dark rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-primary/5 overflow-hidden'>
                    <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                        {/* Text Content */}
                        <div ref={contentRef}>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                {activeTabData.title}
                            </h2>
                            <p className="text-lg text-text-secondary-dark mb-10 leading-relaxed">
                                {activeTabData.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 mb-10">
                                {activeTabData.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-text-primary-dark font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="group bg-primary text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2">
                                    Book a Demo
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="group bg-white border-2 border-border-dark text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-gray-50 hover:border-primary/30 flex items-center justify-center">
                                    Learn More
                                </button>
                            </div>
                        </div>

                        {/* Image/Visual Content */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <img
                                ref={imageRef}
                                src={activeTabData.image}
                                alt={activeTabData.title}
                                className="relative w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="container mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{process.label}</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{process.title}</h2>
                    <p className="text-text-secondary-dark max-w-2xl mx-auto">{process.description}</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {process.steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="bg-surface-dark p-8 rounded-[2rem] h-full hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-lg shadow-transparent hover:shadow-primary/5">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {processIcons[step.title] || <Settings className="w-7 h-7" />}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-text-secondary-dark text-sm leading-relaxed">{step.description}</p>
                            </div>
                            {index < process.steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-border-dark/30">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto px-6 py-24 border-t border-border-dark/30">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{faq.label}</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">{faq.title}</h2>
                        <p className="text-text-secondary-dark mb-8 text-lg">{faq.description}</p>
                        <button className="bg-surface-dark text-text-primary-dark px-8 py-4 rounded-full font-bold  hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20">
                            {faq.buttonText}
                        </button>
                    </div>
                    <div className="space-y-4">
                        {faq.items.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-surface-dark rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-lg hover:bg-white/5 transition-colors"
            >
                <span className="text-text-primary-dark">{question}</span>
                <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`mt-4 px-6 text-text-secondary-dark overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                {answer}
            </div>
        </div>
    )
}