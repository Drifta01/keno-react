CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY,
    edition TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    numbers TEXT NOT NULL,
    type INTEGER,
    state INTEGER
);
COMMIT;

