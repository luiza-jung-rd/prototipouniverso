import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../advance/advance.css'
import {
  DEFAULT_AMOUNT,
  ENTRY_COMPONENTS,
  formatDue,
} from '../../advance/model'
import { useAdvance, type AdvanceLink } from '../../advance/store'
import { formatBRL } from '../../data/mock'
import { FlowNav } from './FlowNav'

type Dialog = 'whatsapp' | 'cancel' | null
type Modal = 'form' | 'share' | null

const SCHEDULE = [
  { name: 'Sinal', qty: 1, due: '10/10/2024', installment: 500, percent: '0,3', total: 500 },
  { name: 'Mensal', qty: 36, due: '10/11/2024', installment: 1666.67, percent: '80', total: 60000 },
  { name: 'Conclusão', qty: 1, due: '10/11/2024', installment: 500, percent: '0,5', total: 500 },
  { name: 'Anual', qty: 2, due: '10/11/2024', installment: 15000, percent: '30', total: 30000 },
]

export function ProposalPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { link, generate, cancel } = useAdvance()
  const [toast, setToast] = useState('')
  const [attentionOpen, setAttentionOpen] = useState(false)
  const [cents, setCents] = useState(DEFAULT_AMOUNT * 100)
  const [due, setDue] = useState('2026-09-23')
  const [expiryMode, setExpiryMode] = useState('vencimento')
  const [componentId, setComponentId] = useState('')
  const routeState = location.state as { view?: Modal | 'closed'; dialog?: Dialog } | null
  const [modal, setModal] = useState<Modal>(() => {
    if (routeState?.view === 'closed') return null
    if (routeState?.view === 'form') return 'form'
    if (routeState?.view === 'share' || (link && link.status !== 'cancelled')) return 'share'
    return null
  })
  const [dialog, setDialog] = useState<Dialog>(routeState?.view === 'share' ? (routeState.dialog ?? null) : null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 2400)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!routeState) return
    if (routeState.view === 'form') {
      setModal('form')
      setDialog(null)
    } else if (routeState.view === 'share') {
      setModal('share')
      setDialog(routeState.dialog ?? null)
    } else if (routeState.view === 'closed') {
      setModal(null)
      setDialog(null)
    }
  }, [routeState])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (dialog) setDialog(null)
      else setModal(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dialog])

  const amount = cents / 100

  function publish() {
    if (amount <= 0) {
      setToast('Informe o valor da cobrança')
      return
    }
    if (expiryMode === 'vencimento' && !due) {
      setToast('Informe a data de vencimento')
      return
    }
    generate(amount, expiryMode === 'vencimento' ? formatDue(due) : 'Sem expiração')
    navigate('/proposta', { replace: true, state: { view: 'share' } })
    setToast('Link de pagamento gerado')
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      /* o protótipo segue mesmo sem permissão de área de transferência */
    }
    setToast('Link copiado')
  }

  function applyComponent() {
    if (!componentId) {
      setToast('Selecione um componente de entrada')
      return
    }
    setToast('Saldo insuficiente para abater o adiantamento')
  }

  return (
    <div className={`advance-root${modal || dialog ? ' is-locked' : ''}`}>
      <header className="erp-top">
        <span className="erp-brand">Portal de Imóveis</span>
        <nav className="erp-nav" aria-label="Módulos">
          <span>Dashboard</span>
          <span>Pré-Venda</span>
          <span>Empreendimentos</span>
          <span>Aluguel</span>
          <span className="is-here">Propostas</span>
          <span>Contratos</span>
          <span>Corretores</span>
          <span>Gerencial</span>
          <span>Agendamentos</span>
        </nav>
        <div className="erp-tools">
          <button className="erp-head-btn" type="button">
            ‹ Voltar
          </button>
          <button className="erp-head-btn" type="button">
            Próximo ›
          </button>
        </div>
      </header>

      <main className="erp-page">
        <ol className="erp-stepper">
          <li>Dados Iniciais</li>
          <li>Cliente</li>
          <li className="is-active">Condições de pagamento</li>
          <li>Resumo da proposta</li>
        </ol>

        <div className="erp-toolbar">
          <button className="is-on" type="button" onClick={() => setModal(link && link.status !== 'cancelled' ? 'share' : 'form')}>
            Adiantamento
          </button>
          <button type="button">Comissão</button>
          <button type="button">% Desconto</button>
          <button type="button">Restaurar tabela</button>
          <button type="button">Validar</button>
          <button type="button">Plano de pagamento</button>
          <button type="button">Gráfico comparativo</button>
        </div>

        <label className="erp-field">
          <span>Modalidade</span>
          <select defaultValue="Modalidade Padrão Reajuste Mensal">
            <option>Modalidade Padrão Reajuste Mensal</option>
          </select>
        </label>
        <p className="erp-table-name">Tabela Padrão</p>
        <div className="erp-table-actions">
          <button type="button">+ Componentes Disponíveis</button>
        </div>
        <div className="erp-table-wrap">
          <table className="erp-table">
            <thead>
              <tr>
                <th />
                <th>Componente</th>
                <th>Quantidade</th>
                <th>Vencimento</th>
                <th>Valor Parcela</th>
                <th>C</th>
                <th>Desconto Comissão</th>
                <th>%</th>
                <th>Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((item) => (
                <tr key={item.name}>
                  <td className="erp-check">✓</td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.due}</td>
                  <td>{formatBRL(item.installment)}</td>
                  <td><input type="checkbox" disabled /></td>
                  <td>0,00</td>
                  <td>{item.percent}</td>
                  <td>{formatBRL(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="erp-totals">
          Adiantamento: R$ 0,00 · Percentual Total: 100,00% · Valor Total: R$ 100.000,00 · Desconto Comissão: R$ 0,00 · Saldo Devedor: R$ 100.000,00
        </p>
      </main>
      <footer className="erp-foot">
        <strong>TOTVS</strong>
        <span>Portal de Imóveis 12.1.2402</span>
        <span>Sobre</span>
      </footer>

      {modal === 'form' ? (
        <div className="adv-overlay">
          <section className="adv-modal adv-modal-form" role="dialog" aria-modal="true" aria-labelledby="advance-title">
            <header>
              <h2 id="advance-title">Adiantamento</h2>
            </header>
            <div className="adv-modal-body">
              <button className="adv-alert" type="button" onClick={() => setAttentionOpen((open) => !open)} aria-expanded={attentionOpen}>
                <InfoIcon />
                <span className="adv-alert-main">
                  <strong>ATENÇÃO</strong>
                  {attentionOpen ? (
                    <p>
                      O link cobra o adiantamento desta proposta. Sem o WorkNow configurado, o WhatsApp abre com a mensagem e o link prontos para envio.
                    </p>
                  ) : null}
                </span>
                <ChevronIcon />
              </button>
              <label className="adv-field">
                <span>
                  Valor R$ da Cobrança <em>*</em>
                </span>
                <input
                  className="adv-control"
                  inputMode="numeric"
                  value={formatBRL(amount)}
                  onChange={(event) => setCents(Number(event.target.value.replace(/\D/g, '').slice(0, 9) || '0'))}
                />
              </label>
              <div className="adv-grid-2">
                <label className="adv-field">
                  <span>
                    Expiração da cobrança <em>*</em>
                  </span>
                  <select className="adv-control" value={expiryMode} onChange={(event) => setExpiryMode(event.target.value)}>
                    <option value="vencimento">Data de Vencimento</option>
                    <option value="sem">Sem expiração</option>
                  </select>
                </label>
                <label className="adv-field">
                  <span>
                    Data de Vencimento <em>*</em>
                  </span>
                  <input className="adv-control" type="date" value={due} disabled={expiryMode !== 'vencimento'} onChange={(event) => setDue(event.target.value)} />
                </label>
              </div>
            </div>
            <footer className="adv-modal-foot center">
              <button className="adv-btn adv-btn-secondary" type="button" onClick={() => setModal(null)}>
                Fechar
              </button>
              <button className="adv-btn adv-btn-primary" type="button" onClick={publish}>
                Gerar link de pagamento
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {modal === 'share' && link ? (
        <div className="adv-overlay">
          <ShareModal
            link={link}
            componentId={componentId}
            onComponent={setComponentId}
            onClose={() => setModal(null)}
            onCopy={() => void copy(link.url)}
            onWhatsapp={() => setDialog('whatsapp')}
            onEmail={() => navigate('/email')}
            onSms={() => setToast('Mensagem de SMS pronta com o link de pagamento')}
            onApply={applyComponent}
            onCancel={() => setDialog('cancel')}
            onNew={() => {
              setModal('form')
              setDialog(null)
            }}
          />
        </div>
      ) : null}

      {dialog === 'whatsapp' ? (
        <div className="adv-dialog-layer">
          <section className="adv-dialog" role="dialog" aria-modal="true" aria-labelledby="wa-title">
            <header>
              <h2 id="wa-title">Enviar pelo WhatsApp Web</h2>
              <button className="adv-x" type="button" aria-label="Fechar" onClick={() => setDialog(null)}>
                ×
              </button>
            </header>
            <div className="body">
              Configure o template WorkNow para envio do link de pagamento por WhatsApp. Deseja abrir o WhatsApp Web com a mensagem do link de pagamento pronta para envio?
            </div>
            <footer>
              <button className="adv-btn adv-btn-secondary" type="button" onClick={() => setDialog(null)}>
                Cancelar
              </button>
              <button className="adv-btn adv-btn-primary" type="button" onClick={() => navigate('/whatsapp')}>
                Confirmar
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {dialog === 'cancel' && link ? (
        <div className="adv-dialog-layer">
          <section className="adv-dialog" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
            <header>
              <h2 id="cancel-title">Cancelar link de pagamento</h2>
            </header>
            <div className="body">
              <p>O link de pagamento da cobrança a seguir será cancelado:</p>
              <div className="adv-summary">
                <div>
                  <strong>{formatBRL(link.amount)}</strong>
                  <p>Link gerado em {link.createdLabel}</p>
                  <p>Data de expiração em {link.dueLabel}</p>
                </div>
                <div>
                  <span className={`adv-status${link.status === 'paid' ? ' is-paid' : ''}${link.status === 'cancelled' ? ' is-cancelled' : ''}`}>
                    <i />
                    {statusText(link.status)}
                  </span>
                  <div className="adv-summary-icons" style={{ marginTop: 12 }}>
                    <button className="adv-round" type="button" aria-label="Copiar link" onClick={() => void copy(link.url)}>
                      <CopyIcon />
                    </button>
                    <button className="adv-round wa" type="button" aria-label="WhatsApp" onClick={() => setDialog('whatsapp')}>
                      <WhatsIcon />
                    </button>
                    <button className="adv-round" type="button" aria-label="E-mail" onClick={() => navigate('/email')}>
                      <MailIcon />
                    </button>
                    <button className="adv-round" type="button" aria-label="SMS" onClick={() => setToast('Mensagem de SMS pronta com o link de pagamento')}>
                      <SmsIcon />
                    </button>
                  </div>
                </div>
              </div>
              <p>
                Após o cancelamento, a cobrança não ficará mais disponível para pagamento no sistema.
                <br />
                <strong>Você tem certeza que deseja cancelar?</strong>
              </p>
            </div>
            <footer>
              <button className="adv-btn adv-btn-secondary" type="button" onClick={() => setDialog(null)}>
                Fechar
              </button>
              <button
                className="adv-btn adv-btn-danger"
                type="button"
                onClick={() => {
                  cancel()
                  setDialog(null)
                  setModal('form')
                  setToast('Link de pagamento cancelado')
                }}
              >
                Sim, cancelar link de pagamento
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {toast ? <div className="adv-toast">{toast}</div> : null}
      <FlowNav />
    </div>
  )
}

function ShareModal({
  link,
  componentId,
  onComponent,
  onClose,
  onCopy,
  onWhatsapp,
  onEmail,
  onSms,
  onApply,
  onCancel,
  onNew,
}: {
  link: AdvanceLink
  componentId: string
  onComponent: (id: string) => void
  onClose: () => void
  onCopy: () => void
  onWhatsapp: () => void
  onEmail: () => void
  onSms: () => void
  onApply: () => void
  onCancel: () => void
  onNew: () => void
}) {
  const qr = `${import.meta.env.BASE_URL}qr-adiantamento.svg`
  return (
    <section className="adv-modal" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <header>
        <h2 id="share-title">Adiantamento</h2>
      </header>
      <div className="adv-modal-body">
        <div className="adv-success">
          <p>Geramos um link de pagamento de</p>
          <strong>{formatBRL(link.amount)}</strong>
          <p>Compartilhe para cobrar!</p>
          <div>
            Status:{' '}
            <span className={`adv-status${link.status === 'paid' ? ' is-paid' : ''}${link.status === 'cancelled' ? ' is-cancelled' : ''}`}>
              <i />
              {statusText(link.status)}
            </span>
          </div>
        </div>

        <div className="adv-link-label">
          Link gerado <InfoIcon />
        </div>
        <div className="adv-link-row">
          <div>
            <div className="adv-link-box">
              <span>{link.url}</span>
            </div>
            <button className="adv-btn adv-btn-outline adv-btn-block" type="button" onClick={onCopy}>
              <CopyIcon /> Copiar link
            </button>
            <div className="adv-share-actions" style={{ marginTop: 8 }}>
              <button className="adv-btn adv-btn-wa" type="button" onClick={onWhatsapp}>
                <WhatsIcon /> WhatsApp
              </button>
              <button className="adv-btn adv-btn-outline" type="button" onClick={onEmail}>
                <MailIcon /> E-mail
              </button>
              <button className="adv-btn adv-btn-outline" type="button" onClick={onSms}>
                <SmsIcon /> SMS
              </button>
            </div>
          </div>
          <img className="adv-qr" src={qr} alt="QR Code do link de pagamento" />
        </div>

        <section className="adv-panel">
          <h3>Informações do link de pagamento</h3>
          <p>
            <strong>Cobrança criada:</strong> {link.createdLabel}
          </p>
          <p>
            <strong>Data de expiração:</strong> {link.dueLabel}
          </p>
        </section>

        <section className="adv-panel">
          <h3>Onde deseja abater o adiantamento?</h3>
          <p className="adv-help">Selecione um componente de entrada com saldo suficiente.</p>
          {ENTRY_COMPONENTS.map((item) => (
            <button key={item.id} className="adv-choice" type="button" onClick={() => onComponent(item.id)}>
              <input type="radio" readOnly checked={componentId === item.id} />
              <span>
                {item.name}
                <small>Saldo insuficiente</small>
              </span>
              <b>
                <span>Saldo disponível</span>
                {formatBRL(item.balance)}
              </b>
            </button>
          ))}
          <button className="adv-btn adv-btn-outline adv-btn-block" type="button" onClick={onApply}>
            Aplicar adiantamento no componente
          </button>
          {link.status === 'waiting' ? (
            <div className="adv-split">
              <button className="adv-btn adv-btn-danger-outline" type="button" onClick={onCancel}>
                <InfoIcon /> Cancelar adiantamento
              </button>
              <button className="adv-btn adv-btn-outline" type="button" onClick={onNew}>
                <RefreshIcon /> Gerar novo link de pagamento
              </button>
            </div>
          ) : (
            <button className="adv-btn adv-btn-outline adv-btn-block" type="button" onClick={onNew} style={{ marginTop: 8 }}>
              <RefreshIcon /> Gerar novo link de pagamento
            </button>
          )}
        </section>
      </div>
      <footer className="adv-modal-foot">
        <button className="adv-btn adv-btn-secondary" type="button" onClick={onClose}>
          Fechar
        </button>
      </footer>
    </section>
  )
}

function statusText(status: AdvanceLink['status']) {
  if (status === 'paid') return 'Pago'
  if (status === 'cancelled') return 'Cancelado'
  return 'Aguardando pagamento'
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="4.6" r="0.8" fill="currentColor" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="5" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4 11H3.5A1.5 1.5 0 0 1 2 9.5v-6A1.5 1.5 0 0 1 3.5 2h6A1.5 1.5 0 0 1 11 3.5V4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function WhatsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path
        fill="currentColor"
        d="M8.1 2.2A5.7 5.7 0 0 0 3.2 11.6L2.4 14l2.5-.7A5.7 5.7 0 1 0 8.1 2.2Zm3.3 8.1c-.1.4-.8.7-1.1.8-.3 0-.6.1-2-.5-1.6-.8-2.6-2.3-2.7-2.4-.1-.1-.8-1-.8-1.9s.5-1.3.7-1.5.4-.2.5-.2h.4c.1 0 .3 0 .4.3.2.4.6 1.4.6 1.5.1.1 0 .2 0 .3l-.2.3-.3.3c-.1.1-.2.2-.1.4.1.2.5.8 1.1 1.3.7.6 1.3.8 1.5.9.2.1.3.1.4 0l.5-.6c.1-.2.3-.1.4-.1h.4c.2 0 .4.1.5.3.1.4.4 1.2.2 1.4Z"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="2" y="3.5" width="12" height="9" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 5l5 4 5-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function SmsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="4" y="2" width="8" height="12" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7 11.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path d="M13 8a5 5 0 1 1-1.4-3.4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 2.5V5H9.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

