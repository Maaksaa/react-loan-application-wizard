import { StepLayout } from '@/components/StepLayout'
import { PersonalForm } from '@/features/application-form/PersonalForm'

export default function PersonalDataPage() {
  return (
    <StepLayout step={1} title="Personal data" subtitle="Tell us a bit about yourself">
      <PersonalForm />
    </StepLayout>
  )
}
