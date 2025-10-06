import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { authenticateWithGitHub } from '@/http/authenticate-with-github'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'GitHub OAuth code was not found' },
      { status: 400 },
    )
  }

  const { token } = await authenticateWithGitHub({ code })
  const ck = await cookies()
  ck.set('token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 })

  const inviteId = ck.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInvite(inviteId)
      ck.delete('inviteId')
    } catch {}
  }

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = '/'
  redirectUrl.search = ''

  return NextResponse.redirect(redirectUrl)
}
