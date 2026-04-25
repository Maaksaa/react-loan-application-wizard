import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useApplicationStore } from '@/store/applicationStore'
import { addressSchema, type AddressInput } from './schemas'
import { useCategories } from './useCategories'

export function AddressForm() {
  const navigate = useNavigate()
  const savedAddress = useApplicationStore((s) => s.addressInfo)
  const setAddress = useApplicationStore((s) => s.setAddress)

  const { data: categories, isLoading, isError, refetch } = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      workplace: savedAddress.workplace ?? '',
      address: savedAddress.address ?? '',
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: AddressInput) => {
    setAddress(data)
    navigate('/loan')
  }

  // Render states for the categories fetch — we don't block the whole form,
  // only the dependent field.
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-500">
        Loading workplaces…
      </div>
    )
  }

  if (isError || !categories) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-sm">
        <p className="text-red-600">Failed to load workplaces.</p>
        <Button variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Select
        label="Workplace"
        placeholder="Select workplace"
        options={categories}
        {...register('workplace')}
        error={errors.workplace?.message}
      />

      <Input
        label="Residential address"
        autoComplete="street-address"
        {...register('address')}
        error={errors.address?.message}
      />

      <div className="mt-2 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={() => navigate('/personal')}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          Next
        </Button>
      </div>
    </form>
  )
}
