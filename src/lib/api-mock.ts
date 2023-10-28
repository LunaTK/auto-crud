import { User } from '../schema'

const users: User[] = [{ username: 'Alice', password: 'qwert1234' }]

export const fetchUsers = async () => {
  return {
    total: users.length,
    users: users.map((user, id) => ({ id, username: user.username })),
  }
}

export const createUser = async (user: User) => {
  users.push(user)
}

export const readUser = async (id: number) => {
  return users[id]! // TODO: handle undefined
}

export const updateUser = async (id: number, user: User) => {
  users[id] = user
}

export const deleteUser = async (id: number) => {
  users.splice(id, 1)
}
