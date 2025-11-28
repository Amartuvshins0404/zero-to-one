import React, { useState } from 'react';
import { CONTENT } from '../content';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'product' | 'service'>('product');

  const items = activeTab === 'product' ? CONTENT.pricing.products : CONTENT.pricing.services;

  return (
    <section id="pricing" className="bg-background-dark py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {CONTENT.pricing.label}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary-dark leading-tight mt-4">
            {CONTENT.pricing.headline}
          </h2>
          <p className="mt-6 text-lg text-text-secondary-dark leading-relaxed">
            {CONTENT.pricing.description}
          </p>

          {/* Tabs */}
          <div className="mt-10 inline-flex p-1 bg-surface-dark rounded-full border border-border-dark">
            <button
              onClick={() => setActiveTab('product')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'product'
                ? 'bg-primary text-white shadow-lg'
                : 'text-text-secondary-dark hover:text-white'
                }`}
            >
              {CONTENT.pricing.tabs.product}
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === 'service'
                ? 'bg-primary text-white shadow-lg'
                : 'text-text-secondary-dark hover:text-white'
                }`}
            >
              {CONTENT.pricing.tabs.service}
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {items.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl border flex flex-col transition-all duration-300 ${plan.isPopular
                ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/20'
                : 'bg-surface-dark border-border-dark hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10'
                }`}
            >
              <h3 className={`text-xl font-semibold ${plan.isPopular ? '' : 'text-text-primary-dark'}`}>
                {plan.title}
              </h3>
              <p className={`text-4xl font-bold my-4 ${plan.isPopular ? '' : 'text-text-primary-dark'}`}>
                {plan.price}
              </p>
              {/* Description is optional in service items, so check if it exists */}
              {/* Description is optional in service items, so check if it exists */}
              {(plan as any).description && (
                <p className={plan.isPopular ? 'text-indigo-200' : 'text-text-secondary-dark'}>
                  {(plan as any).description}
                </p>
              )}

              <div className={`my-8 h-px ${plan.isPopular ? 'bg-indigo-400/50' : 'bg-border-dark'}`}></div>

              <ul className={`space-y-4 ${plan.isPopular ? 'text-indigo-200' : 'text-text-secondary-dark'}`}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    {feature.startsWith('Maintainance') ? <span className={`material-symbols-outlined mr-3 text-lg ${plan.isPopular ? 'text-white' : 'text-primary'}`}>
                      check
                    </span> : <span className={`material-symbols-outlined mr-3 text-lg ${plan.isPopular ? 'text-white' : 'text-primary'}`}>
                      add
                    </span>}
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`mt-auto block text-center w-full py-3 rounded-full font-semibold transition-colors duration-300 ${plan.isPopular
                  ? 'bg-white text-primary hover:bg-indigo-100'
                  : 'bg-border-dark/50 text-text-primary-dark hover:bg-primary hover:text-white'
                  }`}
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
