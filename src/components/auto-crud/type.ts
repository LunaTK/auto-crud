/* eslint-disable @typescript-eslint/no-unused-vars */
type Id = string | number

export type Crud = {
  data: unknown
  list: unknown
  listItem: unknown
  hooks: unknown
}

export type CrudManifest<TFormData, TList, TListItem, THooks> = {
  name: string
  /**
   * CRUD API
   */
  action: {
    list: () => Promise<TList>
    create: (payload: TFormData) => Promise<void>
    read: (item: TListItem) => Promise<TFormData>
    update: (data: TFormData, listItem: TListItem) => Promise<void>
    delete: (item: TListItem) => Promise<void>
  }
  /**
   * For List and Form
   */
  getId: (item: TListItem) => Id
  useHooks?: () => THooks
  listToDataSource: (list: TList) => TListItem[]
  ListComponent: CrudListComponent<TFormData, TList, TListItem, THooks>
  FormComponent: CrudFormComponent<TFormData, TList, TListItem, THooks>
}

export type CrudFormComponent<TFormData, TList, TListItem, THooks> = React.FunctionComponent<{
  onSave: (data: TFormData) => void
  initialValue?: Partial<TFormData>
  loading: boolean
  mode: 'create' | 'update'
}>

export type CrudListComponent<TFormData, TList, TListItem, THooks> = React.FunctionComponent<{
  dataSource: TListItem[] | undefined
  create: VoidFunction
  update: (item: TListItem) => void
  del: (item: TListItem) => void
  isLoading: boolean
  refresh: VoidFunction
  useHooks?: () => THooks
}>
