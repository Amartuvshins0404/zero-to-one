import React from 'react';
import { CONTENT } from '../content';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-dark">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#" className="text-2xl font-bold text-text-primary-dark tracking-wider">
              {CONTENT.meta.name.toUpperCase()}
            </a>
            <p className="text-text-secondary-dark mt-4 text-sm">
              Crafting digital excellence from concept to reality.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h4 className="font-semibold text-text-primary-dark tracking-wider">COMPANY</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="#about" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">About</a></li>
                <li><a href="#portfolio" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Portfolio</a></li>
                <li><a href="#team" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Team</a></li>
                <li><a href="#" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary-dark tracking-wider">SERVICES</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="#" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Web Development</a></li>
                <li><a href="#" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Branding</a></li>
                <li><a href="#" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Digital Strategy</a></li>
                <li><a href="#" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">UI/UX Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary-dark tracking-wider">CONNECT</h4>
              <ul className="mt-4 space-y-3">
                <li><a href="#contact" className="text-text-secondary-dark hover:text-primary transition-colors text-sm">Contact</a></li>
                {CONTENT.contact.socials.map((social, index) => (
                  <li key={index}>
                    <a href={social.link} className="text-text-secondary-dark hover:text-primary transition-colors text-sm">
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-6 border-t border-border-dark">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-text-secondary-dark">{CONTENT.contact.copyright}</p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-text-secondary-dark hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-text-secondary-dark hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
