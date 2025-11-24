
import { ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CONTENT } from '../content';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Projects: React.FC = () => {
    const projectsList = CONTENT.projects.items;
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="relative bg-zinc-950 text-white py-24 overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Бидний Төслүүд</h2>
            </div>

            <div className="w-full px-4 md:px-0">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 1.5,
                            spaceBetween: 40,
                        },
                    }}
                    className="w-full !pb-12"
                >
                    {projectsList.map((project) => (
                        <SwiperSlide key={project.id} className="group cursor-pointer">
                            <a href={project.link} className="block w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 relative shadow-2xl">
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
                                            <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-indigo-200 transition-colors duration-300">
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
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Sliding Pagination */}
                <div className="flex justify-center mt-8">
                    <div className="relative flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-800/50">
                        {projectsList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => swiperInstance?.slideToLoop(index)}
                                className={`h-2 rounded-full transition-all duration-500 ease-out ${activeIndex === index
                                        ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]'
                                        : 'w-2 bg-zinc-600 hover:bg-zinc-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
