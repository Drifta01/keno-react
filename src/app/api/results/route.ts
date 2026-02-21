import { NextResponse } from 'next/server';
import path from 'path';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';


const dbPath = path.join(process.cwd(), '..', '..', 'keno_results.db');

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function GET(request: Request) {
    try {
        // Open the database connection if it's not already open
        if (!db) {
            db = await open({
                filename: dbPath,
                driver: sqlite3.Database,
                mode: sqlite3.OPEN_READONLY // Open in read-only mode
            });
        }

        // Get search params from the request URL (e.g., /api/results?limit=50)
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '30', 10);

        const results = await db.all(
            'SELECT * FROM results ORDER BY timestamp DESC LIMIT ?',
            [limit]
        );

        // The 'numbers' column stores data as a JSON string, so we parse it.
        const parsedResults = results.map(row => ({
            ...row,
            numbers: JSON.parse(row.numbers)
        }));

        return NextResponse.json({ success: true, data: parsedResults }, { status: 200 });

    } catch (error) {
        console.error('Database query failed:', error);
        // Ensure we send a proper JSON error response
        return NextResponse.json(
            { success: false, error: 'Failed to retrieve results from the database.' },
            { status: 500 }
        );
    }
}