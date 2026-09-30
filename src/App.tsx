import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { StoreProvider, useStore } from './context/Store'
import { AdvanceProvider } from './advance/store'
import { PaywallPage } from './pages/Paywall'
import { OnboardingPage } from './pages/Onboarding'
import { DashboardPage } from './pages/Dashboard'
import { PaymentLinksPage } from './pages/PaymentLinks'
import { CreateLinkPage } from './pages/CreateLink'
import { LinkDetailPage } from './pages/LinkDetail'
import { ProposalPage } from './pages/advance/ProposalPage'
import { WhatsAppPage } from './pages/advance/WhatsAppPage'
import { EmailPage } from './pages/advance/EmailPage'
import { CheckoutPage } from './pages/advance/CheckoutPage'
import type { ReactNode } from 'react'

function Guard({ children }: { children: ReactNode }) {
  const { onboarded } = useStore()
  if (!onboarded) return <Navigate to="/credenciamento" replace />
  return children
}

function AdvanceLayout() {
  return (
    <AdvanceProvider>
      <Outlet />
    </AdvanceProvider>
  )
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
          <Route element={<AdvanceLayout />}>
            <Route path="/proposta" element={<ProposalPage />} />
            <Route path="/whatsapp" element={<WhatsAppPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
