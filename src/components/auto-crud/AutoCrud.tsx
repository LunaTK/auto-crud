import { useState } from 'react'
import type { CrudManifest } from './type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import toast from 'react-hot-toast'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

const CREATE_INDICATOR = '_create_new_'

export const createCrudView =
  <TFormData extends Record<string, unknown>, TListItem extends Record<string, unknown>>(initialValue: Partial<TFormData>) =>
  <TList, THooks>(
    manifest: CrudManifest<{
      data: TFormData
      list: TList
      listItem: TListItem
      hooks: THooks
    }>
  ) => {
    const { getId, name, listToDataSource, action, FormComponent, ListComponent } = manifest

    const AutoCrud: React.FC = () => {
      const queryClient = useQueryClient()
      const invalidate = () => queryClient.invalidateQueries({ queryKey: ['crud', name] })
      const list = useQuery({
        queryKey: ['crud', name, 'list'],
        queryFn: action.list,
      })
      const createOrUpdate = useMutation({
        mutationFn: (data: TFormData) => {
          if (selectedId === CREATE_INDICATOR) {
            return action.create(data)
          }
          return action.update(data, selected!)
        },
        onSuccess: () => {
          invalidate()
          setSelectedId(null)
        },
      })
      const deletion = useMutation({ mutationFn: action.delete, onSuccess: () => invalidate() })
      const [selectedId, _setSelectedId] = useState<string | null>(null)
      const setSelectedId = (id: string | null) => {
        _setSelectedId(id)
        createOrUpdate.reset()
      }
      const dataSource = list.data && listToDataSource(list.data)
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
          refresh={invalidate}
          update={(record) => setSelectedId(String(getId(record)))}
          del={(record) =>
            toast.promise(deletion.mutateAsync(record), {
              loading: `Deleting ${name} (${selectedId})...`,
              success: `${name} (${selectedId}) deleted`,
              error: `Failed to delete ${name} (${selectedId})`,
            })
          }
        />
      )

      const formComponent = (() => {
        if (isFormMode && selectedId !== CREATE_INDICATOR && !selected) {
          return (
            <div>
              <div>
                ID <i>{String(selectedId)}</i>does not exist
              </div>

              <button onClick={() => setSelectedId(null)}>Go to List</button>
            </div>
          )
        }
        return (
          <FormComponent
            loading={selectedItem.isLoading}
            mode={selectedId === CREATE_INDICATOR ? 'create' : 'update'}
            initialValue={selectedItem.data ?? initialValue}
            onSave={(data) => {
              toast.promise(createOrUpdate.mutateAsync(data), {
                loading: `Saving ${name} (${selectedId})...`,
                success: `${name} (${selectedId}) saved`,
                error: `Failed to save ${name} (${selectedId})`,
              })
            }}
          />
        )
      })()

      return (
        <>
          {listComponent}
          <Sheet open={isFormMode} onOpenChange={(flag) => !flag && setSelectedId(null)}>
            <SheetContent>
              <SheetHeader className="mb-4">
                <SheetTitle>
                  {selectedId === CREATE_INDICATOR ? 'Create' : 'Edit'} {name}
                </SheetTitle>
                <SheetDescription>
                  {name} ID : {selectedId}
                </SheetDescription>
              </SheetHeader>

              {createOrUpdate.error && <AlertDestructive error={createOrUpdate.error} />}

              {formComponent}
            </SheetContent>
          </Sheet>
        </>
      )
    }

    return AutoCrud
  }

function AlertDestructive(props: { error: unknown }) {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{props.error instanceof Error ? props.error.message : JSON.stringify(props.error)}</AlertDescription>
    </Alert>
  )
}
