

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { PartyEventFactory, MusicEventFactory, DefaultEventFactory } from './factory';
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const prompt = searchParams.get('q');

    if (!prompt) {
      return NextResponse.json(
        { error: "Search prompt is required" },
        { status: 400 }
      );
    }

    // Generate embedding for the search prompt
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: prompt,
        model: "text-embedding-ada-002"
      })
    });

    const embeddings = await response.json();
    const searchVector = Buffer.from(Float32Array.from(embeddings.data[0].embedding).buffer);

    // Open database connection
    const db = await open({
      filename: './src/app/db/db.sqlite',
      driver: sqlite3.Database
    });

    // Query for closest events
    // Note: This is a simplified version that just returns all events
    // You'll need to implement vector similarity comparison in application code
    const events = await db.all(`
      SELECT 
        id,
        event_name,
        local,
        address,
        description,
        ticket_price,
        link,
        event_vector
      FROM events
      LIMIT 50
    `);

    // Calculate cosine similarity in JS since SQLite doesn't support vector operations
    const processedEvents = events.map(event => {
      const eventVector = new Float32Array(event.event_vector.buffer);
      const searchVectorArray = new Float32Array(searchVector.buffer);
      
      // Calculate dot product
      let dotProduct = 0;
      let eventMagnitude = 0;
      let searchMagnitude = 0;
      
      for (let i = 0; i < eventVector.length; i++) {
        dotProduct += eventVector[i] * searchVectorArray[i];
        eventMagnitude += eventVector[i] * eventVector[i];
        searchMagnitude += searchVectorArray[i] * searchVectorArray[i];
      }
      
      const similarity = dotProduct / (Math.sqrt(eventMagnitude) * Math.sqrt(searchMagnitude));
      
      // Return event data without the event_vector
      const { event_vector, ...eventWithoutVector } = event;
      return {
        ...eventWithoutVector,
        similarity
      };
    });

    // Sort by similarity
    processedEvents.sort((a, b) => b.similarity - a.similarity);
  
    console.log(processedEvents);

    await db.close();

    return NextResponse.json(processedEvents.slice(0, 3));

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_name, local, address,event_date, description, ticket_price, link } = body;

    // Validate required fields
    if (!event_name || !local || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create appropriate event factory based on event name
    let eventFactory;
    const lowerEventName = event_name.toLowerCase();
    if (lowerEventName.includes('festa')) {
      eventFactory = new PartyEventFactory();
    } else if (lowerEventName.includes('show')) {
      eventFactory = new MusicEventFactory(); 
    } else {
      eventFactory = new DefaultEventFactory();
    }

    // Create event using factory
    const event = eventFactory.createEvent(
      event_name,
      local, 
      address,
      event_date,
      description,
      ticket_price,
      link
    );

    const result = await event.generateEmbeddingAndSave();
    return NextResponse.json({
      message: "Event created successfully",
      eventId: result
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
