import { Navigate } from 'react-router-dom'
import { useApplicationStore } from '@/store/applicationStore'
import type { ReactNode } from 'react'

interface StepGuardProps {
  /** Which step is being rendered. Guard checks that all prior steps are complete. */
  requires: 'address' | 'loan'
  children: ReactNode
}

/**
 * Prevents deep-linking into steps 2 or 3 without completing previous ones.
 * Without this, a user landing on /loan directly would submit
 * "undefined undefined" as the product title.
 */
export function StepGuard({ requires, children }: StepGuardProps) {
  const { personal, addressInfo } = useApplicationStore()

  const personalComplete = Boolean(
    personal.phone && personal.firstName && personal.lastName && personal.gender,
  )
  const addressComplete = Boolean(addressInfo.workplace && addressInfo.address)

  if (requires === 'address' && !personalComplete) {
    return <Navigate to="/personal" replace />
  }

  if (requires === 'loan' && (!personalComplete || !addressComplete)) {
    return <Navigate to={personalComplete ? '/address' : '/personal'} replace />
  }

  return <>{children}</>
}
