'use client';

import Image from "next/image";
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{ background: 'white', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Vem com a gente!</p>
      </header>

      <main style={{ flex: 1, background: '#f5f5f5', padding: '2rem' }}>
        

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
            <button style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Image src="/send.svg" alt="Send" width={24} height={24} />
            </button>
          </div>
      </main>
    </div>
  );
}
