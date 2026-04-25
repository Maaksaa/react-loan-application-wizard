import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/Modal'
import { StepLayout } from '@/components/StepLayout'
import { LoanForm } from '@/features/application-form/LoanForm'
import { StepGuard } from '@/features/application-form/StepGuard'
import { useApplicationStore } from '@/store/applicationStore'

export default function LoanPage() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  const { personal, loan, reset } = useApplicationStore()

  const handleClose = () => {
    setModalOpen(false)
    reset()
    navigate('/personal')
  }

  return (
    <StepGuard requires="loan">
      <StepLayout
        step={3}
        title="Loan parameters"
        subtitle="Choose the amount and term that suit you"
      >
        <LoanForm onSuccess={() => setModalOpen(true)} />

        <Modal
          open={modalOpen}
          title="Application approved"
          onClose={handleClose}
          closeLabel="Start over"
        >
          {/*
            Per task: "Поздравляем, <Фамилия> <Имя>. Вам одобрена <сумма> на <срок> дней."
            Note the order in the spec is LastName FirstName, not the other way round.
          */}
          Congratulations, {personal.lastName} {personal.firstName}. You are approved for{' '}
          <span className="font-semibold">${loan.amount}</span> for{' '}
          <span className="font-semibold">{loan.term} days</span>.
        </Modal>
      </StepLayout>
    </StepGuard>
  )
}
