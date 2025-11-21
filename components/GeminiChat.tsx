import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Button } from './Button';

export const GeminiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: '你好！我是你的AI安全科普向导。关于“AI后门”或者“数据投毒”，你有什么想问的吗？我可以帮你翻译那些复杂的学术黑话！',
      timestamp: Date.now(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const answer = await askGemini(input);
    
    const aiMsg: ChatMessage = { role: 'model', content: answer, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-gray-900/80 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl overflow-hidden max-w-3xl mx-auto w-full">
      <div className="bg-gray-800/50 p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-cyan-400 font-bold text-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
          安全顾问 (Powered by Gemini)
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-br-none' 
                : 'bg-gray-700 text-gray-100 rounded-bl-none border border-gray-600'
            }`}>
              <p className="leading-relaxed text-sm md:text-base">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-700 p-3 rounded-2xl rounded-bl-none flex gap-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-800/50 border-t border-gray-700 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="例如：这个贴纸为什么能骗过AI？"
          className="flex-1 bg-gray-900 border border-gray-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-500"
        />
        <Button onClick={handleSend} disabled={isLoading} className="!px-4 !py-2">
          发送
        </Button>
      </div>
    </div>
  );
};