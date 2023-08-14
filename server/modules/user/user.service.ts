import type { Maybe } from 'nexus/dist/core'
import { prisma } from '../context'

export function queryAllUsers() {
  return prisma.user.findMany()
}

export function queryUser(
  args: {
    email: string
  },
) {
  return prisma.user.findFirst({
    where: {
      email: args.email,
    },
  })
}

export function mutationAddUser(
  args: {
    email: string
    name?: Maybe<string>
  },
) {
  return prisma.user.create({
    data: {
      email: args.email,
      name: args.name,
    },
  })
}

export function mutationRemoveUser(
  args: {
    email: string
  },
) {
  return prisma.user.delete({
    where: {
      email: args.email,
    },
  })
}

export function mutationEditUser(
  args: {
    email: string
    input?: Maybe<EditUserInput>
  },
) {
  return prisma.user.update({
    where: {
      email: args.email,
    },
    data: {
      name: args.input?.name,
    },
  })
}

export interface EditUserInput {
  name?: Maybe<string>
}
