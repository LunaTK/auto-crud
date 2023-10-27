import { createCrudView } from './components/auto-crud/AutoCrud'
import { createCrudList } from './components/auto-crud/createCrudList'
import { FormValues } from './schema'
import { useQuery, useMutation } from '@tanstack/react-query'

type ListItem = {
  id: number
  name: string
}

const t = createCrudView<FormValues, ListItem>({})

const a = t({
  useList: () =>
    useQuery({
      queryKey: ['list'],
      queryFn: () => ({
        items: [{ id: 1234, name: 'Alice' }],
      }),
    }),
  listToDataSource: (list) => list.items,
  useCreate: () => useMutation({ mutationFn: async (newForm: FormValues) => void 0 }),
  useDelete: () => useMutation({ mutationFn: async (id: number) => void 0 }),
  useUpdate: () => useMutation({ mutationFn: async (id: number, newForm: FormValues) => void 0 }),
  listItemToData: (item) => item,
  formComponent: () => () => null,
  ListComponent: createCrudList({
    rowKey: 'id',
    columns: (hooks) => [],
  }),
  mkDeletePayload: (item) => void 0,
  getId: () => void 0,
  mkUpdatePayload: () => void 0,
})

export const CrudDemo = () => {}
