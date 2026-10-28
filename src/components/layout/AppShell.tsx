import { BookOpenText, Home, MapPin, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router'
import pattern from '../../assets/brand/pattern.webp'
import { cx } from '../../lib/format'
import { registerBackButton, tapHaptic } from '../../lib/native'
import { useCart } from '../../store/cart'
import { BrandLogo } from '../BrandLogo'
import { Footer } from './Footer'

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/order', label: 'Order', icon: ShoppingBag },
  { to: '/story', label: 'Story', icon: BookOpenText },
  { to: '/find-us', label: 'Find us', icon: MapPin },
]

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const { count } = useCart()
  const historyDepth = useRef(0)

  useLayoutEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    historyDepth.current = window.history.length
    return registerBackButton(
      () => location.pathname !== '/',
      () => navigate(-1),
    )
  }, [location.pathname, navigate])

  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{ ['--brand-pattern' as string]: `url(${pattern})` }}
    >
      <div className="brand-backdrop" aria-hidden="true" />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 pt-safe px-safe">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pt-3 sm:px-6 lg:pt-5">
          <NavLink
            to="/"
            className="pointer-events-auto press glass flex h-12 items-center rounded-full px-4 sm:h-14 sm:px-5"
            aria-label="Banko Chow home"
          >
            <BrandLogo className="h-7 sm:h-8" />
          </NavLink>

          <nav className="pointer-events-auto glass hidden h-14 items-center gap-1 rounded-full p-1.5 md:flex" aria-label="Primary">
            {navItems
              .filter((item) => item.to !== '/' && item.to !== '/order')
              .map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cx(
                      'press rounded-full px-4 py-2 font-display text-[15px] font-semibold tracking-wide transition-colors',
                      isActive ? 'bg-cream text-brand-dark shadow-float' : 'text-cream hover:bg-white/15',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                cx(
                  'press rounded-full px-4 py-2 font-display text-[15px] font-semibold tracking-wide transition-colors',
                  isActive ? 'bg-cream text-brand-dark shadow-float' : 'text-cream hover:bg-white/15',
                )
              }
            >
              Gallery
            </NavLink>
          </nav>

          <NavLink
            to="/order"
            onClick={tapHaptic}
            className={({ isActive }) =>
              cx(
                'pointer-events-auto press relative hidden h-14 items-center gap-2 rounded-full border px-5 font-display text-[15px] font-bold tracking-wide shadow-float md:flex',
                isActive
                  ? 'border-white bg-white text-brand-dark'
                  : 'border-white/70 bg-cream text-brand-dark hover:bg-white',
              )
            }
          >
            <ShoppingBag className="size-5" strokeWidth={2.4} />
            Order
            {count > 0 && (
              <span className="animate-pop grid min-w-6 place-items-center rounded-full bg-brand px-1.5 text-xs font-bold text-cream">
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </header>

      <main className="flex-1 pb-tabbar md:pb-0">
        <Outlet />
      </main>

      <Footer />

      <nav
        className="fixed inset-x-0 bottom-0 z-40 px-3 pb-safe md:hidden"
        aria-label="Primary"
        style={{ paddingBottom: 'max(var(--sab), 0.75rem)' }}
      >
        <div className="glass-strong mx-auto flex h-[var(--tabbar-h)] max-w-md items-stretch justify-between rounded-[2rem] p-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isOrder = item.to === '/order'
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={tapHaptic}
                className={({ isActive }) =>
                  cx(
                    'press relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[1.5rem] font-display text-[11px] font-semibold tracking-wide transition-colors',
                    isActive ? 'bg-cream text-brand-dark shadow-float' : 'text-cream/90 hover:bg-white/10',
                  )
                }
              >
                <Icon className="size-5" strokeWidth={2.4} />
                <span>{item.label}</span>
                {isOrder && count > 0 && (
                  <span className="animate-pop absolute right-1.5 top-1.5 grid min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-cream ring-2 ring-white/70">
                    {count}
                  </span>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
