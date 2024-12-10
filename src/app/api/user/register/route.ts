import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Abstract base class defining template method
abstract class UserCreator {
  async createUser(username: string, email: string, password: string) {
    // Template method defining algorithm steps
    await this.validateInput(username, email, password);
    const db = await this.openDatabase();
    await this.checkExistingUser(db, email);
    const userId = await this.insertUser(db, username, email, password);
    await this.closeDatabase(db);
    return userId;
  }

  protected async validateInput(username: string, email: string, password: string) {
    if (!username || !email || !password) {
      throw new Error("Missing required fields");
    }
  }

  protected async openDatabase() {
    return await open({
      filename: './src/app/db/db.sqlite',
      driver: sqlite3.Database
    });
  }

  protected async closeDatabase(db: any) {
    await db.close();
  }

  protected abstract checkExistingUser(db: any, email: string): Promise<void>;
  protected abstract insertUser(db: any, username: string, email: string, password: string): Promise<number>;
}

// Concrete implementation
class StandardUserCreator extends UserCreator {
  protected async checkExistingUser(db: any, email: string) {
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
  }

  protected async insertUser(db: any, username: string, email: string, password: string) {
    const result = await db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    return result.lastID;
  }
}

const userCreator = new StandardUserCreator();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    const userId = await userCreator.createUser(username, email, password);

    return NextResponse.json({
      message: "User registered successfully",
      userId
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error registering user:', error);
    
    if (error.message === "Missing required fields") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error.message === "User with this email already exists") {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const db = await open({
      filename: './src/app/db/database.sqlite',
      driver: sqlite3.Database
    });

    const users = await db.all('SELECT id, username, email FROM users');
    
    await db.close();

    return NextResponse.json(users);

  } catch (error) {
    console.error('Error retrieving users:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
