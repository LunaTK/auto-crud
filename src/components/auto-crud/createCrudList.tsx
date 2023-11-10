import { CrudListComponent } from './type'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil1Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '../ui/data-table'

export const createCrudList = <TFormData, TList, TListItem, THooks>({ columns }: { columns: () => ColumnDef<TListItem>[] }) => {
  const CrudListTable: CrudListComponent<TFormData, TList, TListItem, THooks> = ({ dataSource, update, del, create }) => {
    return (
      <DataTable
        toolbar={
          <Button onClick={create}>
            <PlusIcon className="w-4 h-4 mr-2" /> New
          </Button>
        }
        columns={[
          ...columns(),
          {
            id: 'actions',
            enableHiding: false,
            maxSize: 40,
            header: () => 'Action',
            cell: ({ row }) => {
              return (
                <>
                  <Button onClick={() => update(row.original)} variant="ghost" size="icon">
                    <Pencil1Icon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => del(row.original)} size="icon">
                    <TrashIcon className="w-4 h-4 text-destructive" />
                  </Button>
                </>
              )
            },
          },
        ]}
        dataSource={dataSource}
      />
    )
  }

  return CrudListTable
}
