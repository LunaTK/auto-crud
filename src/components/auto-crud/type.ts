type Id = string | number

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
   * CRUD API
   */
  action: {
    list: () => Promise<T['list']>
    create: (payload: T['data']) => Promise<void>
    read: (item: T['listItem']) => Promise<T['data']>
    update: (data: T['data'], listItem: T['listItem']) => Promise<void>
    delete: (item: T['listItem']) => Promise<void>
  }
  /**
   * For List and Form
   */
  getId: (item: T['listItem']) => Id
  useHooks?: () => T['hooks']
  listToDataSource: (asdf: T['list']) => T['listItem'][]
  ListComponent: CrudListComponent<T>
  FormComponent: CrudFormComponent<T>
}

export type CrudFormComponent<T extends Crud> = React.FunctionComponent<{
  onClose: () => void
  onSave: (data: T['data']) => void
  initialValue?: Partial<T['data']>
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
