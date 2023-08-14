import { inputObjectType, mutationType, nonNull, nullable, queryType, stringArg } from 'nexus'
import { mutationAddUser, mutationEditUser, mutationRemoveUser, queryAllUsers, queryUser } from './user.service'

const Query = queryType({
  definition(t) {
    t.list.field('allUsers', {
      type: 'User',
      resolve: () => queryAllUsers(),
    })

    t.field('user', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: (_, args) => queryUser(args),
    })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.field('addUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        name: nullable(stringArg()),
      },
      resolve: (_, args) => mutationAddUser(args),
    })

    t.field('removeUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
      },
      resolve: (_, args) => mutationRemoveUser(args),
    })

    t.field('editUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        input: nonNull('EditUserInput'),
      },
      resolve: (_, args) => mutationEditUser(args),
    })
  },
})

const MutationInput = inputObjectType({
  name: 'EditUserInput',
  definition(t) {
    t.nullable.string('name')
  },
})

export const UserResolver = [
  Query, Mutation, MutationInput,
]
