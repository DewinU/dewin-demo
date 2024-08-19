import 'server-only'

import { db } from '@/db'
import { users } from '@/db/schema'
import { verifySession } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUser = cache(async () => {
  const session = await verifySession()

  // const user = await db.query.users.findFirst({
  //   where: eq(users.id, session?.userId as number),
  //   columns: {
  //     email: true,
  //     id: true,
  //   },
  // })

  // return user

  return {
    email: session?.email as string,
    id: session?.userId as number,
    expires: session?.expires as number,
  }
})
