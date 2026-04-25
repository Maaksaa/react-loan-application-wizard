import { useTranslation } from 'react-i18next'
import { StepLayout } from '@/components/StepLayout'
import { PersonalForm } from '@/features/application-form/PersonalForm'

export default function PersonalDataPage() {
  const { t } = useTranslation()
  return (
    <StepLayout step={1} title={t('personal.title')} subtitle={t('personal.subtitle')}>
      <PersonalForm />
    </StepLayout>
  )
}
