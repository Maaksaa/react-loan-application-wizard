import { useNavigate } from 'react-router-dom'
import { StepGuard } from '@/features/application-form/StepGuard'

export default function LoanPage() {
  const navigate = useNavigate()

  return (
    <StepGuard requires="loan">
      <div className="mx-auto w-full max-w-md p-6">
        <p className="mb-2 text-sm text-slate-500">Step 3 of 3</p>
        <h1 className="mb-6 text-2xl font-semibold">Loan parameters</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/address')}
            className="flex-1 rounded-md border border-slate-300 py-2"
          >
            Back
          </button>
          <button type="button" className="flex-1 rounded-md bg-slate-900 py-2 text-white">
            Submit
          </button>
        </div>
      </div>
    </StepGuard>
  )
}
