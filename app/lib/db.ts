import { DatabaseSync } from 'node:sqlite'

// This ensures we have a singleton database connection
let db: DatabaseSync | null = null

function getDb() {
	if (!db) {
		db = new DatabaseSync('./counters.db')

		// Create the counters table if it doesn't exist
		db.exec(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY,
        value INTEGER NOT NULL DEFAULT 0
      ) STRICT
    `)

		// Initialize counters if they don't exist
		const insert = db.prepare(
			'INSERT OR IGNORE INTO counters (id, value) VALUES (?, ?)',
		)
		insert.run(1, 0)
		insert.run(2, 0)
	}
	return db
}

export { getDb }
