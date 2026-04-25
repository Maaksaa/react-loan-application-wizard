import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Slider } from '@/components/Slider'
import { useApplicationStore } from '@/store/applicationStore'
import { buildLoanSchema, type LoanInput } from './schemas'
import { useSubmitApplication } from './useSubmitApplication'

interface LoanFormProps {
  onSuccess: () => void
}

export function LoanForm({ onSuccess }: LoanFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const personal = useApplicationStore((s) => s.personal)
  const savedLoan = useApplicationStore((s) => s.loan)
  const setLoan = useApplicationStore((s) => s.setLoan)
  const schema = useMemo(() => buildLoanSchema(t), [t])

  const submitMutation = useSubmitApplication()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: savedLoan.amount ?? 500,
      term: savedLoan.term ?? 20,
    },
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoanInput) => {
    setLoan(data)
    try {
      await submitMutation.mutateAsync({
        title: `${personal.firstName} ${personal.lastName}`,
      })
      onSuccess()
    } catch {
      // error state is rendered below
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <Slider
            label={t('loan.amount')}
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
            label={t('loan.term')}
            displayValue={t('loan.days', { count: field.value })}
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
          {t('loan.submitError')}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => navigate('/address')}
          disabled={submitMutation.isPending}
        >
          {t('actions.back')}
        </Button>
        <Button type="submit" className="flex-1" disabled={submitMutation.isPending}>
          {submitMutation.isPending ? t('actions.submitting') : t('actions.submit')}
        </Button>
      </div>
    </form>
  )
}
