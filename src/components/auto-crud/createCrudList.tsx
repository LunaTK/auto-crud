import { Crud, CrudListComponent } from './type'
import { ColumnDef } from '@tanstack/react-table'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DataTable } from '../ui/data-table'

export const createCrudList = <T extends Crud>({ columns }: { columns: () => ColumnDef<T['listItem']>[] }) => {
  const CrudListTable: CrudListComponent<T> = ({ dataSource, update, del, create }) => {
    return (
      <DataTable
        toolbar={<Button onClick={create}>New</Button>}
        columns={[
          ...columns(),
          {
            id: 'actions',
            enableHiding: false,
            maxSize: 40,
            header: () => 'Action',
            cell: ({ row }) => {
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => update(row)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => confirm('Sure to delete?') && del(row)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
