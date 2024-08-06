import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'
import { todos } from './schema'
import 'dotenv/config'

async function seed() {
  const sqlite = new Database(process.env.DB_URL!)
  const db = drizzle(sqlite, { schema, logger: true })
  console.log('Seeding database...')
  await db
    .insert(todos)
    .values([
      {
        id: 1,
        title: 'Learn SQL',
        completed: 0,
      },
      {
        id: 2,
        title: 'Learn TypeScript',
        completed: 0,
      },
      {
        id: 3,
        title: 'Learn JavaScript',
        completed: 0,
      },
    ])
    .onConflictDoNothing()
}

seed()
  .catch(err => {
    console.error('Error seeding database:', err)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Seeding done!')
    process.exit(0)
  })
