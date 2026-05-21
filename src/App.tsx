import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigation } from './components/Navigation'
import { HomePage } from './components/HomePage'
import { CategoriesPage } from './pages/CategoriesPage'
import { DealsPage } from './pages/DealsPage'
import { SearchPage } from './pages/SearchPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { AuthPage } from './pages/AuthPage'
import { OrderHistoryPage } from './pages/OrderHistoryPage'
import { WishlistPage } from './pages/WishlistPage'
import { DashboardPage } from './pages/DashboardPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FAQPage } from './pages/FAQPage'
import { HelpCenterPage } from './pages/HelpCenterPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { CookiePolicy } from './pages/CookiePolicy'
import { ReturnsSupportPage } from './pages/ReturnsSupportPage'
import { ShippingInfoPage } from './pages/ShippingInfoPage'
import { WarrantyPage } from './pages/WarrantyPage'
import { TrackOrderPage } from './pages/TrackOrderPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import './App.css'

// Create a client for React Query
const queryClient = new QueryClient()

function App() {
  const [cartCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navigation cartCount={cartCount} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/returns" element={<ReturnsSupportPage />} />
              <Route path="/shipping" element={<ShippingInfoPage />} />
              <Route path="/warranty" element={<WarrantyPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
