import { useMemo, useState } from 'react'
import type { CrudManifest } from './type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

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
    const { getId, name, listToDataSource, action, FormComponent, ListComponent } = manifest
    const { editViewType = 'page' } = manifest.options ?? {}

    const AutoCrud: React.FC = () => {
      const list = useQuery({
        queryKey: ['crud', name, 'list'],
        queryFn: action.list,
      })
      const deletion = useMutation({ mutationFn: action.delete, onSuccess: () => list.refetch() })
      const [selectedId, setSelectedId] = useState<string | null>(null)
      const dataSource = useMemo(() => {
        return list.data && listToDataSource(list.data)
      }, [list])
      const selected = dataSource?.find((item) => String(getId(item)) === selectedId)
      const selectedItem = useQuery({
        queryKey: ['crud', name, 'selected', selectedId],
        queryFn: () => action.read(selected!),
        enabled: !!selected,
      })
      const isFormMode = selectedId !== null && selectedId !== undefined

      const listComponent = (
        <ListComponent
          useHooks={manifest.useHooks}
          isLoading={list.isLoading}
          dataSource={dataSource}
          create={() => setSelectedId(CREATE_INDICATOR)}
          refresh={() => list.refetch()}
          update={(record) => setSelectedId(String(getId(record)))}
          del={(record) => deletion.mutate(record)}
        />
      )

      if (isFormMode && selectedId !== CREATE_INDICATOR && !selected) {
        return (
          <div>
            <div>
              ID <i>{String(selectedId)}</i>does not exist
            </div>

            <button onClick={() => setSelectedId(null)}>Go to List</button>
          </div>
        )
      } else if (isFormMode) {
        const editForm = (
          <FormComponent
            onClose={() => setSelectedId(null)}
            initialValue={selectedItem.data ?? initialValue}
            onSave={(data) => {
              const mode = selectedId === CREATE_INDICATOR ? 'new' : 'edit'
              ;(mode === 'new' ? action.create(data) : action.update(data, selected!)).then(() => list.refetch())
            }}
          />
        )
        if (editViewType === 'page') return editForm

        return (
          <>
            {listComponent}
            <Sheet open={isFormMode} onOpenChange={(flag) => !flag && setSelectedId(null)}>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    {selectedId === CREATE_INDICATOR ? 'Create' : 'Edit'} {name}
                  </SheetTitle>
                </SheetHeader>

                {editForm}
              </SheetContent>
            </Sheet>
          </>
        )
      }

      return listComponent
    }

    return AutoCrud
  }
