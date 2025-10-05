import { type CookiesFn, getCookie } from 'cookies-next'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3333',
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookies: CookiesFn | undefined

        if (typeof window === 'undefined') {
          const { cookies: nextCookies } = await import('next/headers')
          cookies = nextCookies
        }

        const token = await getCookie('token', { cookies })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
