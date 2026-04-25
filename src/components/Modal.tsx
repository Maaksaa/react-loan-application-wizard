import { useEffect, type ReactNode } from 'react'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  closeLabel?: string
}

/**
 * Minimal modal: backdrop + centred panel.
 * Locks body scroll while open and closes on Escape.
 *
 * Not using <dialog> element because we want full control over the
 * styling and animations — and the task only needs one one-shot modal,
 * so behavior is predictable.
 */
export function Modal({ open, title, children, onClose, closeLabel = 'Close' }: ModalProps) {
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="mb-3 text-lg font-semibold text-slate-900">
          {title}
        </h2>
        <div className="mb-5 text-sm text-slate-700">{children}</div>
        <Button onClick={onClose} className="w-full">
          {closeLabel}
        </Button>
      </div>
    </div>
  )
}
