// pages/landing.tsx
'use client';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#5541BA',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#E1F532',
          padding: '30px',
          borderRadius: '15px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h1 style={{ fontSize: '36px', marginBottom: '20px', fontWeight: 'bold', color: '#E1F532' }}>VAI</h1>

        <Link
          href="/login"
          style={{
            display: 'block',
            backgroundColor: '#E1F532',
            color: '#5541BA',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center',
            textDecoration: 'none',
            width: '100%',
          }}
        >
          ENTRAR
        </Link>

        <Link
          href="/register"
          style={{
            display: 'block',
            backgroundColor: '#E1F532',
            color: '#5541BA',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
            textAlign: 'center',
            textDecoration: 'none',
            width: '100%',
          }}
        >
          CADASTRAR
        </Link>
      </div>
    </div>
  );
}
