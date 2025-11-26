import { Chat } from "@google/genai";
import { ArrowLeft, Globe, Loader2, Mail, Phone, Send, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CONTENT } from '../content';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

interface AIChatProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

type ChatView = 'menu' | 'chat' | 'contact';

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onToggle }) => {
    const [view, setView] = useState<ChatView>('menu');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: CONTENT.ai.initialMessage }
    ]);
    const [input, setInput] = useState('');
    const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatSessionRef = useRef<Chat | null>(null);

    // Initialize chat session only when entering chat view
    useEffect(() => {
        if (isOpen && view === 'chat' && !chatSessionRef.current) {
            chatSessionRef.current = createChatSession();
        }
    }, [isOpen, view]);

    // Reset view to menu when closed
    useEffect(() => {
        if (!isOpen) {
            // Small delay to allow close animation to start if any,
            // but functionally resetting it so next open is fresh.
            const timer = setTimeout(() => setView('menu'), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, view]);

    const handleSend = async () => {
        if (!input.trim() || !chatSessionRef.current) return;

        const userMessage: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoadingState(LoadingState.LOADING);

        try {
            const responseText = await sendMessageToGemini(chatSessionRef.current, userMessage.text);

            const aiMessage: ChatMessage = { role: 'model', text: responseText };
            setMessages(prev => [...prev, aiMessage]);
            setLoadingState(LoadingState.SUCCESS);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: CONTENT.ai.error }]);
            setLoadingState(LoadingState.ERROR);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Helper to format text with bolding and list items
    const formatMessage = (text: string) => {
        return text.split('\n').map((line, i) => {
            // Handle empty lines for spacing
            if (!line.trim()) return <div key={i} className="h-2" />;

            // Process bold text within the line
            const parts = line.split(/(\*\*.*?\*\*)/g);
            const content = parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j} className="font-bold text-white">{part.slice(2, -2)}</strong>;
                }
                return part;
            });

            // Check for list items (numeric "1." or bullet "- ")
            if (/^\d+\.\s|^- /.test(line.trim())) {
                return (
                    <div key={i} className="ml-2 pl-2 mb-1 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-zinc-500 rounded-full flex-shrink-0" />
                        <div className="flex-1">{content}</div>
                    </div>
                );
            }

            return <div key={i} className="mb-1 block leading-relaxed">{content}</div>;
        });
    };

    const renderContent = () => {
        switch (view) {
            case 'menu':
                return (
                    <div className="flex flex-col gap-4 p-6 h-full justify-center">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Хэрхэн туслах вэ?</h3>

                        <button
                            onClick={() => setView('chat')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-indigo-500 transition-all group text-left"
                        >
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg">AI Туслах</div>
                                <div className="text-sm text-zinc-400">Асуулт асуух & Мэдээлэл авах</div>
                            </div>
                        </button>

                        <button
                            onClick={() => setView('contact')}
                            className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-green-500 transition-all group text-left"
                        >
                            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <Mail size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg">Холбоо барих</div>
                                <div className="text-sm text-zinc-400">Имэйл, Утас & Сошиал</div>
                            </div>
                        </button>
                    </div>
                );
            case 'contact':
                return (
                    <div className="flex flex-col gap-4 p-6 h-full overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-2">Холбоо барих мэдээлэл</h3>

                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700">
                            <div className="flex items-center gap-3 mb-2 text-zinc-400">
                                <Mail size={16} />
                                <span className="text-xs uppercase tracking-wider">Имэйл</span>
                            </div>
                            <a href={`mailto:${CONTENT.contact.email}`} className="text-white font-medium hover:text-indigo-400 transition-colors block break-all text-lg">
                                {CONTENT.contact.email}
                            </a>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700">
                            <div className="flex items-center gap-3 mb-2 text-zinc-400">
                                <Phone size={16} />
                                <span className="text-xs uppercase tracking-wider">Утас</span>
                            </div>
                            <a href={`tel:${CONTENT.contact.phone}`} className="text-white font-medium hover:text-indigo-400 transition-colors block text-lg">
                                {CONTENT.contact.phone}
                            </a>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-800/30 border border-zinc-700">
                            <div className="flex items-center gap-3 mb-4 text-zinc-400">
                                <Globe size={16} />
                                <span className="text-xs uppercase tracking-wider">Сошиал</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {CONTENT.contact.socials.map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-white hover:text-black transition-all text-sm font-bold"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'chat':
                return (
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-br-none'
                                        : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
                                        }`}>
                                        {formatMessage(msg.text)}
                                    </div>
                                </div>
                            ))}
                            {loadingState === LoadingState.LOADING && (
                                <div className="flex justify-start">
                                    <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none border border-zinc-700 flex items-center gap-2">
                                        <Loader2 className="animate-spin text-indigo-500" size={16} />
                                        <span className="text-xs text-zinc-400">{CONTENT.ai.loading}</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder={CONTENT.ai.placeholder}
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all placeholder-zinc-600"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loadingState === LoadingState.LOADING || !input.trim()}
                                    className="absolute right-2 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                );
        }
    }

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans pointer-events-none">
                    <div className="mb-4 w-[90vw] max-w-md h-[550px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto">

                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {view !== 'menu' && (
                                    <button onClick={() => setView('menu')} className="mr-1 text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800">
                                        <ArrowLeft size={18} />
                                    </button>
                                )}
                                {view === 'menu' && <Sparkles className="text-purple-500" size={18} />}

                                <div>
                                    <h3 className="font-bold text-white text-sm">
                                        {view === 'menu' && CONTENT.ai.title}
                                        {view === 'chat' && 'AI Туслах'}
                                        {view === 'contact' && 'Холбоо барих'}
                                    </h3>
                                    <p className="text-xs text-zinc-500">
                                        {view === 'menu' ? `Powered by ${CONTENT.ai.poweredBy}` : CONTENT.meta.name}
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-800">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col overflow-hidden relative">
                            {renderContent()}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default AIChat;
