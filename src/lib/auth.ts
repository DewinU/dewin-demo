import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const key = new TextEncoder().encode(process.env.JWT_SECRET)
const cookieName = 'session'
const cookie = {
  name: cookieName,
  options: {
    httpOnly: true,
    sameSite: 'lax' as 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(user: any) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ ...user, expires: expires })

  cookies().set(cookie.name, session, { ...cookie.options, expires })
}

export async function verifySession() {
  const cookie = cookies().get(cookieName)?.value
  const session = await decrypt(cookie)

  if (!session?.id) {
    return null
  }

  return { userId: session.id, email: session.email, expires: session.expires }
}

export async function deleteSession() {
  cookies().delete(cookieName)
}
