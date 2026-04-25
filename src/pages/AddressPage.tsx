import { AddressForm } from '@/features/application-form/AddressForm'
import { StepGuard } from '@/features/application-form/StepGuard'

export default function AddressPage() {
  return (
    <StepGuard requires="address">
      <div className="mx-auto w-full max-w-md p-6">
        <p className="mb-2 text-sm text-slate-500">Step 2 of 3</p>
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Address & work</h1>
        <AddressForm />
      </div>
    </StepGuard>
  )
}
