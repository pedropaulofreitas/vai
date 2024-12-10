import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Open database connection
    const db = await open({
      filename: './src/app/db/db.sqlite',
      driver: sqlite3.Database
    });

    // Query for event by id
    const event = await db.get(`
      SELECT 
        id,
        event_name,
        local,
        address, 
        description,
        ticket_price,
        link
      FROM events 
      WHERE id = ?
    `, id);

    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
