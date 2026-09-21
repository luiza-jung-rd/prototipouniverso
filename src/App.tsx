import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './context/Store'
import { PaywallPage } from './pages/Paywall'
import { OnboardingPage } from './pages/Onboarding'
import { DashboardPage } from './pages/Dashboard'
import { PaymentLinksPage } from './pages/PaymentLinks'
import { CreateLinkPage } from './pages/CreateLink'
import { LinkDetailPage } from './pages/LinkDetail'
import type { ReactNode } from 'react'

function Guard({ children }: { children: ReactNode }) {
  const { onboarded } = useStore()
  if (!onboarded) return <Navigate to="/credenciamento" replace />
  return children
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

  return (
    <StoreProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<PaywallPage />} />
          <Route path="/credenciamento" element={<OnboardingPage />} />
          <Route
            path="/dashboard"
            element={
              <Guard>
                <DashboardPage />
              </Guard>
            }
          />
          <Route
            path="/links"
            element={
              <Guard>
                <PaymentLinksPage />
              </Guard>
            }
          />
          <Route
            path="/links/novo"
            element={
              <Guard>
                <CreateLinkPage />
              </Guard>
            }
          />
          <Route
            path="/links/:id"
            element={
              <Guard>
                <LinkDetailPage />
              </Guard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
