// pages/events.tsx
'use client';

const event = {
  id: 1,
  title: 'Rock do Cunha',
  location: 'Bar do Adão',
  date: '12/05/2024 22:30',
  address: 'Rua São Sebastião, 225',
  description: 'Evento organizado por: João da Silva\nInserido em 12/04/2024\nIngresso: Gratuito',
  link: 'https://www.sympla.com.br/evento/',
  rating: 4,
};

export default function EventDetailsPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h1 style={{ color: '#4A4A4A', textAlign: 'center' }}>{event.title}</h1>
        <p style={{ color: '#7C7C7C', textAlign: 'center', marginBottom: '20px' }}>
          {event.location} | {event.date}
          <br />
          {event.address}
        </p>
        <div
          style={{
            backgroundColor: '#D4F1A0',
            borderRadius: '8px',
            padding: '10px',
            marginBottom: '20px',
            textAlign: 'center',
            color: '#4A4A4A',
            fontWeight: 'bold',
          }}
        >
          <p>{event.description}</p>
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'none' }}>
              {event.link}
            </a>
          )}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Mapa do evento"
            style={{ maxWidth: '100%', borderRadius: '8px' }}
          />
          <button
            style={{
              marginTop: '10px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Direções no Google Maps
          </button>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold', color: '#4A4A4A' }}>Avaliar este evento</p>
          <span style={{ fontSize: '20px', color: '#FFD700' }}>
            {'★'.repeat(event.rating)}{' '}
            {'☆'.repeat(5 - event.rating)}
          </span>
        </div>
      </div>
    </div>
  );
}
