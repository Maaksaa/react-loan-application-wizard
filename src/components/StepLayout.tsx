import { useEffect, useRef, type ReactNode } from 'react'
import { StepIndicator } from './StepIndicator'

interface StepLayoutProps {
  step: 1 | 2 | 3
  title: string
  subtitle?: string
  children: ReactNode
}

export function StepLayout({ step, title, subtitle, children }: StepLayoutProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Move focus to the step heading when the step changes — better keyboard
  // and screen reader experience than letting focus stay on the previous Next button.
  useEffect(() => {
    headingRef.current?.focus()
  }, [step])

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 sm:p-8">
          <StepIndicator current={step} />
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-semibold text-slate-900 outline-none"
          >
            {title}
          </h1>
          {subtitle && <p className="mt-1 mb-6 text-sm text-slate-500">{subtitle}</p>}
          {!subtitle && <div className="mb-6" />}
          {children}
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">
          Wiam Group · Test loan application
        </p>
      </div>
    </div>
  )
}
