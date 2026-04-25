import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '@/components/Modal'
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
      <div className="mx-auto w-full max-w-md p-6">
        <p className="mb-2 text-sm text-slate-500">Step 3 of 3</p>
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">Loan parameters</h1>

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
      </div>
    </StepGuard>
  )
}
