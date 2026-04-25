import { cn } from '@/lib/cn'

interface StepIndicatorProps {
  current: 1 | 2 | 3
}

const steps = [
  { num: 1, label: 'Personal' },
  { num: 2, label: 'Address' },
  { num: 3, label: 'Loan' },
] as const

export function StepIndicator({ current }: StepIndicatorProps) {
  return (
    <nav aria-label="Form progress" className="mb-8">
      <ol className="flex items-center gap-2">
        {steps.map((step, idx) => {
          const isDone = step.num < current
          const isActive = step.num === current

          return (
            <li key={step.num} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition',
                  isActive && 'bg-slate-900 text-white',
                  isDone && 'bg-emerald-600 text-white',
                  !isActive && !isDone && 'bg-slate-200 text-slate-500',
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? '✓' : step.num}
              </div>
              <span
                className={cn(
                  'hidden text-xs font-medium sm:inline',
                  isActive ? 'text-slate-900' : 'text-slate-500',
                )}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    'h-px flex-1 transition',
                    isDone ? 'bg-emerald-600' : 'bg-slate-200',
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
