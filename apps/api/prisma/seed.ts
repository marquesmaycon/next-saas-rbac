import { faker } from '@faker-js/faker'
import { hash } from 'bcryptjs'

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function seed() {
  await prisma.member.deleteMany()
  await prisma.project.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

  const me = await prisma.user.create({
    data: {
      name: 'Maycon Marques',
      email: 'maycon@example.com',
      avatarUrl: 'https://github.com/marquesmaycon.png',
      passwordHash,
    },
  })

  const user1 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatarGitHub(),
      passwordHash,
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc. (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.image.avatarGitHub(),
      attachUsersByDomain: true,
      ownerId: me.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: me.id, role: 'ADMIN' },
            { userId: user1.id, role: 'MEMBER' },
            { userId: user2.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc. (Member)',
      slug: 'acme-member',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: me.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: me.id, role: 'MEMBER' },
            { userId: user1.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc. (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatarGitHub(),
      ownerId: me.id,
      projects: {
        createMany: {
          data: [
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
            {
              name: faker.lorem.words(3),
              slug: faker.lorem.slug(3),
              description: faker.lorem.paragraph(),
              avatarUrl: faker.image.avatarGitHub(),
              ownerId: faker.helpers.arrayElement([me.id, user1.id, user2.id]),
            },
          ],
        },
      },
      members: {
        createMany: {
          data: [
            { userId: me.id, role: 'BILLING' },
            { userId: user1.id, role: 'ADMIN' },
            { userId: user2.id, role: 'MEMBER' },
          ],
        },
      },
    },
  })
}

seed().then(async () => {
  console.log('Seeding finished.')
  await prisma.$disconnect()
})
