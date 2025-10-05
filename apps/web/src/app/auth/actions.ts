'use server'

import { env } from '@saas/env'
import { redirect } from 'next/navigation'

export async function signInWithGitHub() {
  const signInUrl = new URL('login/oauth/authorize', 'https://github.com')
  signInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
  signInUrl.searchParams.set('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)
  signInUrl.searchParams.set('scope', 'user:email')

  redirect(signInUrl.toString())
}
