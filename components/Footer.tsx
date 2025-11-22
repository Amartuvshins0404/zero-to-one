import React from 'react';
import { CONTENT } from '../content';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 text-center bg-black text-zinc-500 text-sm uppercase tracking-widest border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} {CONTENT.contact.copyright}</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          {CONTENT.contact.socials.map((social, idx) => (
            <a key={idx} href={social.link} className="hover:text-white transition-colors">{social.name}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
