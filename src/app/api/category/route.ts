import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Component interface
interface CategoryComponent {
  id?: number;
  name: string;
  description?: string;
  parent_id?: number;
  getChildren(): Promise<CategoryComponent[]>;
  save(): Promise<number | undefined>;
}

// Leaf class representing a simple category
class SimpleCategory implements CategoryComponent {
  constructor(
    public name: string,
    public description?: string,
    public id?: number,
    public parent_id?: number
  ) {}

  async getChildren(): Promise<CategoryComponent[]> {
    return [];
  }

  async save(): Promise<number | undefined> {
    try {
      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const result = await db.run(
        `INSERT INTO event_categories (name, description, parent_id) 
         VALUES (?, ?, ?)`,
        [this.name, this.description, this.parent_id]
      );

      await db.close();
      return result.lastID;
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }
}

// Composite class representing a category that can contain other categories
class CompositeCategory implements CategoryComponent {
  private children: CategoryComponent[] = [];

  constructor(
    public name: string,
    public description?: string,
    public id?: number,
    public parent_id?: number
  ) {}

  async getChildren(): Promise<CategoryComponent[]> {
    try {
      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const childCategories = await db.all(
        'SELECT * FROM event_categories WHERE parent_id = ?',
        [this.id]
      );

      await db.close();

      this.children = childCategories.map(cat => 
        new CompositeCategory(cat.name, cat.description, cat.id, cat.parent_id)
      );

      return this.children;
    } catch (error) {
      console.error('Error getting children:', error);
      throw error;
    }
  }

  async save(): Promise<number | undefined> {
    try {
      const db = await open({
        filename: './src/app/db/db.sqlite',
        driver: sqlite3.Database
      });

      const result = await db.run(
        `INSERT INTO event_categories (name, description, parent_id) 
         VALUES (?, ?, ?)`,
        [this.name, this.description, this.parent_id]
      );

      await db.close();
      return result.lastID;
    } catch (error) {
      console.error('Error saving category:', error);
      throw error;
    }
  }
}

// API Routes
export async function GET(request: NextRequest) {
  try {
    const db = await open({
      filename: './src/app/db/db.sqlite',
      driver: sqlite3.Database
    });

    // Get root categories (those without parent_id)
    const rootCategories = await db.all('SELECT * FROM event_categories WHERE parent_id IS NULL');
    
    // Convert to composite objects and get their children
    const categories = await Promise.all(
      rootCategories.map(async cat => {
        const category = new CompositeCategory(cat.name, cat.description, cat.id);
        const children = await category.getChildren();
        return {
          ...cat,
          children
        };
      })
    );

    await db.close();
    return NextResponse.json(categories);

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
    const { name, description, parent_id, isComposite } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    let category: CategoryComponent;
    if (isComposite) {
      category = new CompositeCategory(name, description, undefined, parent_id);
    } else {
      category = new SimpleCategory(name, description, undefined, parent_id);
    }

    const categoryId = await category.save();

    return NextResponse.json({
      message: "Category created successfully",
      categoryId
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
