// pages/landing.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';

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
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Image src="/logo.svg" alt="Logo" width={70} height={70} style={{ marginBottom: '5px' }} />
        <Link
          href="/login"
          style={{
            display: 'block',
            backgroundColor: '#202010',
            color: '#E1F532',
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
            backgroundColor: '#202010',
            color: '#E1F532',
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
