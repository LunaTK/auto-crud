import type { UseQueryResult } from '@tanstack/react-query'

type Id = string | number

type CrudViewOptions = {
  editViewType: 'page' | 'drawer'
}

export type Crud = {
  data: unknown
  list: unknown
  listItem: unknown
  createPayload: unknown
  updatePayload: unknown
  deletePayload: unknown
  hooks: unknown
}

export type CrudManifest<T extends Crud> = {
  name: string
  /**
   * FDelete
   */
  action: {
    list: () => Promise<T['list']>
    create: (payload: T['data']) => Promise<void>
    read: (item: T['listItem']) => Promise<T['data']>
    update: (data: T['data'], listItem: T['listItem']) => Promise<void>
    delete: (item: T['listItem']) => Promise<void>
  }
  /**
   * For List
   */
  getId: (item: T['listItem']) => Id
  useHooks?: () => T['hooks']
  listToDataSource: (asdf: T['list']) => T['listItem'][]
  ListComponent: CrudListComponent<T>
  /**
   * For Create / Update
   */
  formComponent: CrudFormComponent<T>
  /**
   * ETC
   */
  options?: CrudViewOptions
}

export type CrudFormComponent<T extends Crud> = (props: {
  initialValue: Partial<T['data']>
  manifest: CrudManifest<T>
}) => React.FunctionComponent<{
  onClose: () => void
  list: UseQueryResult<T['list']>
  item?: T['listItem']
}>

export type CrudListComponent<T extends Crud> = React.FunctionComponent<{
  dataSource: T['listItem'][] | undefined
  create: VoidFunction
  update: (item: T['listItem']) => void
  del: (item: T['listItem']) => void
  isLoading: boolean
  refresh: VoidFunction
  useHooks?: () => T['hooks']
}>
