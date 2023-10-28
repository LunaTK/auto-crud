import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { ZodObjectOrWrapped } from '../ui/auto-form/utils'
import { FieldConfig } from '../ui/auto-form/types'
import { Crud, CrudFormComponent } from './type'
import { TypeOf } from 'zod'
import { Skeleton } from '../ui/skeleton'

interface Props<TSchema extends ZodObjectOrWrapped> {
  schema: TSchema
  fieldConfig?: FieldConfig<TSchema>
}

export const createAutoForm = <TSchema extends ZodObjectOrWrapped, T extends Crud & { data: TypeOf<TSchema> }>({
  schema,
  fieldConfig,
}: Props<TSchema>) => {
  const AutoFormInstance: CrudFormComponent<T> = (props) => {
    if (props.loading) return <FormSkeleton />
    return (
      <AutoForm formSchema={schema} fieldConfig={fieldConfig} values={props.initialValue} onSubmit={props.onSave}>
        <AutoFormSubmit>{props.mode.toUpperCase()}</AutoFormSubmit>
      </AutoForm>
    )
  }
  return AutoFormInstance
}

const FormSkeleton = () => {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="w-1/4 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-full h-10 mt-2 bg-gray-200 rounded" />
      </div>
      <div>
        <Skeleton className="w-1/4 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-full h-10 mt-2 bg-gray-200 rounded" />
      </div>
      <div>
        <Skeleton className="w-1/4 h-4 bg-gray-200 rounded" />
        <Skeleton className="w-full h-10 mt-2 bg-gray-200 rounded" />
      </div>
    </div>
  )
}
