import React, { useState } from 'react';
import { CONTENT } from '../content';

const Projects: React.FC = () => {
    const [showModal, setShowmodal] = useState(false);
    function handleClick() {
        setShowmodal(!showModal);
    }
    return (
        <section id="portfolio" className="bg-surface-dark py-24 sm:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        {CONTENT.projects.label}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary-dark leading-tight mt-4">
                        {CONTENT.projects.headline}
                    </h2>
                    <p className="mt-6 text-lg text-text-secondary-dark leading-relaxed">
                        {CONTENT.projects.description}
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CONTENT.projects.items.map((project, index) => (
                        <a
                            key={project.id}
                            href={project.id == 1 ? '#': project.link}
                            className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-primary/20 focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-surface-dark transition-all duration-500 h-[500px] flex flex-col ${index === 1 ? 'md:mt-16' : ''}`}
                            onClick={() => {
                                if (project.id == 1) handleClick();
                            }}
                        >
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6 w-full mt-auto">
                                <p className="text-sm text-primary uppercase font-semibold tracking-wider">
                                    {project.category}
                                </p>
                                <h3 className="text-2xl font-bold text-white mt-1">
                                    {project.title}
                                </h3>
                            </div>

                            <div className="absolute top-4 right-4 bg-white/10 text-white p-3 rounded-full backdrop-blur-sm transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
                                <span className="material-symbols-outlined text-xl">arrow_outward</span>
                            </div>
                        </a>
                    ))}
                </div>
                {/* <div className="mt-16 text-center">
                    <button className="bg-surface-dark border border-border-dark text-text-primary-dark px-8 py-4 rounded-full font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                        {CONTENT.projects.viewAllText}
                    </button>
                </div> */}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50">
                    <div className='w-96 p-10 rounded-xl bg-surface-dark '>
                        <div className='flex items-center justify-between'>
                            <p className='text-text-primary-dark text-sm'>Та яг одоо байгууллагын танилцуулга харж байна. арассо</p>
                            <button onClick={handleClick} className="material-symbols-outlined text-xl">close</button>
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <button onClick={handleClick} className="p-2 mt-4 rounded-full bg-primary text-white text-sm px-3">Аан, за уучлаарай</button>
                            <button onClick={()=> {alert('Уулзаж болно! 9600-1214. Залгаад учраа олж болно шүү, хө!')}} className="p-2 mt-4 rounded-full bg-secondary text-white text-sm px-3">Дараадах даа, хө!</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
