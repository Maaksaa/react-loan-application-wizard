import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useApplicationStore } from '@/store/applicationStore'
import { formatPhone } from './phoneMask'
import { buildPersonalSchema, type PersonalInput } from './schemas'

export function PersonalForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const savedPersonal = useApplicationStore((s) => s.personal)
  const setPersonal = useApplicationStore((s) => s.setPersonal)
  const schema = useMemo(() => buildPersonalSchema(t), [t])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: savedPersonal.phone ?? '',
      firstName: savedPersonal.firstName ?? '',
      lastName: savedPersonal.lastName ?? '',
      gender: savedPersonal.gender,
    },
    mode: 'onTouched',
  })

  const onSubmit = (data: PersonalInput) => {
    setPersonal(data)
    navigate('/address')
  }

  const genderOptions = [
    { value: 'male', label: t('personal.male') },
    { value: 'female', label: t('personal.female') },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label={t('personal.phone')}
            type="tel"
            inputMode="numeric"
            placeholder="0XXX XXX XXX"
            autoComplete="tel"
            onChange={(e) => field.onChange(formatPhone(e.target.value))}
            error={fieldState.error?.message}
          />
        )}
      />

      <Input
        label={t('personal.firstName')}
        autoComplete="given-name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />

      <Input
        label={t('personal.lastName')}
        autoComplete="family-name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />

      <Select
        label={t('personal.gender')}
        placeholder={t('personal.genderPlaceholder')}
        options={genderOptions}
        {...register('gender')}
        error={errors.gender?.message}
      />

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {t('actions.next')}
      </Button>
    </form>
  )
}
