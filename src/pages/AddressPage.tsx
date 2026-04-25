import { StepLayout } from '@/components/StepLayout'
import { AddressForm } from '@/features/application-form/AddressForm'
import { StepGuard } from '@/features/application-form/StepGuard'

export default function AddressPage() {
  return (
    <StepGuard requires="address">
      <StepLayout step={2} title="Address & work" subtitle="Where do you live and work">
        <AddressForm />
      </StepLayout>
    </StepGuard>
  )
}
