import gsap from 'gsap';
import { Check, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CONTENT } from '../content';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('product');
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  const { pricing, contact } = CONTENT;

  // Helper function to get appropriate contact link
  const getContactLink = (ctaUrl: string) => {
    if (isMobile) {
      return ctaUrl; // Use tel: link on mobile
    } else {
      // Use mailto: link on desktop
      return `mailto:${contact.email}?subject=Pricing Inquiry`;
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 md:px-8 bg-zinc-950 relative overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              {pricing.title}
            </h2>
            <p className="text-xl text-zinc-400 max-w-xl">{pricing.description}</p>
          </div>

          {/* Enhanced Toggle */}
          <div className="bg-zinc-900 p-1 rounded-full inline-flex relative">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-800 rounded-full transition-all duration-300 ease-out shadow-sm ${activeTab === 'service' ? 'left-[calc(50%+2px)]' : 'left-1'}`}
            ></div>
            <button
              onClick={() => setActiveTab('product')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === 'product' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              {pricing.tabs.product}
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${activeTab === 'service' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              {pricing.tabs.service}
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 gap-8 ${activeTab === 'product' ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
          {activeTab === 'product' ? (
            pricing.products.map((product, index) => (
              <div
                key={index}
                className={`pricing-card relative p-8 rounded-[2rem] flex flex-col transition-all duration-300 ${index === 1
                  ? 'bg-zinc-900 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-105 z-10'
                  : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                  }`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 right-8 bg-[#E0F2FE] text-indigo-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-medium text-zinc-100 mb-2">{product.title}</h3>
                  <div className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {product.priceRange}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${index === 1 ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm ${index === 1 ? 'text-zinc-200' : 'text-zinc-400'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getContactLink(product.ctaUrl)}
                  className={`w-full py-4 rounded-full text-sm font-bold transition-all duration-300 text-center ${index === 1
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                  {product.ctaText}
                </a>
              </div>
            ))
          ) : (
            pricing.services.map((service, index) => (
              <div
                key={index}
                className={`pricing-card relative p-6 rounded-[2rem] flex flex-col transition-all duration-300 ${index === 2 || index === 3
                  ? 'bg-zinc-900 border-2 border-indigo-500/50 shadow-xl z-10 scale-105'
                  : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'
                  }`}
              >
                {(index === 2 || index === 3) && (
                  <div className="absolute -top-3 right-6 bg-[#E0F2FE] text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Recommended
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-zinc-100 mb-2 min-h-[3.5rem]">{service.title}</h3>
                  <div className="text-xl font-bold text-white mb-2">
                    {service.price}
                  </div>
                </div>

                <div className="flex-grow mb-8">
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${index === 2 || index === 3 ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs text-zinc-400 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={getContactLink(service.ctaUrl)}
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all duration-300 text-center ${index === 2 || index === 3
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                >
                  {service.ctaText}
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
