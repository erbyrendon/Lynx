import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
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
  let sessionId = localStorage.getItem('lynx_chat_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('lynx_chat_session', sessionId);
  }
  return sessionId;
};

const knowledgeBase = {
  en: {
    greeting: "Hello! I'm the LYNX assistant. How can I help you today?",
    services: "LYNX offers intelligent automation solutions including:\n\n- AI-Powered Workflow Automation\n- Custom System Integration\n- Process Optimization\n- Data Analytics & Insights\n- Enterprise AI Solutions\n\nWould you like to know more about any specific service?",
    about: "LYNX exists at the intersection of human creativity and systemic intelligence. We build intelligent systems that transform chaos into clarity, making complex operations feel effortless.\n\nOur work is precise, silent, and invisible - yet its impact is unmistakable.",
    mission: "Our mission is to create intelligent systems that transform time into value, and complexity into clarity.",
    vision: "Our vision is to become the world's most trusted AI automation collective, building seamless digital ecosystems for global brands and entrepreneurs.",
    values: "LYNX is guided by five core values:\n\n- Respect: Every interaction builds trust\n- Responsibility: We own every outcome\n- Efficiency: We refine until only clarity remains\n- Innovation: We evolve faster than the system\n- Perspicacity: We see what others overlook",
    contact: "You can reach out to us through the Contact tab on our website. Fill out the form with your name, email, business name, and tell us about your automation needs. We'll get back to you shortly!",
    pricing: "Our pricing is customized based on your specific needs and project scope. Please contact us through the Contact tab to discuss your requirements and receive a personalized quote.",
    fallback: "I don't have specific information about that on our website. For detailed inquiries, please use our Contact form or reach out to our team directly through the Contact tab.",
    howCanIHelp: "I can help you learn about:\n\n- Our services and solutions\n- LYNX's mission and values\n- How to get in touch with us\n- General information about our company\n\nWhat would you like to know?",
  },
  es: {
    greeting: "¡Hola! Soy el asistente de LYNX. ¿Cómo puedo ayudarte hoy?",
    services: "LYNX ofrece soluciones de automatización inteligente incluyendo:\n\n- Automatización de Flujos de Trabajo con IA\n- Integración de Sistemas Personalizados\n- Optimización de Procesos\n- Análisis de Datos e Insights\n- Soluciones de IA Empresarial\n\n¿Te gustaría saber más sobre algún servicio específico?",
    about: "LYNX existe en la intersección de la creatividad humana y la inteligencia sistémica. Construimos sistemas inteligentes que transforman el caos en claridad, haciendo que las operaciones complejas se sientan sin esfuerzo.\n\nNuestro trabajo es preciso, silencioso e invisible - pero su impacto es inconfundible.",
    mission: "Nuestra misión es crear sistemas inteligentes que transformen el tiempo en valor, y la complejidad en claridad.",
    vision: "Nuestra visión es convertirnos en el colectivo de automatización de IA más confiable del mundo, construyendo ecosistemas digitales sin problemas para marcas globales y emprendedores.",
    values: "LYNX se guía por cinco valores fundamentales:\n\n- Respeto: Cada interacción construye confianza\n- Responsabilidad: Somos dueños de cada resultado\n- Eficiencia: Refinamos hasta que solo queda claridad\n- Innovación: Evolucionamos más rápido que el sistema\n- Perspicacia: Vemos lo que otros pasan por alto",
    contact: "Puedes contactarnos a través de la pestaña de Contacto en nuestro sitio web. Completa el formulario con tu nombre, correo electrónico, nombre de tu negocio y cuéntanos sobre tus necesidades de automatización. ¡Te responderemos pronto!",
    pricing: "Nuestros precios se personalizan según tus necesidades específicas y el alcance del proyecto. Por favor contáctanos a través de la pestaña de Contacto para discutir tus requisitos y recibir una cotización personalizada.",
    fallback: "No tengo información específica sobre eso en nuestro sitio web. Para consultas detalladas, por favor usa nuestro formulario de Contacto o comunícate directamente con nuestro equipo a través de la pestaña de Contacto.",
    howCanIHelp: "Puedo ayudarte a conocer:\n\n- Nuestros servicios y soluciones\n- La misión y valores de LYNX\n- Cómo ponerte en contacto con nosotros\n- Información general sobre nuestra empresa\n\n¿Qué te gustaría saber?",
  }
};

const getResponse = (message: string, lang: 'en' | 'es'): string => {
  const kb = knowledgeBase[lang];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
      lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
    return kb.greeting;
  }

  if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('do you do') ||
      lowerMessage.includes('servicio') || lowerMessage.includes('ofrec') || lowerMessage.includes('hacen')) {
    return kb.services;
  }

  if (lowerMessage.includes('about') || lowerMessage.includes('who are') || lowerMessage.includes('what is lynx') ||
      lowerMessage.includes('acerca') || lowerMessage.includes('quién') || lowerMessage.includes('qué es lynx')) {
    return kb.about;
  }

  if (lowerMessage.includes('mission') || lowerMessage.includes('misión')) {
    return kb.mission;
  }

  if (lowerMessage.includes('vision') || lowerMessage.includes('visión')) {
    return kb.vision;
  }

  if (lowerMessage.includes('value') || lowerMessage.includes('principle') ||
      lowerMessage.includes('valor') || lowerMessage.includes('principio')) {
    return kb.values;
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') ||
      lowerMessage.includes('contacto') || lowerMessage.includes('contactar') || lowerMessage.includes('correo')) {
    return kb.contact;
  }

  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing') ||
      lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto')) {
    return kb.pricing;
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('can you') || lowerMessage.includes('what can') ||
      lowerMessage.includes('ayuda') || lowerMessage.includes('puedes') || lowerMessage.includes('qué puedes')) {
    return kb.howCanIHelp;
  }

  return kb.fallback;
};

export default function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const loadOrCreateConversation = async () => {
    const sessionId = getSessionId();

    const { data: existingConversation } = await supabase
      .from('chatbot_conversations')
      .select('*')
      .eq('session_id', sessionId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingConversation) {
      setConversation(existingConversation);

      const { data: existingMessages } = await supabase
        .from('chatbot_messages')
        .select('*')
        .eq('conversation_id', existingConversation.id)
        .order('created_at', { ascending: true });

      if (existingMessages && existingMessages.length > 0) {
        setMessages(existingMessages);
        return;
      }
    }

    const { data: newConversation } = await supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        language: language
      })
      .select()
      .single();

    if (newConversation) {
      setConversation(newConversation);

      const greeting = language === 'es'
        ? '¡Hola! Soy el asistente de LYNX. ¿Cómo puedo ayudarte hoy?'
        : "Hello! I'm the LYNX assistant. How can I help you today?";

      const { data: greetingMessage } = await supabase
        .from('chatbot_messages')
        .insert({
          conversation_id: newConversation.id,
          role: 'assistant',
          content: greeting
        })
        .select()
        .single();

      if (greetingMessage) {
        setMessages([greetingMessage]);
      }
    }
  };

  useEffect(() => {
    if (isOpen && !conversation) {
      loadOrCreateConversation();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversation || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    const { data: savedUserMessage } = await supabase
      .from('chatbot_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'user',
        content: userMessage
      })
      .select()
      .single();

    if (savedUserMessage) {
      setMessages(prev => [...prev, savedUserMessage]);
    }

    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const response = getResponse(userMessage, language as 'en' | 'es');

    const { data: savedAssistantMessage } = await supabase
      .from('chatbot_messages')
      .insert({
        conversation_id: conversation.id,
        role: 'assistant',
        content: response
      })
      .select()
      .single();

    if (savedAssistantMessage) {
      setMessages(prev => [...prev, savedAssistantMessage]);
    }

    await supabase
      .from('chatbot_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversation.id);

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ cursor: 'pointer' }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-electric-blue rounded-full animate-pulse" />
      </button>

      <div
        className={`fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ maxHeight: 'calc(100vh - 6rem)' }}
      >
        <div className="bg-gradient-to-r from-emerald-600/90 to-teal-600/90 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">LYNX Assistant</h3>
              <p className="text-white/70 text-xs">
                {language === 'es' ? 'En línea' : 'Online'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            style={{ cursor: 'pointer' }}
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-950">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-electric-blue/20'
                    : 'bg-emerald-600/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-electric-blue" />
                ) : (
                  <Bot className="w-4 h-4 text-emerald-500" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-electric-blue/20 text-white rounded-br-sm'
                    : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600/20 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="bg-gray-800 p-3 rounded-2xl rounded-bl-sm">
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'es' ? 'Escribe un mensaje...' : 'Type a message...'}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              style={{ cursor: 'text' }}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
              style={{ cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed' }}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2 text-center">
            {language === 'es'
              ? 'Asistente basado en información del sitio web'
              : 'Assistant based on website information'}
          </p>
        </div>
      </div>
    </>
  );
}
