import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  session_id: string;
  language: string;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('lynx_chat_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('lynx_chat_session', sessionId);
  }
  return sessionId;
};

type FunnelStep = 'industry' | 'problem' | 'budget' | 'timeline' | 'complete';

interface FunnelData {
  industry?: string;
  problem?: string;
  budget?: string;
  timeline?: string;
}

const content = {
  en: {
    greeting: "Hello! I'm the LYNX assistant. What brings you here today?",
    initialOptions: ['🔍 Learn about our services', '💬 Quote my project', '📞 Talk to the team', '📋 See case studies'],
    services: 'LYNX designs intelligent systems and digital solutions. Our core offerings:\n\n• AI-Powered Workflow Automation\n• Custom System Integration (booking, CRM, inventory)\n• Process Optimization\n• Full-stack web platforms\n• Data Analytics & Insights\n\nWould you like to quote a custom project?',
    caseStudies: 'Recent projects:\n\n📌 VIP Tattoo Studio — Portfolio + booking system + flash design store. Organized all client inquiries.\n\n📌 Egresados Royale — Event platform for 300+ guests with real-time capacity tracking and participant management.\n\nEvery solution we build is tailored — no templates.',
    talkToTeam: 'Our team replies within 24 hours. Opening the Contact tab now…',
    funnelStart: "Let's scope your project in 4 quick questions.",
    questions: {
      industry: 'What industry is your business in?',
      problem: "What's your main challenge right now?",
      budget: 'What is your approximate budget for this project?',
      timeline: 'When are you looking to start?',
    },
    options: {
      industry: ['🎨 Tattoo / Creative studio', '🍽️ Restaurant / Food', '💼 Professional services', '🛒 eCommerce', '⚙️ Other'],
      problem: ['📈 Attract more clients', '⚡ Automate processes', '🌐 Improve digital presence', '📋 Organize operations', '❓ Other'],
      budget: ['< $500 USD', '$500 – $2,000 USD', '$2,000 – $5,000 USD', '$5,000+ USD', 'Prefer not to say'],
      timeline: ['🚀 Immediately', '📅 Next 2 weeks', '🗓️ Within a month', '🔍 Just exploring'],
    },
    funnelSummary: (d: FunnelData) =>
      `Here's a snapshot of your project:\n\n🏢 Industry: ${d.industry}\n🎯 Challenge: ${d.problem}\n💰 Budget: ${d.budget}\n⏰ Start: ${d.timeline}\n\nOur team is ready to dive in. Click below to schedule a consultation.`,
    ctaLabel: 'Schedule a Consultation →',
    fallback: "I don't have details on that. For specific questions, head to our Contact tab — our team replies within 24 hours.",
    typeHint: 'Type a message…',
    online: 'Online',
  },
  es: {
    greeting: '¡Hola! Soy el asistente de LYNX. ¿Qué te trae por aquí hoy?',
    initialOptions: ['🔍 Conocer nuestros servicios', '💬 Cotizar mi proyecto', '📞 Hablar con el equipo', '📋 Ver casos de éxito'],
    services: 'LYNX diseña sistemas inteligentes y soluciones digitales. Nuestras áreas principales:\n\n• Automatización de Flujos con IA\n• Integración de Sistemas (reservas, CRM, inventario)\n• Optimización de Procesos\n• Plataformas web full-stack\n• Análisis de Datos e Insights\n\n¿Quieres cotizar un proyecto personalizado?',
    caseStudies: 'Proyectos recientes:\n\n📌 VIP Tattoo Studio — Portafolio + sistema de reservas + tienda de flash. Organizó todas las consultas de clientes.\n\n📌 Egresados Royale — Plataforma de eventos para 300+ asistentes con seguimiento de capacidad en tiempo real.\n\nCada solución que construimos es a medida — sin plantillas.',
    talkToTeam: 'Nuestro equipo responde en menos de 24 horas. Abriendo la pestaña de Contacto…',
    funnelStart: 'Analicemos tu proyecto en 4 preguntas rápidas.',
    questions: {
      industry: '¿En qué industria está tu negocio?',
      problem: '¿Cuál es tu principal desafío ahora mismo?',
      budget: '¿Cuál es tu presupuesto aproximado para este proyecto?',
      timeline: '¿Cuándo quieres iniciar?',
    },
    options: {
      industry: ['🎨 Tatuajes / Estudio creativo', '🍽️ Restaurante / Gastronomía', '💼 Servicios profesionales', '🛒 eCommerce', '⚙️ Otro'],
      problem: ['📈 Captar más clientes', '⚡ Automatizar procesos', '🌐 Mejorar presencia digital', '📋 Organizar operaciones', '❓ Otro'],
      budget: ['< $500 USD', '$500 – $2,000 USD', '$2,000 – $5,000 USD', '$5,000+ USD', 'Prefiero no decirlo'],
      timeline: ['🚀 Inmediatamente', '📅 En las próximas 2 semanas', '🗓️ En el próximo mes', '🔍 Solo explorando'],
    },
    funnelSummary: (d: FunnelData) =>
      `Aquí un resumen de tu proyecto:\n\n🏢 Industria: ${d.industry}\n🎯 Desafío: ${d.problem}\n💰 Presupuesto: ${d.budget}\n⏰ Inicio: ${d.timeline}\n\nNuestro equipo está listo. Haz clic abajo para agendar una consulta.`,
    ctaLabel: 'Agenda una Consulta →',
    fallback: 'No tengo detalles específicos sobre eso. Para consultas, ve a nuestra pestaña de Contacto — nuestro equipo responde en menos de 24 horas.',
    typeHint: 'Escribe un mensaje…',
    online: 'En línea',
  },
};

const saveToSupabase = async (
  conversationId: string,
  role: 'user' | 'assistant',
  msgContent: string
) => {
  if (!isSupabaseConfigured || conversationId.startsWith('local-')) return;
  void supabase
    .from('chatbot_messages')
    .insert({ conversation_id: conversationId, role, content: msgContent }); // fire-and-forget
};

const makeLocalMessage = (role: 'user' | 'assistant', text: string): Message => ({
  id: `local-${Date.now()}-${Math.random()}`,
  role,
  content: text,
  created_at: new Date().toISOString(),
});

export default function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [funnelStep, setFunnelStep] = useState<FunnelStep | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData>({});
  const [showInitialOptions, setShowInitialOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = content[language as keyof typeof content] ?? content.en;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, funnelStep]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const pushBotMessage = useCallback(async (text: string) => {
    setMessages(prev => [...prev, makeLocalMessage('assistant', text)]);
    if (conversation) await saveToSupabase(conversation.id, 'assistant', text);
  }, [conversation]);

  const loadOrCreateConversation = useCallback(async () => {
    const sessionId = getSessionId();

    // Try Supabase only if configured
    if (isSupabaseConfigured) {
      try {
        const { data: existing } = await supabase
          .from('chatbot_conversations')
          .select('*')
          .eq('session_id', sessionId)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existing) {
          setConversation(existing);
          const { data: msgs } = await supabase
            .from('chatbot_messages')
            .select('*')
            .eq('conversation_id', existing.id)
            .order('created_at', { ascending: true });
          if (msgs && msgs.length > 0) {
            setMessages(msgs);
            setShowInitialOptions(false);
            return;
          }
        }

        const { data: newConv } = await supabase
          .from('chatbot_conversations')
          .insert({ session_id: sessionId, language })
          .select()
          .single();

        if (newConv) {
          setConversation(newConv);
          setMessages([makeLocalMessage('assistant', t.greeting)]);
          await saveToSupabase(newConv.id, 'assistant', t.greeting);
          setShowInitialOptions(true);
          return;
        }
      } catch {
        // fall through to local fallback
      }
    }

    // Local fallback — works without Supabase
    const localConv: Conversation = {
      id: `local-${sessionId}`,
      session_id: sessionId,
      language,
    };
    setConversation(localConv);
    setMessages([makeLocalMessage('assistant', t.greeting)]);
    setShowInitialOptions(true);
  }, [language, t.greeting]);

  useEffect(() => {
    if (isOpen && !conversation) {
      loadOrCreateConversation();
    }
  }, [isOpen, conversation, loadOrCreateConversation]);

  const navigateToContact = (data: FunnelData) => {
    const prefillMsg = language === 'es'
      ? `Industria: ${data.industry}\nDesafío: ${data.problem}\nPresupuesto: ${data.budget}\nInicio: ${data.timeline}`
      : `Industry: ${data.industry}\nChallenge: ${data.problem}\nBudget: ${data.budget}\nTimeline: ${data.timeline}`;
    sessionStorage.setItem('lynx_chat_prefill', JSON.stringify({ message: prefillMsg }));
    setIsOpen(false);
    const contactTab = document.querySelector('[data-tab="contact"]') as HTMLButtonElement | null;
    contactTab?.click();
  };

  const handleInitialOption = async (option: string) => {
    if (!conversation) return;
    setShowInitialOptions(false);
    setIsLoading(true);
    setMessages(prev => [...prev, makeLocalMessage('user', option)]);
    await saveToSupabase(conversation.id, 'user', option);
    await new Promise(r => setTimeout(r, 350));

    const idx = t.initialOptions.indexOf(option);
    if (idx === 0) {
      await pushBotMessage(t.services);
    } else if (idx === 1) {
      await pushBotMessage(t.funnelStart);
      await new Promise(r => setTimeout(r, 250));
      await pushBotMessage(t.questions.industry);
      setFunnelStep('industry');
    } else if (idx === 2) {
      await pushBotMessage(t.talkToTeam);
      setTimeout(() => {
        setIsOpen(false);
        const contactTab = document.querySelector('[data-tab="contact"]') as HTMLButtonElement | null;
        contactTab?.click();
      }, 1600);
    } else if (idx === 3) {
      await pushBotMessage(t.caseStudies);
    } else {
      await pushBotMessage(t.fallback);
    }
    setIsLoading(false);
  };

  const handleFunnelOption = async (option: string) => {
    if (!conversation || !funnelStep || funnelStep === 'complete') return;
    setIsLoading(true);
    setMessages(prev => [...prev, makeLocalMessage('user', option)]);
    await saveToSupabase(conversation.id, 'user', option);
    await new Promise(r => setTimeout(r, 350));

    const newData = { ...funnelData };
    if (funnelStep === 'industry') {
      newData.industry = option;
      setFunnelData(newData);
      await pushBotMessage(t.questions.problem);
      setFunnelStep('problem');
    } else if (funnelStep === 'problem') {
      newData.problem = option;
      setFunnelData(newData);
      await pushBotMessage(t.questions.budget);
      setFunnelStep('budget');
    } else if (funnelStep === 'budget') {
      newData.budget = option;
      setFunnelData(newData);
      await pushBotMessage(t.questions.timeline);
      setFunnelStep('timeline');
    } else if (funnelStep === 'timeline') {
      newData.timeline = option;
      setFunnelData(newData);
      await pushBotMessage(t.funnelSummary(newData));
      setFunnelStep('complete');
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isLoading) return;
    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setShowInitialOptions(false);
    if (funnelStep && funnelStep !== 'complete') setFunnelStep(null);

    setMessages(prev => [...prev, makeLocalMessage('user', userMessage)]);
    await saveToSupabase(conversation.id, 'user', userMessage);
    await new Promise(r => setTimeout(r, 400 + Math.random() * 400));

    const m = userMessage.toLowerCase();
    if (/service|ofrec|servicio|hacen|what do you|qué hac/.test(m)) {
      await pushBotMessage(t.services);
    } else if (/case|caso|ejemplo|portfolio|work|trabajo|proyecto/.test(m)) {
      await pushBotMessage(t.caseStudies);
    } else if (/contact|contacto|email|reach|correo|hablar/.test(m)) {
      await pushBotMessage(t.talkToTeam);
      setTimeout(() => {
        setIsOpen(false);
        const contactTab = document.querySelector('[data-tab="contact"]') as HTMLButtonElement | null;
        contactTab?.click();
      }, 1600);
    } else if (/price|cost|precio|costo|cuánto|cuanto|quote|cotiz|presupuesto/.test(m)) {
      await pushBotMessage(t.funnelStart);
      await new Promise(r => setTimeout(r, 250));
      await pushBotMessage(t.questions.industry);
      setFunnelStep('industry');
    } else {
      await pushBotMessage(t.fallback);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies: string[] | null = (() => {
    if (showInitialOptions) return t.initialOptions;
    if (funnelStep === 'industry') return t.options.industry;
    if (funnelStep === 'problem') return t.options.problem;
    if (funnelStep === 'budget') return t.options.budget;
    if (funnelStep === 'timeline') return t.options.timeline;
    return null;
  })();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-electric-blue rounded-full animate-pulse" />
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">LYNX Assistant</h3>
              <p className="text-white/70 text-xs">{t.online}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="overflow-y-auto p-4 space-y-4 bg-gray-950" style={{ maxHeight: '300px', minHeight: '120px' }}>
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' ? 'bg-electric-blue/20' : 'bg-emerald-600/20'
              }`}>
                {message.role === 'user'
                  ? <User className="w-4 h-4 text-electric-blue" />
                  : <Bot className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className={`max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-electric-blue/20 text-white rounded-br-sm'
                  : 'bg-gray-800 text-gray-200 rounded-bl-sm'
              }`}>
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-sm">
                <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
              </div>
            </div>
          )}

          {/* CTA button after funnel completion */}
          {funnelStep === 'complete' && !isLoading && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => navigateToContact(funnelData)}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg"
              >
                {t.ctaLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {!isLoading && quickReplies && (
          <div className="px-4 py-3 bg-gray-900/80 border-t border-gray-800 flex flex-wrap gap-2 flex-shrink-0">
            {quickReplies.map((option) => (
              <button
                key={option}
                onClick={() => showInitialOptions ? handleInitialOption(option) : handleFunnelOption(option)}
                className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-800 bg-gray-900 flex-shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.typeHint}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-2 text-center">
            {language === 'es' ? 'LYNX Assistant · Responde en 24h' : 'LYNX Assistant · Replies within 24h'}
          </p>
        </div>
      </div>
    </>
  );
}
