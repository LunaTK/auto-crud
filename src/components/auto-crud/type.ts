import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'

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
  createButton: () => ReactNode
  refreshButton: () => ReactNode
  deleteEditButton: (item: T['listItem']) => ReactNode
  deleteButton: (item: T['listItem']) => ReactNode
  editButton: (item: T['listItem']) => ReactNode
  dataSource: T['listItem'][] | undefined
  isLoading: boolean
  useHooks?: () => T['hooks']
}>
