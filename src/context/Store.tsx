import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import {
  INITIAL_LINKS,
  type LinkItem,
  type PaymentLink,
  type PersonType,
} from '../data/mock'

export type OnboardingData = {
  personType: PersonType
  tradeName: string
  legalName: string
  companyDescription: string
  document: string
  annualRevenue: string
  mcc: string
  corporateEmail: string
  phone: string
  zip: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  legalNamePerson: string
  email: string
  birthDate: string
  cpf: string
  personalPhone: string
  personalZip: string
  personalStreet: string
  personalNumber: string
  personalNeighborhood: string
  personalCity: string
  personalState: string
  holderName: string
  bank: string
  accountKind: string
  bankCode: string
  agency: string
  agencyDigit: string
  accountNumber: string
  accountDigit: string
  accountType: string
  holderDocument: string
  docFront: string
  docBack: string
  selfie: string
}

const emptyOnboarding: OnboardingData = {
  personType: '',
  tradeName: '',
  legalName: '',
  companyDescription: '',
  document: '',
  annualRevenue: '',
  mcc: '',
  corporateEmail: '',
  phone: '',
  zip: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: '',
  legalNamePerson: '',
  email: '',
  birthDate: '',
  cpf: '',
  personalPhone: '',
  personalZip: '',
  personalStreet: '',
  personalNumber: '',
  personalNeighborhood: '',
  personalCity: '',
  personalState: '',
  holderName: '',
  bank: '',
  accountKind: '',
  bankCode: '',
  agency: '',
  agencyDigit: '',
  accountNumber: '',
  accountDigit: '',
  accountType: '',
  holderDocument: '',
  docFront: '',
  docBack: '',
  selfie: '',
}

type Store = {
  onboarded: boolean
  setOnboarded: (value: boolean) => void
  onboarding: OnboardingData
  patchOnboarding: (patch: Partial<OnboardingData>) => void
  links: PaymentLink[]
  addLink: (link: PaymentLink) => void
  updateLink: (id: string, patch: Partial<PaymentLink>) => void
  removeLink: (id: string) => void
  toast: string | null
  notify: (message: string) => void
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [onboarded, setOnboarded] = useState(false)
  const [onboarding, setOnboarding] = useState<OnboardingData>(emptyOnboarding)
  const [links, setLinks] = useState<PaymentLink[]>(INITIAL_LINKS)
  const [toast, setToast] = useState<string | null>(null)

  const value = useMemo<Store>(
    () => ({
      onboarded,
      setOnboarded,
      onboarding,
      patchOnboarding: (patch) => setOnboarding((current) => ({ ...current, ...patch })),
      links,
      addLink: (link) => setLinks((current) => [link, ...current]),
      updateLink: (id, patch) =>
        setLinks((current) => current.map((link) => (link.id === id ? { ...link, ...patch } : link))),
      removeLink: (id) => setLinks((current) => current.filter((link) => link.id !== id)),
      toast,
      notify: (message) => {
        setToast(message)
        window.setTimeout(() => setToast(null), 2200)
      },
    }),
    [onboarded, onboarding, links, toast],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside StoreProvider')
  return store
}

export function newItem(): LinkItem {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    unitPrice: 0,
    quantity: 1,
  }
}
