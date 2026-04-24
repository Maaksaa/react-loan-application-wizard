import { PersonalForm } from '@/features/application-form/PersonalForm'

export default function PersonalDataPage() {
  return (
    <div className="mx-auto w-full max-w-md p-6">
      <p className="mb-2 text-sm text-slate-500">Step 1 of 3</p>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Personal data</h1>
      <PersonalForm />
    </div>
  )
}
