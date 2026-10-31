import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { gallery } from '../assets/images'
import { Container, Page, PageHero } from '../components/layout/Page'
import { Glass } from '../components/ui/Glass'
import { GlassButton } from '../components/ui/GlassButton'
import { site } from '../config/site'
import { cx } from '../lib/format'
import { tapHaptic } from '../lib/native'

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (delta: number) => {
      setActive((current) => (current === null ? current : (current + delta + gallery.length) % gallery.length))
      tapHaptic()
    },
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [active, close, step])

  const photo = active === null ? null : gallery[active]

  return (
    <Page title="Gallery">
      <PageHero eyebrow="Gallery" title="For mouth wey sabi taste." lede="Shot on the streets, plated with pride. Tap any photo to see it big.">
        <div className="mt-6">
          <GlassButton href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
            More on Instagram · @{site.instagram}
          </GlassButton>
        </div>
      </PageHero>

      <Container className="mt-12 pb-16">
        <div className="columns-2 gap-4 md:columns-3 [column-fill:_balance]">
          {gallery.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => {
                setActive(index)
                tapHaptic()
              }}
              className="press glass group mb-4 block w-full break-inside-avoid overflow-hidden rounded-[1.75rem] p-1.5 text-left"
              aria-label={`Open photo: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className={cx(
                  'w-full rounded-[1.4rem] object-cover transition-transform duration-700 group-hover:scale-[1.03]',
                  item.tall ? 'aspect-[4/5]' : 'aspect-[4/3]',
                )}
              />
            </button>
          ))}
        </div>
      </Container>

      {photo &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-8" role="dialog" aria-modal="true" aria-label={photo.alt}>
            <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 bg-cocoa/70 backdrop-blur-md" />
            <Glass tone="strong" className="animate-pop relative max-h-full w-full max-w-4xl overflow-hidden rounded-[2rem] p-2">
              <img src={photo.src} alt={photo.alt} className="max-h-[80dvh] w-full rounded-[1.6rem] object-contain" />
              <p className="px-3 pb-2 pt-3 text-center text-sm text-cream/85">{photo.alt}</p>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="press absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/40 bg-cocoa/40 text-cream backdrop-blur-xl hover:bg-cocoa/60"
              >
                <X className="size-5" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="press absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-cocoa/40 text-cream backdrop-blur-xl hover:bg-cocoa/60"
              >
                <ChevronLeft className="size-6" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="press absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-cocoa/40 text-cream backdrop-blur-xl hover:bg-cocoa/60"
              >
                <ChevronRight className="size-6" strokeWidth={2.5} />
              </button>
            </Glass>
          </div>,
          document.body,
        )}
    </Page>
  )
}
