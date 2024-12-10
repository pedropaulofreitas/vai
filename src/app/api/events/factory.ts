import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Abstract Product interface
interface IEvent {
  event_name: string;
  local: string;
  address: string;
  description?: string;
  ticket_price?: string;
  link?: string;
  event_date: Date;
  category_id: number;
  organizer_id: number;
  generateEmbeddingAndSave(): Promise<number | undefined>;
}

// Concrete Products
class MusicEvent implements IEvent {
  category_id = 1;
  organizer_id: number;

  constructor(
    public event_name: string,
    public local: string,
    public address: string,
    public event_date: Date,
    public description?: string,
    public ticket_price?: string,
    public link?: string
  ) {
    //this is mock for now
    this.organizer_id = Number(1);
  }

  async generateEmbeddingAndSave() {
    try {
      const content = `${this.event_name} ${this.description || ''} ${this.local} ${this.ticket_price ? `Price: ${this.ticket_price}` : ''}`.trim();

      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: content,
          model: "text-embedding-ada-002"
        })
      });

      const embeddings = await response.json();
      const vector = Buffer.from(Float32Array.from(embeddings.data[0].embedding).buffer);

      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const result = await db.run(
        `INSERT INTO events (event_name, local, address, description, ticket_price, link, event_vector, event_date, category_id, organizer_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [this.event_name, this.local, this.address, this.description, this.ticket_price, this.link, vector, new Date(this.event_date).toISOString(), this.category_id, this.organizer_id]
      );

      await db.close();
      return result.lastID;

    } catch (error) {
      console.error('Error generating embedding and saving:', error);
      throw error;
    }
  }
}

class DefaultEvent implements IEvent {
  category_id = 3;
  organizer_id: number;

  constructor(
    public event_name: string,
    public local: string,
    public address: string,
    public event_date: Date,
    public description?: string,
    public ticket_price?: string,
    public link?: string
  ) {
    this.organizer_id = Number(1);
  }

  async generateEmbeddingAndSave(){
    try {
      const content = `${this.event_name} ${this.description || ''} ${this.local} ${this.ticket_price ? `Price: ${this.ticket_price}` : ''}`.trim();

      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: content,
          model: "text-embedding-ada-002"
        })
      });

      const embeddings = await response.json();
      const vector = Buffer.from(Float32Array.from(embeddings.data[0].embedding).buffer);

      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const result = await db.run(
        `INSERT INTO events (event_name, local, address, description, ticket_price, link, event_vector, event_date, category_id, organizer_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [this.event_name, this.local, this.address, this.description, this.ticket_price, this.link, vector, new Date(this.event_date).toISOString(), this.category_id, this.organizer_id]
      );

      await db.close();
      return result.lastID;

    } catch (error) {
      console.error('Error generating embedding and saving:', error);
      throw error;
    }
  }
}

class PartyEvent implements IEvent {
  category_id = 2;
  organizer_id: number;

  constructor(
    public event_name: string,
    public local: string,
    public address: string,
    public event_date: Date,
    public description?: string,
    public ticket_price?: string,
    public link?: string
  ) {
    this.organizer_id = Number(1);
  }

  async generateEmbeddingAndSave() {
    try {
      const content = `${this.event_name} ${this.description || ''} ${this.local} ${this.ticket_price ? `Price: ${this.ticket_price}` : ''}`.trim();

      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: content,
          model: "text-embedding-ada-002"
        })
      });

      const embeddings = await response.json();
      const vector = Buffer.from(Float32Array.from(embeddings.data[0].embedding).buffer);

      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const result = await db.run(
        `INSERT INTO events (event_name, local, address, description, ticket_price, link, event_vector, event_date, category_id, organizer_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [this.event_name, this.local, this.address, this.description, this.ticket_price, this.link, vector, new Date(this.event_date).toISOString(), this.category_id, this.organizer_id]
      );

      await db.close();
      return result.lastID;

    } catch (error) {
      console.error('Error generating embedding and saving:', error);
      throw error;
    }
  }
}

// Abstract Creator
abstract class EventFactory {
  abstract createEvent(
    event_name: string,
    local: string,
    address: string,
    event_date: Date,
    description?: string,
    ticket_price?: string,
    link?: string
  ): IEvent;

  async generateEmbeddingAndSave(
    event_name: string,
    local: string,
    address: string,
    event_date: Date,
    description?: string,
    ticket_price?: string,
    link?: string
  ): Promise<number | undefined> {
    const event = this.createEvent(event_name, local, address, event_date, description, ticket_price, link);
    return await event.generateEmbeddingAndSave();
  }
}

export class DefaultEventFactory extends EventFactory {
  createEvent(
    event_name: string,
    local: string,
    address: string,
    event_date: Date,
    description?: string,
    ticket_price?: string,
    link?: string
  ): IEvent {
    return new DefaultEvent(event_name, local, address, event_date, description, ticket_price, link);
  }
}

// Concrete Creators
export class MusicEventFactory extends EventFactory {
  createEvent(
    event_name: string,
    local: string,
    address: string,
    event_date: Date,
    description?: string,
    ticket_price?: string,
    link?: string
  ): IEvent {
    return new MusicEvent(event_name, local, address, event_date, description, ticket_price, link);
  }
}

export class PartyEventFactory extends EventFactory {
  createEvent(
    event_name: string,
    local: string,
    address: string,
    event_date: Date,
    description?: string,
    ticket_price?: string,
    link?: string
  ): IEvent {
    return new PartyEvent(event_name, local, address, event_date, description, ticket_price, link);
  }
}
