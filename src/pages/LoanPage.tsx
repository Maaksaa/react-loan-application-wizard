import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { StepLayout } from '@/components/StepLayout'
import { LoanForm } from '@/features/application-form/LoanForm'
import { StepGuard } from '@/features/application-form/StepGuard'
import { useApplicationStore } from '@/store/applicationStore'

export default function LoanPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)

  const { personal, loan, reset } = useApplicationStore()

  const handleClose = () => {
    setModalOpen(false)
    reset()
    navigate('/personal')
  }

  return (
    <StepGuard requires="loan">
      <StepLayout step={3} title={t('loan.title')} subtitle={t('loan.subtitle')}>
        <LoanForm onSuccess={() => setModalOpen(true)} />

        <Modal
          open={modalOpen}
          title={t('modal.approvedTitle')}
          onClose={handleClose}
          closeLabel={t('modal.startOver')}
        >
          {t('modal.approvedBody', {
            lastName: personal.lastName,
            firstName: personal.firstName,
            amount: loan.amount,
            term: loan.term,
          })}
        </Modal>
      </StepLayout>
    </StepGuard>
  )
}
