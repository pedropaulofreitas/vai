import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className={styles.header} style={{ background: 'white', padding: '1rem' }}>
        <p>Vem com a gente!</p>
      </header>

      <main className={styles.main} style={{ flex: 1, background: '#f5f5f5', padding: '2rem' }}>
        <div className={styles.chatContainer} style={{
          maxWidth: '600px',
          margin: '10vh auto 0',
          height: '50vh',
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          justifyContent:'center',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <Image src="/logoround.svg" alt="Logo" width={76} height={76} />
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0,
                marginBottom: '8px',
                color: '#667085'
              }}>E ai?</h2>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'normal',
                margin: 0,
                color: '#667085'
              }}>Qual vai ser o rolé de hoje?</h3>
            </div>
            <button style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#E1F5328C',
              color: '#211509',
              cursor: 'pointer',
              width: '80%'
            }}>Role Cultural no Centro</button>
            
            <button style={{
              padding: '12px 24px', 
              borderRadius: '8px',
              border: 'none',
              background: '#E1F5328C',
              color: '#211509',
              cursor: 'pointer',
              width: '80%'
            }}>Show de Rock</button>
            
            <button style={{
              padding: '12px 24px',
              borderRadius: '8px', 
              border: 'none',
              background: '#E1F5328C',
              color: '#211509',
              cursor: 'pointer',
              width: '80%'
            }}>Samba na Lapa</button>
          </div>

          <Link
            href="/chat"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none', 
              background: '#5541BA',
              color: 'white',
              cursor: 'pointer',
              position: 'absolute',
              bottom: '25px',
              left: '15px',
              right: '15px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block'
            }}>
            Iniciar Conversa
          </Link>
        </div>
      </main>

      <footer className={styles.footer} style={{ background: 'white', padding: '1rem', textAlign: 'center' }}>
        <p>Powered by VAI - Seu assistente virtual carioca</p>
      </footer>
    </div>
  );
}
