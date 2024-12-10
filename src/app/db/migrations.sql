
CREATE TABLE IF NOT EXISTS event_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS event_organizers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    website TEXT
);

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name TEXT NOT NULL,
    local TEXT NOT NULL,
    address TEXT NOT NULL,
    description TEXT,
    ticket_price DECIMAL(10,2),
    link TEXT,
    event_vector BLOB,
    event_date DATETIME NOT NULL,
    category_id INTEGER NOT NULL,
    organizer_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES event_categories(id),
    FOREIGN KEY (organizer_id) REFERENCES event_organizers(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS user_events (
    user_id INTEGER,
    event_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);
