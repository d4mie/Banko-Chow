import { X } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../../lib/format'

interface SheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

/**
 * Bottom sheet on phones, centred dialog on larger screens.
 * Frosted light glass so content stays legible over the orange backdrop and photos.
 */
export function Sheet({ open, onClose, title, children, className }: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-cocoa/45 backdrop-blur-sm transition-opacity"
      />
      <div
        className={cx(
          'glass-light animate-rise relative w-full max-w-lg overflow-hidden rounded-t-[2rem] sm:rounded-[2rem]',
          'max-h-[92dvh] overflow-y-auto scrollbar-none',
          className,
        )}
        style={{ paddingBottom: 'max(var(--sab), 0px)' }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 pt-4 sm:px-6">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-cocoa/15 sm:hidden" aria-hidden="true" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="press absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/70 bg-white/70 text-cocoa shadow-glass-sm backdrop-blur-md hover:bg-white"
          >
            <X className="size-5" strokeWidth={2.5} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
