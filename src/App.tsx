import './App.css'
import AutoForm, { AutoFormSubmit } from './components/ui/auto-form'
import { Card, CardContent } from './components/ui/card'
import { formSchema } from './schema'

function App() {
  return (
    <Card className="max-w-lg mx-auto my-8">
      <CardContent>
        <AutoForm
          className="container"
          formSchema={formSchema}
          fieldConfig={{
            password: {
              inputProps: {
                type: 'password',
                placeholder: '••••••••',
              },
            },
            favouriteNumber: {
              description: 'Your favourite number between 1 and 10.',
            },
            acceptTerms: {
              inputProps: {
                required: true,
              },
              description: (
                <>
                  I agree to the{' '}
                  <a
                    href="#"
                    className="text-primary underline"
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Terms and conditions clicked.')
                    }}
                  >
                    terms and conditions
                  </a>
                  .
                </>
              ),
            },

            birthday: {
              description: 'We need your birthday to send you a gift.',
            },

            sendMeMails: {
              fieldType: 'switch',
            },
          }}
        >
          <AutoFormSubmit>Send now</AutoFormSubmit>
          <p className="text-gray-500 text-sm">
            By submitting this form, you agree to our{' '}
            <a href="#" className="text-primary underline">
              terms and conditions
            </a>
            .
          </p>
        </AutoForm>
      </CardContent>
    </Card>
  )
}

export default App
