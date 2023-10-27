import { createCrudView } from './components/auto-crud/AutoCrud'
import { createCrudList } from './components/auto-crud/createCrudList'
import { createUser, deleteUser, fetchUsers, readUser, updateUser } from './user-mock'
import { User } from './schema'
import { UserForm } from './UserForm'

type ListItem = {
  id: number
  username: string
}

export const UserCrudView = createCrudView<User, ListItem>({ username: 'empty' })({
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
  FormComponent: ({ initialValue, onClose, onSave }) => (
    <UserForm
      values={initialValue}
      onSubmit={(user) => {
        onSave(user)
        onClose()
      }}
    />
  ),
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
