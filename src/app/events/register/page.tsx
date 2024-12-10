'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './RegisterEvent.module.css';


export default function RegisterEvent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    event_name: '',
    local: '',
    address: '',
    description: '',
    ticket_price: '',
    link: '',
    event_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format the data before sending
      const formattedData = {
        ...formData,
        ticket_price: formData.ticket_price ? parseFloat(formData.ticket_price) : null,
        event_date: new Date(formData.event_date).toISOString()
      };

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const error = await response.json();
        alert(error.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register event');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container} style={{backgroundColor: '#5541BA', minHeight: '100vh', padding: '2rem'}}>
    

      <Image
        src="/arrowLeft.svg"
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

      <div className={styles.logoContainer} style={{textAlign: 'center', marginBottom: '2rem'}}>
        <Image
          src="/greenlogo.svg"
          alt="VAI Logo"
          width={150}
          height={50}
          style={{margin: '0 auto'}}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            <h1 className={styles.title} style={{textAlign: 'left', fontWeight: 900, fontFamily: 'Poppins', color: '#E1F532', marginBottom: '2rem'}}>
              cadastro novo evento
            </h1>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="event_name"
                  name="event_name"
                  value={formData.event_name}
                  onChange={handleChange}
                  required
                  placeholder="NOME DO EVENTO"
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="local"
                  name="local"
                  value={formData.local}
                  onChange={handleChange}
                  required
                  placeholder="LOCAL"
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="ENDEREÇO"
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="datetime-local"
                  id="event_date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="DESCRIÇÃO"
                  className={styles.textarea}
                  style={{height: '100px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="number"
                  id="ticket_price"
                  name="ticket_price"
                  value={formData.ticket_price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="VALOR DO INGRESSO"
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="LINK"
                  className={styles.input}
                  style={{height: '50px'}}
                />
              </div>

              <button
                type="submit"
                className={styles.button}
                style={{height: '50px', marginTop: '1rem'}}
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
