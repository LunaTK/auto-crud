import './App.css'
import AutoForm, { AutoFormSubmit } from './components/ui/auto-form'
import { Card, CardContent } from './components/ui/card'
import { User, userSchema } from './schema'

interface Props {
  values?: Partial<User>
  onSubmit?: (values: User) => void
}

export function UserForm({ values, onSubmit }: Props) {
  return (
    <Card className="max-w-lg mx-auto my-8">
      <CardContent>
        <AutoForm
          className="container"
          onSubmit={onSubmit}
          values={values}
          formSchema={userSchema}
          fieldConfig={{
            password: {
              inputProps: {
                type: 'password',
                placeholder: '••••••••',
              },
            },
          }}
        >
          <AutoFormSubmit>Send now</AutoFormSubmit>
          <p className="text-sm text-gray-500">
            By submitting this form, you agree to our{' '}
            <a href="#" className="underline text-primary">
              terms and conditions
            </a>
            .
          </p>
        </AutoForm>
      </CardContent>
    </Card>
  )
}
