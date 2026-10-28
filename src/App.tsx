import { BrowserRouter, Route, Routes } from 'react-router'
import { AppShell } from './components/layout/AppShell'
import { FindUs } from './pages/FindUs'
import { Gallery } from './pages/Gallery'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { NotFound } from './pages/NotFound'
import { Order } from './pages/Order'
import { Story } from './pages/Story'
import { CartProvider } from './store/CartProvider'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <CartProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="order" element={<Order />} />
            <Route path="story" element={<Story />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="find-us" element={<FindUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
