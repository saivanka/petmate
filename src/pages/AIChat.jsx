import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import './AIChat.css';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your AI Pet Assistant. I can only answer questions related to pets, their health, care, and training. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_NVIDIA_API_KEY;
      const baseUrl = import.meta.env.VITE_NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';

      if (!apiKey) {
        throw new Error("API Key is missing. Please check your .env file.");
      }

      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful AI assistant specialized exclusively in pets, dog health, cat care, training, and general animal welfare. If a user asks a question that is NOT related to pets or animals, you must politely decline to answer and remind them that you are a pet-focused AI. Keep your answers concise, professional, and empathetic.' 
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.5,
          max_tokens: 512
        })
      });

      if (!response.ok) {
        let errorMsg = 'Failed to fetch response from AI';
        if (response.status === 401) errorMsg = 'API Key is invalid or unauthorized.';
        else if (response.status === 404) errorMsg = 'The AI model endpoint was not found. Check the model name.';
        else if (response.status === 429) errorMsg = 'Rate limit exceeded. Too many requests.';
        
        try {
          const errData = await response.json();
          if (errData.detail) errorMsg += ` (${errData.detail})`;
          if (errData.error?.message) errorMsg += ` (${errData.error.message})`;
        } catch(e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const aiReply = data.choices && data.choices[0] && data.choices[0].message.content 
          ? data.choices[0].message.content 
          : "Sorry, I received an empty response from the server.";

      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}. Please try again later.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container page-transition chat-container-wrapper">
      <div className="chat-interface glass-panel">
        <div className="chat-header">
          <Bot size={28} className="brand-icon" />
          <h2>Smart AI Vet Assistant</h2>
        </div>
        
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-bubble ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-content">
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-bubble assistant loading">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <Loader className="spinner" size={20} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your pet's health..."
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-primary send-btn" disabled={isLoading || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
