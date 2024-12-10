'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './EventList.module.css';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';

interface Event {
  id: number;
  event_name: string;
  datetime: string;
  address: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<Set<number>>(new Set());
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!searchQuery) return;
      
      try {
        const response = await fetch(`/api/events?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [searchQuery]);

  const toggleEventSelection = (eventId: number) => {
    const newSelection = new Set(selectedEvents);
    if (selectedEvents.has(eventId)) {
      newSelection.delete(eventId);
    } else {
      newSelection.add(eventId);
    }
    setSelectedEvents(newSelection);
  };

  const handleEventClick = (eventId: number) => {
    router.push(`/events/details?id=${eventId}&prompt=${searchQuery}`);
  };

  return (
    <>
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
    <div className={styles.eventListContainer}>
      {events.slice(0, 10).map((event) => (
        <div 
          key={event.id} 
          className={styles.eventCard}
          onClick={() => handleEventClick(event.id)}
          style={{ cursor: 'pointer' }}
        >
          <h2 className={styles.eventTitle}>{event.event_name}</h2>
          <div className={styles.eventDateTime}>
            {new Date(event.datetime).toLocaleString()}
          </div>
          <div className={styles.eventAddress}>{event.address}</div>
          <div className={styles.bottomRow}>
            <div className={styles.mapContainer}>
              <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                initialViewState={{
                  longitude: -43.2096,
                  latitude: -22.9035,
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
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: event.id % 2 === 0 ? '#E1F532' : '#5541BA',
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedEvents.has(event.id)}
                onChange={() => toggleEventSelection(event.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
