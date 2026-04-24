import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useApplicationStore } from '@/store/applicationStore'
import { formatPhone } from './phoneMask'
import { personalSchema, type PersonalInput } from './schemas'

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export function PersonalForm() {
  const navigate = useNavigate()
  const savedPersonal = useApplicationStore((s) => s.personal)
  const setPersonal = useApplicationStore((s) => s.setPersonal)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInput>({
    resolver: zodResolver(personalSchema),
    // Preserve data on "Back" navigation — the key requirement from the task
    defaultValues: {
      phone: savedPersonal.phone ?? '',
      firstName: savedPersonal.firstName ?? '',
      lastName: savedPersonal.lastName ?? '',
      gender: savedPersonal.gender,
    },
    // Validate only on submit + on change after first submit attempt.
    // Better UX than onChange-from-start (no red errors while user is still typing).
    mode: 'onTouched',
  })

  const onSubmit = (data: PersonalInput) => {
    setPersonal(data)
    navigate('/address')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
      {/*
        Phone is wrapped in Controller because we transform the value on change
        (masking). register() alone wouldn't let us intercept the input cleanly.
      */}
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            label="Phone"
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
        label="First name"
        autoComplete="given-name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />

      <Input
        label="Last name"
        autoComplete="family-name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />

      <Select
        label="Gender"
        placeholder="Select gender"
        options={genderOptions}
        {...register('gender')}
        error={errors.gender?.message}
      />

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        Next
      </Button>
    </form>
  )
}
