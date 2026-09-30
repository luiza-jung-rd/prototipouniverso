export type PersonType = 'pj' | 'pf' | ''

export type LinkStatus = 'ativo' | 'inativo'
export type LinkType = 'unico' | 'reutilizavel'
export type PaymentStatus = 'pago' | 'aguardando' | 'cancelado' | 'rejeitado' | 'estornado'
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
  { month: 'Abr', value: 79483.48 },
  { month: 'Mai', value: 196334.69 },
  { month: 'Jun', value: 142696.24 },
  { month: 'Jul', value: 282059.23 },
  { month: 'Ago', value: 106942.74 },
  { month: 'Set', value: 305621.76 },
]

export const METHOD_SALES = [
  { label: 'Vendas no cartão de crédito', value: 224968.54, pct: '22,8%' },
  { label: 'Vendas no boleto', value: 332082.33, pct: '33,7%' },
  { label: 'Vendas no pix', value: 230289.74, pct: '23,4%' },
]

export const METHOD_APPROVAL = [
  { label: 'Cartão de crédito', count: 512, pct: '80,8%', width: '80.8%', color: '#0ED869' },
  { label: 'Boleto', count: 2654, pct: '75,0%', width: '75%', color: '#81F0D8' },
  { label: 'Pix', count: 4056, pct: '63,9%', width: '63.9%', color: '#00DBFF' },
]

export const METHOD_APPROVAL_LEGEND = [
  { label: 'Pix', color: '#00DBFF' },
  { label: 'Cartão de crédito', color: '#0ED869' },
  { label: 'Boleto', color: '#81F0D8' },
]

export const METHOD_APPROVAL_TOTAL = '91,0%'

export const REFUSAL_REASONS = [
  { label: 'Erro de autenticação', short: 'Erro de a…', value: 68 },
  { label: 'Erro de autenticação sem desafio', short: 'Erro de a…', value: 31 },
  { label: 'Cartão bloqueado', short: 'Cartão bl…', value: 51 },
  { label: 'Cartão cancelado', short: 'Cartão ca…', value: 61 },
  { label: 'O cartão não aceita este tipo de compra', short: 'O cartão …', value: 61 },
  { label: 'Motivo da recusa indisponível', short: 'Motivo da…', value: 69 },
]

export const CHARGEBACK_SERIES = [
  { month: 'Abr', confirmed: 1128, refunds: 115 },
  { month: 'Mai', confirmed: 687, refunds: 90 },
  { month: 'Jun', confirmed: 1093, refunds: 136 },
  { month: 'Jul', confirmed: 1034, refunds: 121 },
  { month: 'Ago', confirmed: 1168, refunds: 141 },
  { month: 'Set', confirmed: 799, refunds: 51 },
]

export const CHARGEBACK_Y_MAX = 2000
export const CHARGEBACK_Y_TICKS = [
  { value: 2000, label: '2mil' },
  { value: 1600, label: '1,6mil' },
  { value: 1200, label: '1,2mil' },
  { value: 800, label: '800' },
  { value: 400, label: '400' },
  { value: 0, label: '0' },
]

export const OPERATIONS = [
  { id: '50f8e1da-1369-714f-b73c-7678d3e80148', created: '26/05/2026', method: 'cartao', original: 2090.51, current: 1530.02, status: 'pago', unit: '—' },
  { id: '23f02a71-5939-733c-aad5-72ff2630e519', created: '23/04/2026', method: 'pix', original: 2134.88, current: 1589.3, status: 'rejeitado', unit: '—' },
  { id: 'ba399483-0952-7939-b0a7-85b2ca16d4ac', created: '11/05/2026', method: 'boleto', original: 3807.02, current: 1937.07, status: 'cancelado', unit: '—' },
  { id: '4fd9d374-4d5a-7443-961d-6f4317555c4b', created: '11/06/2026', method: 'boleto', original: 1862.58, current: 1311.5, status: 'estornado', unit: '—' },
  { id: 'f875cb91-f7b5-7ad8-9a6c-248e346d1c79', created: '26/08/2026', method: 'cartao', original: 2924.33, current: 1690.14, status: 'pago', unit: '—' },
  { id: '2215bcaa-3975-72b1-b474-89d7d08833de', created: '27/09/2026', method: 'pix', original: 3808.38, current: 1929.7, status: 'rejeitado', unit: '—' },
  { id: 'f2f2d623-19c5-76f8-ac95-d4e967783c24', created: '25/07/2026', method: 'boleto', original: 1643.55, current: 984.94, status: 'cancelado', unit: '—' },
] as const

function linkOf(
  id: string,
  name: string,
  createdAt: string,
  dueAt: string,
  unitPrice: number,
): PaymentLink {
  return {
    id,
    name,
    description: name,
    status: 'ativo',
    createdAt,
    dueAt,
    type: 'unico',
    url: `https://totvspay-staging.rdstation.com/l/${id}`,
    items: [{ id: `i-${id}`, name, description: '', unitPrice, quantity: 1 }],
    payments: [],
    methods: { credit: true, pix: true, boleto: true },
    installments: '1x',
  }
}

export const INITIAL_LINKS: PaymentLink[] = [
  linkOf('1', 'Spalenza 02', '28/09/2026', '13/10/2026', 100),
  linkOf('2', 'Spalenza 01', '28/09/2026', '13/10/2026', 100),
  linkOf('3', 'Pós Literatura 2027', '23/09/2026', '25/09/2026', 1000),
  linkOf('4', 'Direito 2027.1', '23/09/2026', '01/10/2026', 1000),
  linkOf('5', 'Medicina 2027', '23/09/2026', '24/10/2026', 5000),
  linkOf('6', 'Teste 4', '18/09/2026', '19/09/2026', 100),
]

export function parseBrDate(value: string | null) {
  if (!value) return null
  const [day, month, year] = value.split('/').map(Number)
  if (!day || !month || !year) return null
  return new Date(year, month - 1, day)
}

export function isLinkExpired(link: PaymentLink) {
  const due = parseBrDate(link.dueAt)
  if (!due) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return due < today
}

export function compactBRL(value: number) {
  if (value >= 1000) {
    return `R$ ${Math.round(value / 1000).toLocaleString('pt-BR')} mil`
  }
  return formatBRL(value)
}

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
    estornado: 'Estornado',
  }[status]
}

export function paymentStatusClass(status: PaymentStatus) {
  return {
    pago: 'badge-success',
    aguardando: 'badge-warning',
    cancelado: 'badge-neutral',
    rejeitado: 'badge-danger',
    estornado: 'badge-warning',
  }[status]
}

export function methodLabel(method: PaymentMethod) {
  return { pix: 'Pix', cartao: 'Cartão', boleto: 'Boleto' }[method]
}

export function methodClass(method: PaymentMethod) {
  return { pix: 'badge-success', cartao: 'badge-purple', boleto: 'badge-blue' }[method]
}
