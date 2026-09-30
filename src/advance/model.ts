export const PAYMENT_URL = 'https://totvspay.com/l/8e93099f-182a-4a00-affb-7e0d3f28c705'
export const CREATED_LABEL = '16/09/2026 às 12:48'
export const DEFAULT_DUE = '23/09/2026'
export const DEFAULT_AMOUNT = 1000
export const WHATSAPP_PHONE = '+55 31 98642-0749'

export const PROPOSAL = {
  number: '259',
  enterprise: 'EDIFÍCIO ALPES SC',
  block: 'Torre C',
  unit: 'unidade 000410',
  area: '80 m²',
  delivery: '31/01/2025',
  proposalDate: '27/08/2025',
  tableValue: 280000,
  proposalValue: 280000,
  spots: 0,
  modality: 'Modalidade Padrão',
  table: 'Tabela Padrão',
}

export const PAYMENT_SCHEDULE = [
  { name: 'Sinal', qty: 3, due: '27/08/2025', installment: 18666.67, percent: 20, total: 56000 },
  { name: 'Mensal', qty: 90, due: '27/09/2025', installment: 2177.78, percent: 70, total: 196000 },
  { name: 'Parcela Única', qty: 4, due: '27/09/2025', installment: 7000, percent: 10, total: 28000 },
]

export const PROPOSAL_CLIENT = {
  media: 'Instagram',
  reason: 'Investimento',
  name: 'Rita Rubelo',
  document: '812.653.610-10',
  email: 'leandrobelzani@hotmail.com',
  phone: '+55 (31) 9902-6166',
  mobile: '+55 (31) 9947-54515',
}

export const ENTRY_COMPONENTS = [
  { id: 'sinal', name: 'Sinal', balance: 60 },
  { id: 'entrada', name: 'Entrada de valor', balance: 37.59 },
]

export function formatDue(iso: string) {
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${day}/${month}/${year}`
}

export function whatsappMessage(url: string) {
  return `Estou enviando o link para pagamento do adiantamento da Proposta/Reserva ${PROPOSAL.number} referente ao Empreendimento ${PROPOSAL.enterprise}, Bloco/Quadra ${PROPOSAL.unit}, Unidade/Lote ${PROPOSAL.block}.\n\nLink para pagamento:\n${url}`
}

export function emailBody(url: string) {
  return `Sou Pimentinha. Link do adiantamento da Prop/Reserva ${PROPOSAL.number} - Emp. ${PROPOSAL.enterprise}, Bloco/Quadra ${PROPOSAL.block}, Unidade/Lote ${PROPOSAL.unit}: ${url}`
}
