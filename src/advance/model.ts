export const PAYMENT_URL = 'https://totvspay.com/l/8e93099f-182a-4a00-affb-7e0d3f28c705'
export const CREATED_LABEL = '16/09/2026 às 12:48'
export const DEFAULT_DUE = '23/09/2026'
export const DEFAULT_AMOUNT = 1000
export const WHATSAPP_PHONE = '+55 31 98642-0749'

export const PROPOSAL = {
  number: '23',
  enterprise: 'Shopping Run Fast',
  block: 'VAG.B',
  unit: 'Apto 000008',
  area: '150 m²',
  delivery: '01/01/2099',
  proposalDate: '14/09/2026',
  tableValue: 440,
  proposalValue: 939.18,
  spots: 0,
  modality: 'Modalidade Prima Run',
  table: 'Tabela Padrão',
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
