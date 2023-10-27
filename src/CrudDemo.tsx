import { createCrudView } from './components/auto-crud/AutoCrud'
import { createCrudList } from './components/auto-crud/createCrudList'
import { createUser, deleteUser, fetchUsers, readUser, updateUser } from './user-mock'
import { User } from './schema'

type ListItem = {
  id: number
  username: string
}

export const UserCrudView = createCrudView<User, ListItem>({})({
  name: 'crud demo',
  action: {
    list: fetchUsers,
    create: createUser,
    read: ({ id }) => readUser(id),
    update: (user, { id }) => updateUser(id, user),
    delete: ({ id }) => deleteUser(id),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.users,
  formComponent: () => () => null,
  ListComponent: createCrudList({
    columns: () => [
      {
        accessorKey: 'id',
        accessorFn: ({ id }) => id,
      },
      {
        accessorKey: 'username',
        accessorFn: ({ username }) => username,
      },
    ],
  }),
})
