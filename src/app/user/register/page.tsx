'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../../page.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.userId.toString());
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className={styles.page} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
          src="/logo.svg"
          alt="VAI Logo"
          width={50}
          height={50}
        />
      </header>

      <main style={{ flex: 1, background: '#f5f5f5', padding: '2rem' }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
            color: '#333'
          }}>Register</h1>

          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#5541BA',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </form>
        </div>
      </main>

      <footer style={{ background: 'white', padding: '1rem', textAlign: 'center' }}>
        <p>Powered by VAI - Seu assistente virtual carioca</p>
      </footer>
    </div>
  );
}
