import { defineConfig } from 'prisma/config'

export default defineConfig({
  migrations: {
    seed: 'npm run env:load tsx prisma/seed.ts',
  },
})
