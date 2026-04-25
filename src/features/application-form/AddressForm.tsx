import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useApplicationStore } from '@/store/applicationStore'
import { buildAddressSchema, type AddressInput } from './schemas'
import { useCategories } from './useCategories'

export function AddressForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const savedAddress = useApplicationStore((s) => s.addressInfo)
  const setAddress = useApplicationStore((s) => s.setAddress)
  const schema = useMemo(() => buildAddressSchema(t), [t])

  const { data: categories, isLoading, isError, refetch } = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressInput>({
    resolver: zodResolver(schema),
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

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-500">
        {t('address.loading')}
      </div>
    )
  }

  if (isError || !categories) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-sm">
        <p className="text-red-600">{t('address.loadError')}</p>
        <Button variant="secondary" onClick={() => refetch()}>
          {t('actions.retry')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Select
        label={t('address.workplace')}
        placeholder={t('address.workplacePlaceholder')}
        options={categories}
        {...register('workplace')}
        error={errors.workplace?.message}
      />

      <Input
        label={t('address.residence')}
        autoComplete="street-address"
        {...register('address')}
        error={errors.address?.message}
      />

      <div className="mt-2 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={() => navigate('/personal')}>
          {t('actions.back')}
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {t('actions.next')}
        </Button>
      </div>
    </form>
  )
}
