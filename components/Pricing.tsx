import gsap from 'gsap';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CONTENT } from '../content';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('product');
  const containerRef = useRef<HTMLDivElement>(null);

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

  const { pricing } = CONTENT;

  return (
    <section id="pricing" className="py-24 px-4 md:px-8 bg-zinc-950 relative overflow-hidden" ref={containerRef}>
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {pricing.title}
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">{pricing.description}</p>

          {/* Enhanced Toggle */}
          <div className="inline-flex bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full p-1.5 relative shadow-xl">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-lg ${activeTab === 'service' ? 'left-[calc(50%+3px)]' : 'left-1.5'}`}
            ></div>
            <button
              onClick={() => setActiveTab('product')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === 'product' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {pricing.tabs.product}
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === 'service' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {pricing.tabs.service}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === 'product' ? (
            pricing.products.map((product, index) => (
              <div
                key={index}
                className={`pricing-card group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col ${index === 1 ? 'md:col-span-2 lg:col-span-1 border-indigo-500/30 bg-zinc-900/60' : ''}`}
              >
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">{product.title}</h3>
                  <p className="text-gray-400 text-sm h-10">{product.description}</p>
                </div>
                <div className="text-3xl font-bold text-white mb-8 tracking-tight">
                  {product.priceRange}
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors">
                      <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-indigo-400" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={product.ctaUrl}
                  className={`block w-full py-4 px-6 text-center rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 ${index === 1
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                      : 'bg-white text-black hover:bg-gray-100'
                    }`}
                >
                  {product.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))
          ) : (
            pricing.services.map((service, index) => (
              <div
                key={index}
                className={`pricing-card group relative bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col ${index === 3 ? 'lg:col-span-3 lg:w-2/3 lg:mx-auto border-purple-500/30 bg-zinc-900/60' : ''
                  }`}
              >
                {index === 2 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-800 text-gray-300 border border-zinc-700 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Recommended
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                    {service.price}
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200 transition-colors">
                      <div className="mt-1 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-indigo-400" />
                      </div>
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={service.ctaUrl}
                  className={`block w-full py-4 px-6 text-center rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 ${index === 3
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'
                    }`}
                >
                  {service.ctaText}
                  <ArrowRight className="w-4 h-4" />
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
