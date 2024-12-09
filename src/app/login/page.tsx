// pages/login.tsx
'use client';

import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#5541BA',
        fontFamily: 'Arial, sans-serif',
        color: '#E1F532',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '15px 35px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Link href="/home" style={{ position: 'absolute', top: '15px', left: '15px', color: '#E1F532', textDecoration: 'none', fontSize: '24px' }}>
          ←
        </Link>
        <Image src="/logo.svg" alt="Logo" width={70} height={70} style={{ marginBottom: '5px' }} />
        <h1 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '22px', textAlign: 'left' }}>LOGIN</h1>
        <p style={{ marginBottom: '5px', fontSize:'11px', textAlign: 'left' }}>ENTRE COM</p>
        <button
          style={{
            backgroundColor: '#FFF',
            color: '#5541BA',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '20px',
            cursor: 'pointer',
            float: 'left'
          }}
        >
          G
        </button>
        <input
          type="text"
          placeholder="NOME DE USUÁRIO"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #FFF',
            outline: 'none',
            backgroundColor:'#5541BA',
            color: '#FFF'
          }}
        />
        <input
          type="password"
          placeholder="SENHA"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #FFF',
            outline: 'none',
            backgroundColor: '#5541BA',
            color: '#FFF'
          }}
        />
        <button
          style={{
            backgroundColor: '#202010',
            color: '#E1F532',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          ENTRAR
        </button>
      </div>
    </div>
  );
}