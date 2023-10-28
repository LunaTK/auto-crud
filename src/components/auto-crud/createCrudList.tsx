import { Crud, CrudListComponent } from './type'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil1Icon, TrashIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DataTable } from '../ui/data-table'

export const createCrudList = <T extends Crud>({ columns }: { columns: () => ColumnDef<T['listItem']>[] }) => {
  const CrudListTable: CrudListComponent<T> = ({ dataSource, update, del, create }) => {
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
                  <Button onClick={() => update(row)} variant="ghost" size="icon">
                    <Pencil1Icon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" onClick={() => del(row)} size="icon">
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
