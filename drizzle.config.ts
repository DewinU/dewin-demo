// drizzle.config.ts

import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'demo.db',
  },
} satisfies Config
