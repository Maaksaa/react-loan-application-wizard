import { useTranslation } from 'react-i18next'
import { StepLayout } from '@/components/StepLayout'
import { AddressForm } from '@/features/application-form/AddressForm'
import { StepGuard } from '@/features/application-form/StepGuard'

export default function AddressPage() {
  const { t } = useTranslation()
  return (
    <StepGuard requires="address">
      <StepLayout step={2} title={t('address.title')} subtitle={t('address.subtitle')}>
        <AddressForm />
      </StepLayout>
    </StepGuard>
  )
}
