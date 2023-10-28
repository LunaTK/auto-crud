import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { Card, CardContent } from '@/components/ui/card'
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
      <Card className="max-w-lg mx-auto my-8">
        <CardContent>
          <AutoForm
            formSchema={schema}
            fieldConfig={fieldConfig}
            className="container"
            values={props.initialValue}
            onSubmit={(newValue) => {
              props.onSave(newValue)
              props.onClose()
            }}
          >
            <AutoFormSubmit>Send now</AutoFormSubmit>
          </AutoForm>
        </CardContent>
      </Card>
    )
  }
  return AutoFormInstance
}
