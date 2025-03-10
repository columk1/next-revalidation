'use server'

import { getDb } from './db'

/**
 * Simple SQLite-based counter store
 */

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type CounterId = 1 | 2

/**
 * Get the value of a specific counter
 * @param counterId - The ID of the counter to retrieve
 * @returns Promise<number> The current value of the counter
 */
export async function getCounterValue(counterId: CounterId): Promise<number> {
  await delay(1000) // Simulate DB delay

  const db = getDb()
  const query = db.prepare('SELECT value FROM counters WHERE id = ?')
  const result = query.get(counterId) as { value: number }
  return result?.value ?? 0
}

/**
 * Increment a specific counter
 * @param counterId - The ID of the counter to increment
 */
export async function incrementCounterValue(counterId: CounterId): Promise<void> {
  const db = getDb()
  const update = db.prepare('UPDATE counters SET value = value + 1 WHERE id = ?')
  update.run(counterId)
}
