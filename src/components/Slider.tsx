import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  /** Pre-formatted current value to display next to the label, e.g. "$500" or "21 days". */
  displayValue: string
  error?: string
}

/**
 * Wrapper around native range input.
 *
 * Decision: using <input type="range"> rather than a custom slider
 * (e.g. radix-ui or rc-slider) — native gives us keyboard accessibility,
 * touch support and screen reader behavior for free, which matters for
 * a financial form. Visual polish is intentionally minimal.
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, displayValue, error, id, className, ...props }, ref) => {
    const sliderId = id ?? props.name
    const errorId = error ? `${sliderId}-error` : undefined

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <label htmlFor={sliderId} className="text-sm font-medium text-slate-700">
            {label}
          </label>
          <span className="text-base font-semibold text-slate-900 tabular-nums">
            {displayValue}
          </span>
        </div>
        <input
          id={sliderId}
          ref={ref}
          type="range"
          aria-invalid={!!error}
          aria-describedby={errorId}
          className={cn(
            'h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200',
            'accent-slate-900',
            className,
          )}
          {...props}
        />
        <div className="flex justify-between text-xs text-slate-500 tabular-nums">
          <span>{props.min}</span>
          <span>{props.max}</span>
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  },
)

Slider.displayName = 'Slider'
