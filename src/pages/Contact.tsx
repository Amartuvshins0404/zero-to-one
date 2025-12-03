import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, ArrowRight, MessageSquare, Instagram, Facebook, Linkedin } from 'lucide-react';
import gsap from 'gsap';
import { CONTENT } from '../../content';

export default function Contact() {
    const [activeTab, setActiveTab] = useState<'general' | 'booking'>('general');
    const formRef = useRef<HTMLDivElement>(null);
    const { header, tabs, generalForm, bookingForm, contactInfo } = CONTENT.contactPage;

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }
    }, [activeTab]);

    const getSocialIcon = (name: string) => {
        switch (name) {
            case 'Instagram': return <Instagram className="w-5 h-5" />;
            case 'Facebook': return <Facebook className="w-5 h-5" />;
            case 'LinkedIn': return <Linkedin className="w-5 h-5" />;
            default: return <ArrowRight className="w-5 h-5 -rotate-45" />;
        }
    };

    return (
        <div className="min-h-screen bg-background-dark text-text-primary-dark font-display pb-20">
            {/* Header Section */}
            <div className="container mx-auto px-6 pt-32 pb-16 text-center">
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block py-1 px-3 rounded-full bg-primary/5 w-max mx-auto">
                    {header.label}
                </span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    {header.title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
                    {header.description}
                </p>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-surface-dark p-8 rounded-[2rem] shadow-lg shadow-primary/5">
                            <h3 className="text-2xl font-bold mb-8">{contactInfo.title}</h3>

                            <div className="space-y-6">
                                <ContactItem icon={<Mail className="w-5 h-5" />} text={contactInfo.email} href={`mailto:${contactInfo.email}`} />
                                <ContactItem icon={<Phone className="w-5 h-5" />} text={contactInfo.phone} href={`tel:${contactInfo.phone}`} />
                                <ContactItem icon={<MapPin className="w-5 h-5" />} text={contactInfo.address} />
                            </div>

                            <div className="mt-10 pt-8 border-t border-border-dark/30">
                                <div className="flex gap-4 justify-center">
                                    {contactInfo.socials.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                                        >
                                            <span className="sr-only">{social.name}</span>
                                            {getSocialIcon(social.name)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Area */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-surface-dark p-2 rounded-full inline-flex mb-8">
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'general'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary-dark hover:text-primary'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4" />
                                {tabs.general}
                            </button>
                            <button
                                onClick={() => setActiveTab('booking')}
                                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'booking'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-text-secondary-dark hover:text-primary'
                                    }`}
                            >
                                <Calendar className="w-4 h-4" />
                                {tabs.booking}
                            </button>
                        </div>

                        {/* Form Container */}
                        <div ref={formRef} className="bg-surface-dark p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-primary/5">
                            {activeTab === 'general' ? (
                                <GeneralForm content={generalForm} />
                            ) : (
                                <BookingForm content={bookingForm} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode, text: string, href?: string }) {
    const Content = () => (
        <div className="flex items-start gap-4 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                {icon}
            </div>
            <span className="text-text-secondary-dark group-hover:text-primary transition-colors duration-300 mt-2 font-medium break-all">
                {text}
            </span>
        </div>
    );

    return href ? (
        <a href={href} className="block">
            <Content />
        </a>
    ) : (
        <Content />
    );
}

function GeneralForm({ content }: { content: typeof CONTENT.contactPage.generalForm }) {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
                <p className="text-text-secondary-dark">{content.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField label={content.fields.name.label} placeholder={content.fields.name.placeholder} />
                <InputField label={content.fields.email.label} placeholder={content.fields.email.placeholder} type="email" />
            </div>
            <InputField label={content.fields.subject.label} placeholder={content.fields.subject.placeholder} />
            <TextAreaField label={content.fields.message.label} placeholder={content.fields.message.placeholder} />

            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                {content.submitButton}
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    );
}

function BookingForm({ content }: { content: typeof CONTENT.contactPage.bookingForm }) {
    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{content.title}</h2>
                <p className="text-text-secondary-dark">{content.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField label={content.fields.name.label} placeholder={content.fields.name.placeholder} />
                <InputField label={content.fields.email.label} placeholder={content.fields.email.placeholder} type="email" />
            </div>

            <InputField label={content.fields.company.label} placeholder={content.fields.company.placeholder} />

            <div className="grid md:grid-cols-2 gap-6">
                <SelectField label={content.fields.projectType.label} options={content.fields.projectType.options} />
                <SelectField label={content.fields.budget.label} options={content.fields.budget.options} />
            </div>

            <TextAreaField label={content.fields.description.label} placeholder={content.fields.description.placeholder} />

            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                {content.submitButton}
                <Calendar className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
        </form>
    );
}

function InputField({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary-dark ml-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full bg-background-dark border border-border-dark/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-text-secondary-dark/50"
            />
        </div>
    );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary-dark ml-1">{label}</label>
            <div className="relative">
                <select className="w-full bg-background-dark border border-border-dark/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer text-text-primary-dark">
                    <option value="" disabled selected>Select an option</option>
                    {options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary-dark">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>
    );
}

function TextAreaField({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary-dark ml-1">{label}</label>
            <textarea
                placeholder={placeholder}
                rows={4}
                className="w-full bg-background-dark border border-border-dark/50 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-text-secondary-dark/50 resize-none"
            ></textarea>
        </div>
    );
}