import { useMemo, useState } from 'react'
import type { CrudManifest } from './type'
import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { useMutation, useQuery } from '@tanstack/react-query'

const CREATE_INDICATOR = '__create__'

export const createCrudView =
  <TFormData extends Record<string, unknown>, TListItem extends Record<string, unknown>>(initialValue: Partial<TFormData>) =>
  <TList, TCreatePayload, TUpdatePayload, TDeletePayload, THooks>(
    manifest: CrudManifest<{
      data: TFormData
      list: TList
      listItem: TListItem
      createPayload: TCreatePayload
      updatePayload: TUpdatePayload
      deletePayload: TDeletePayload
      hooks: THooks
    }>
  ) => {
    const { getId, name, listToDataSource, action, formComponent, ListComponent } = manifest
    const { editViewType = 'page' } = manifest.options ?? {}

    const CrudForm = formComponent({ initialValue, manifest })

    const AutoCrud: React.FC = () => {
      const list = useQuery({
        queryKey: ['crud', name, 'list'],
        queryFn: action.list,
      })
      const deletion = useMutation({ mutationFn: action.delete })
      const [selectedId, setSelectedId] = useState<string | null>('')
      const dataSource = useMemo(() => {
        return list.data && listToDataSource(list.data)
      }, [list])
      const selected = dataSource?.find((item) => String(getId(item)) === selectedId)
      const isEditMode = selectedId !== null && selectedId !== undefined

      if (isEditMode && selectedId !== CREATE_INDICATOR && !selected) {
        return (
          <div>
            <div>
              ID <i>{String(selectedId)}</i>does not exist
            </div>

            <button onClick={() => setSelectedId(null)}>Go to List</button>
          </div>
        )
      } else if (isEditMode && editViewType === 'page') {
        return <CrudForm {...manifest} onClose={() => setSelectedId(null)} list={list} item={selected} />
      } else {
        const deleteButton = (record: TListItem) => (
          <button
            onClick={() => {
              if (!confirm('정말로 삭제하시겠습니까')) return

              deletion.mutateAsync(record, {
                onSuccess: () => list.refetch(),
              })
            }}
          >
            삭제
          </button>
        )
        const editButton = (record: TListItem) => (
          <button
            onClick={() => {
              setSelectedId(String(getId(record)))
            }}
          >
            수정
          </button>
        )
        const deleteEditButton = (record: TListItem) => (
          <>
            {editButton(record)} {deleteButton(record)}
          </>
        )

        return (
          <>
            <ListComponent
              useHooks={manifest.useHooks}
              isLoading={list.isLoading}
              dataSource={dataSource}
              createButton={() => <button onClick={() => setSelectedId(CREATE_INDICATOR)}>새로 생성</button>}
              refreshButton={() => (
                <button disabled={list.isLoading} onClick={() => list.refetch()}>
                  새로고침
                </button>
              )}
              deleteButton={deleteButton}
              editButton={editButton}
              deleteEditButton={deleteEditButton}
            />
            <Dialog open={isEditMode} onOpenChange={(flag) => !flag && setSelectedId(null)}>
              <DialogContent>
                {isEditMode && <CrudForm {...manifest} onClose={() => setSelectedId(null)} list={list} item={selected} />}
              </DialogContent>
            </Dialog>
          </>
        )
      }
    }

    return AutoCrud
  }
