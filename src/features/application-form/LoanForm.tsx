import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Slider } from '@/components/Slider'
import { useApplicationStore } from '@/store/applicationStore'
import { loanSchema, type LoanInput } from './schemas'
import { useSubmitApplication } from './useSubmitApplication'

interface LoanFormProps {
  /** Called after a successful submit — page opens the modal in response. */
  onSuccess: () => void
}

export function LoanForm({ onSuccess }: LoanFormProps) {
  const navigate = useNavigate()
  const personal = useApplicationStore((s) => s.personal)
  const savedLoan = useApplicationStore((s) => s.loan)
  const setLoan = useApplicationStore((s) => s.setLoan)

  const submitMutation = useSubmitApplication()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanInput>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      // Sensible defaults: middle of the allowed range.
      // Sliders without an initial value would be a UX trap — user wouldn't see the thumb.
      amount: savedLoan.amount ?? 500,
      term: savedLoan.term ?? 20,
    },
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoanInput) => {
    // Persist locally before the request so a network error doesn't lose the values.
    setLoan(data)

    try {
      await submitMutation.mutateAsync({
        title: `${personal.firstName} ${personal.lastName}`,
      })
      onSuccess()
    } catch {
      // Mutation state already exposes the error in the UI below.
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Slider
            label="Loan amount"
            displayValue={`$${field.value}`}
            min={200}
            max={1000}
            step={100}
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={errors.amount?.message}
          />
        )}
      />

      <Controller
        name="term"
        control={control}
        render={({ field }) => (
          <Slider
            label="Loan term"
            displayValue={`${field.value} days`}
            min={10}
            max={30}
            step={1}
            value={field.value}
            onChange={(e) => field.onChange(Number(e.target.value))}
            error={errors.term?.message}
          />
        )}
      />

      {submitMutation.isError && (
        <p role="alert" className="text-sm text-red-600">
          Submission failed. Please try again.
        </p>
      )}

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate('/address')}
          disabled={submitMutation.isPending}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={submitMutation.isPending}>
          {submitMutation.isPending ? 'Submitting…' : 'Submit application'}
        </Button>
      </div>
    </form>
  )
}
