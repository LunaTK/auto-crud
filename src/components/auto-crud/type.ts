import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'

type Id = string | number

type CrudViewOptions = {
  editViewType: 'page' | 'drawer'
}

export type Crud = {
  formData: unknown
  list: unknown
  listItem: unknown
  createPayload: unknown
  updatePayload: unknown
  deletePayload: unknown
  hooks: unknown
}

export type CrudManifest<T extends Crud> = {
  /**
   * FDelete
   */
  mkDeletePayload: (item: T['listItem']) => T['deletePayload']
  useDelete: () => UseMutationResult<unknown, unknown, T['deletePayload']>
  /**
   * For List
   */
  getId: (item: T['listItem']) => Id
  useHooks?: () => T['hooks']
  useList: () => UseQueryResult<T['list']>
  listToDataSource: (asdf: T['list']) => T['listItem'][]
  ListComponent: CrudListComponent<T>
  /**
   * For Create / Update
   */
  useCreate: () => UseMutationResult<unknown, unknown, T['createPayload']>
  useUpdate: () => UseMutationResult<unknown, unknown, T['updatePayload']>
  listItemToData: (item: T['listItem'], hooks: T['hooks']) => T['data'] | Promise<T['data']>
  mkCreatePayload: (item: T['data']) => T['createPayload']
  mkUpdatePayload: (newValue: T['data'], base: T['listItem']) => T['updatePayload']
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
