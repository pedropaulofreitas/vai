// pages/login.tsx
'use client';

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
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '28px' }}>LOGIN</h1>
        <p style={{ marginBottom: '10px' }}>ENTRE COM</p>
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
            border: '1px solid #E1F532',
            outline: 'none',
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
            border: '1px solid #E1F532',
            outline: 'none',
          }}
        />
        <button
          style={{
            backgroundColor: '#E1F532',
            color: '#5541BA',
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