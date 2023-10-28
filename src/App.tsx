import { createCrudView } from './components/auto-crud/AutoCrud'
import { createAutoForm } from './components/auto-crud/createAutoForm'
import { createCrudList } from './components/auto-crud/createCrudList'
import { createUser, deleteUser, fetchUsers, readUser, updateUser } from './lib/api-mock'
import { userSchema, type User, type UserSummary } from './schema'

const UserCrudView = createCrudView<User, UserSummary>({ username: 'empty' })({
  name: 'User',
  action: {
    list: fetchUsers,
    create: createUser,
    read: ({ id }) => readUser(id),
    update: (user, { id }) => updateUser(id, user),
    delete: ({ id }) => deleteUser(id),
  },
  getId: ({ id }) => id,
  listToDataSource: (list) => list.users,
  FormComponent: createAutoForm({ schema: userSchema }),
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
  options: {
    editViewType: 'drawer',
  },
})

export default function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <UserCrudView />
    </div>
  )
}
