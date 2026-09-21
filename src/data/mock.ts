export type PersonType = 'pj' | 'pf' | ''

export type LinkStatus = 'ativo' | 'inativo'
export type LinkType = 'unico' | 'reutilizavel'
export type PaymentStatus = 'pago' | 'aguardando' | 'cancelado' | 'rejeitado'
export type PaymentMethod = 'pix' | 'cartao' | 'boleto'

export type LinkItem = {
  id: string
  name: string
  description: string
  unitPrice: number
  quantity: number
}

export type Payment = {
  id: string
  contact: string
  date: string
  status: PaymentStatus
  method: PaymentMethod
}

export type PaymentLink = {
  id: string
  name: string
  description: string
  status: LinkStatus
  createdAt: string
  dueAt: string | null
  type: LinkType
  url: string
  items: LinkItem[]
  payments: Payment[]
  methods: { credit: boolean; pix: boolean; boleto: boolean }
  installments: string
}

export const MCC_OPTIONS = [
  '5411 — Supermercados',
  '5812 — Restaurantes',
  '8299 — Educação',
  '8062 — Hospitais',
  '5691 — Vestuário',
  '5732 — Eletrônicos',
]

export const BANKS = [
  '341 — Itaú Unibanco',
  '237 — Bradesco',
  '001 — Banco do Brasil',
  '033 — Santander',
  '104 — Caixa Econômica',
  '260 — Nubank',
]

export const MONTHLY_VOLUME = [
  { month: 'Jan', value: 4100 },
  { month: 'Fev', value: 1200 },
  { month: 'Mar', value: 1100 },
  { month: 'Abr', value: 500 },
  { month: 'Mai', value: 3100 },
  { month: 'Jun', value: 80 },
]

export const REFUSAL_REASONS = [
  { label: 'Saldo insufic.', value: 4750 },
  { label: 'Cartão bloquea.', value: 2000 },
  { label: 'Dados inváli.', value: 1200 },
  { label: 'Limite excedi.', value: 500 },
  { label: 'Link expirad.', value: 3050 },
  { label: 'Pag. recusado', value: 80 },
]

export const OPERATIONS = [
  { id: 'F434F4', created: '10/06/2025', method: 'cartao', original: 430, current: 430, status: 'pago', unit: 'Colégio Anglo Osasco' },
  { id: 'R43RF42F', created: '02/06/2025', method: 'pix', original: 5000, current: 5000, status: 'pago', unit: 'Colégio Anglo Alphaville' },
  { id: 'R43R4FF3', created: '02/06/2025', method: 'cartao', original: 1090, current: 1090, status: 'aguardando', unit: 'Colégio Anglo Zona leste' },
  { id: '8R923RUUR', created: '27/05/2025', method: 'boleto', original: 730, current: 730, status: 'cancelado', unit: 'Colégio Anglo Carapicuiba' },
  { id: 'F34R4FHGH', created: '22/05/2025', method: 'cartao', original: 70, current: 70, status: 'rejeitado', unit: 'Colégio Anglo Zona leste' },
  { id: '4R4FT4FW', created: '19/05/2025', method: 'pix', original: 309, current: 309, status: 'pago', unit: 'Colégio Anglo Barueri' },
] as const

function paymentsFor(seed: Payment[]): Payment[] {
  return seed
}

export const INITIAL_LINKS: PaymentLink[] = [
  {
    id: '1',
    name: 'Abril – EF – Turma B Noturno',
    description: 'Link de pagamento para a turma de Abril',
    status: 'ativo',
    createdAt: '29/03/2026',
    dueAt: '29/03/2026',
    type: 'unico',
    url: 'https://link.malga.io/a6c52e88-df46-4e86-9472-2b8623509afc',
    items: [{ id: 'i1', name: 'Ensino fundamental', description: 'Cobrança mensal do ano letivo', unitPrice: 3000, quantity: 1 }],
    payments: paymentsFor([{ id: 'p1', contact: 'Poliana Pessoa', date: '28/04/2026', status: 'pago', method: 'pix' }]),
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  },
  {
    id: '2',
    name: 'Abril – EF – Turma B Matutino',
    description: 'Mensalidade abril matutino',
    status: 'inativo',
    createdAt: '29/03/2026',
    dueAt: '29/03/2026',
    type: 'reutilizavel',
    url: 'https://totvspay.com/l/abril-ef-matutino',
    items: [{ id: 'i2', name: 'Ensino fundamental', description: 'Cobrança mensal do ano letivo', unitPrice: 4000, quantity: 1 }],
    payments: [
      { id: 'p2', contact: 'Poliana Pessoa', date: '28/04/2026', status: 'pago', method: 'pix' },
      { id: 'p3', contact: 'Guilherme Martins', date: '25/04/2026', status: 'pago', method: 'cartao' },
    ],
    methods: { credit: true, pix: true, boleto: false },
    installments: '1x',
  },
  {
    id: '3',
    name: 'Abril – EM – Turma B Noturno',
    description: 'Ensino médio noturno',
    status: 'inativo',
    createdAt: '29/03/2026',
    dueAt: '29/03/2026',
    type: 'reutilizavel',
    url: 'https://totvspay.com/l/abril-em-noturno',
    items: [{ id: 'i3', name: 'Ensino médio', description: 'Cobrança mensal', unitPrice: 5000, quantity: 1 }],
    payments: [],
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  },
  {
    id: '4',
    name: 'Abril – EM – Turma B Matutino',
    description: 'Ensino médio matutino',
    status: 'inativo',
    createdAt: '29/03/2026',
    dueAt: '29/03/2026',
    type: 'reutilizavel',
    url: 'https://totvspay.com/l/abril-em-matutino',
    items: [{ id: 'i4', name: 'Ensino médio', description: 'Cobrança mensal', unitPrice: 6000, quantity: 1 }],
    payments: [{ id: 'p4', contact: 'Bruno Matos', date: '-', status: 'aguardando', method: 'pix' }],
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  },
  {
    id: '5',
    name: 'Março – EM – Turma A Noturno',
    description: 'Turma A noturno',
    status: 'inativo',
    createdAt: '27/02/2026',
    dueAt: '27/02/2026',
    type: 'unico',
    url: 'https://totvspay.com/l/marco-em-noturno',
    items: [{ id: 'i5', name: 'Ensino médio', description: 'Cobrança mensal', unitPrice: 5000, quantity: 1 }],
    payments: Array.from({ length: 6 }, (_, i) => ({
      id: `p5-${i}`,
      contact: ['Poliana Pessoa', 'Guilherme Martins', 'Bruno Matos', 'Beatriz Victoria', 'Rodolfo Spalenza', 'Vandi Alves'][i],
      date: ['28/04/2026', '25/04/2026', '-', '-', '-', '13/04/2026'][i],
      status: (['pago', 'pago', 'aguardando', 'cancelado', 'rejeitado', 'pago'] as PaymentStatus[])[i],
      method: (['pix', 'cartao', 'pix', 'boleto', 'cartao', 'boleto'] as PaymentMethod[])[i],
    })),
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  },
  {
    id: '6',
    name: 'Março – EM – Turma A Matutino',
    description: 'Turma A matutino',
    status: 'inativo',
    createdAt: '27/02/2026',
    dueAt: '27/02/2026',
    type: 'reutilizavel',
    url: 'https://totvspay.com/l/marco-em-matutino',
    items: [{ id: 'i6', name: 'Ensino médio', description: 'Cobrança mensal', unitPrice: 6000, quantity: 1 }],
    payments: [],
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  },
]

export function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function linkTotal(link: PaymentLink) {
  return link.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
}

export function statusLabel(status: LinkStatus) {
  return {
    ativo: 'Ativo',
    inativo: 'Inativo',
  }[status]
}

export function statusClass(status: LinkStatus) {
  return {
    ativo: 'badge-success',
    inativo: 'badge-danger',
  }[status]
}

export function isLinkPaid(link: PaymentLink) {
  return link.payments.some((payment) => payment.status === 'pago')
}

export function linkPaymentLabel(link: PaymentLink) {
  return isLinkPaid(link) ? 'Pago' : 'Não pago'
}

export function linkPaymentClass(link: PaymentLink) {
  return isLinkPaid(link) ? 'badge-success' : 'badge-neutral'
}

export function paymentStatusLabel(status: PaymentStatus) {
  return {
    pago: 'Pago',
    aguardando: 'Aguardando pagamento',
    cancelado: 'Cancelado',
    rejeitado: 'Rejeitado',
  }[status]
}

export function paymentStatusClass(status: PaymentStatus) {
  return {
    pago: 'badge-success',
    aguardando: 'badge-warning',
    cancelado: 'badge-neutral',
    rejeitado: 'badge-danger',
  }[status]
}

export function methodLabel(method: PaymentMethod) {
  return { pix: 'Pix', cartao: 'Cartão', boleto: 'Boleto' }[method]
}

export function methodClass(method: PaymentMethod) {
  return { pix: 'badge-success', cartao: 'badge-purple', boleto: 'badge-blue' }[method]
}
