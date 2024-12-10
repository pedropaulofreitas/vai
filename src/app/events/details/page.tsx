'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './EventDetails.module.css';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Event {
  id: number;
  event_name: string;
  local: string;
  date: string;
  address: string;
  description: string;
  link?: string;
  rating: number;
}

export default function EventDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventId = searchParams.get('id');
    
    if (!eventId) {
      router.push('/');
      return;
    }

    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [searchParams, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <header style={{ 
        background: 'white', 
        padding: '1rem', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '20px'
      }}>
       
      <Image
        src="/arrowLeftBlack.svg"
        alt="back btn"
        width={30}
        height={30}
        onClick={() => router.push('/events/list?q=' + searchParams.get('prompt'))}
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

      <div style={{ padding: '0 20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '0px' }}>
          <div style={{ backgroundColor: '#E1F532', padding: '40px', borderRadius: '10px', marginBottom: '20px' }}>
            <p style={{ color: '#5541BA', textAlign: 'center', margin: 0, fontWeight:'1000', fontSize:'60px' }}>{event.event_name.toUpperCase()}</p>
            <p style={{ color: '#7C7C7C', textAlign: 'right', marginBottom: '20px', paddingTop:'20px' }}>
              {event.local} | 12/05/2024  22:30
              <br />
              {event.address}
            </p>
          </div>
          
          <div
            style={{
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '20px',
              textAlign: 'left',
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
          <div className={styles.mapContainer}>
              <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                initialViewState={{
                  longitude:-43.2096,
                  latitude:-22.9035,
                  zoom: 14
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
              >
                <Marker
                  longitude={-43.2096}
                  latitude={-22.9035}
                />
              </Map>
            </div>
            <button
              style={{
                position: 'absolute',
                zIndex: '10000000000',
                marginTop: '-50px',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              Direções no Google Maps
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    color: star <= event.rating ? '#FFD700' : '#D3D3D3', 
                    cursor: 'pointer',
                    padding: '0 2px'
                  }}
                  onClick={() => {
                    // Update rating when star is clicked
                    setEvent(prev => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        rating: star
                      };
                    });
                  }}
                  onMouseEnter={(e) => {
                    // Highlight stars up to current on hover
                    const stars = e.currentTarget.parentElement?.children;
                    if (stars) {
                      for (let i = 0; i < stars.length; i++) {
                        const starElement = stars[i] as HTMLElement;
                        starElement.style.color = i < star ? '#FFD700' : '#D3D3D3';
                      }
                    }
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    // Reset to actual rating on mouse leave
                    const stars = e.currentTarget.parentElement?.children;
                    if (stars) {
                      for (let i = 0; i < stars.length; i++) {
                        const starElement = stars[i] as HTMLElement;
                        starElement.style.color = i < (event?.rating || 0) ? '#FFD700' : '#D3D3D3';
                      }
                    }
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <p style={{ fontWeight: 'bold', color: '#4A4A4A', marginBottom: '10px' }}>Avaliar este evento</p>

          </div>
        </div>
      </div>
    </div>
  );
}
