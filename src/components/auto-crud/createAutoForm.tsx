import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { ZodObjectOrWrapped } from '../ui/auto-form/utils'
import { FieldConfig } from '../ui/auto-form/types'
import { Crud, CrudFormComponent } from './type'
import { TypeOf } from 'zod'

interface Props<TSchema extends ZodObjectOrWrapped> {
  schema: TSchema
  fieldConfig?: FieldConfig<TSchema>
}

export const createAutoForm = <TSchema extends ZodObjectOrWrapped, T extends Crud & { data: TypeOf<TSchema> }>({
  schema,
  fieldConfig,
}: Props<TSchema>) => {
  const AutoFormInstance: CrudFormComponent<T> = (props) => {
    return (
      <AutoForm formSchema={schema} fieldConfig={fieldConfig} values={props.initialValue} onSubmit={props.onSave}>
        <AutoFormSubmit>Send now</AutoFormSubmit>
      </AutoForm>
    )
  }
  return AutoFormInstance
}
