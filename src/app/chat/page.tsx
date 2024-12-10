'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...newMessages]
        }),
      });

      const data = await response.json();
      
      if (data.query) {
        // Redirect to events list with search query using router.push
        router.push(`/events/list?q=${encodeURIComponent(data.query)}`);
        return;
      }

      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
     <header style={{ 
      background: 'white', 
      padding: '1rem', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginBottom: '20px',
      width: '100%'
    }}>
      <Image
        src="/arrowLeftBlack.svg"
        alt="back btn"
        width={30}
        height={30}
        onClick={() => router.push('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          border: 'none',
          cursor: 'pointer'
        }}
      />
      <Image
        src="/logo.svg"
        alt="VAI Logo"
        width={50}
        height={50}
        onClick={() => router.push('/')}
      />
    </header>
      <main style={{ flex: 1, background: '#f5f5f5', padding: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          marginBottom: '80px' 
        }}>
          {messages.map((msg, index) => (
            <div key={index} style={{
              background: msg.role === 'user' ? '#E1F532' : '#5541BA',
              color: msg.role === 'user' ? 'black' : 'white',
              padding: '1rem',
              borderRadius: '8px',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%'
            }}>
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div style={{ alignSelf: 'flex-start', padding: '1rem' }}>
              Digitando...
            </div>
          )}
        </div>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            borderTop: '1px solid #E3E3E3',
            position: 'fixed',
            bottom: '25px',
            left: 0,
            right: 0,
            background: 'white'
          }}>
            <textarea 
              placeholder="Escreva uma mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #E3E3E3',
                resize: 'none',
                minHeight: '44px',
                maxHeight: '100px',
                fontFamily: 'inherit'
              }}
            />
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                opacity: isLoading ? 0.5 : 1
              }}>
              <Image src="/send.svg" alt="Send" width={24} height={24} />
            </button>
          </div>
      </main>
    </div>
  );
}
