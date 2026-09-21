import { useState } from 'react'
import { AppShell } from '../components/AppShell'
import { Select } from '../components/ui'
import {
  MONTHLY_VOLUME,
  OPERATIONS,
  REFUSAL_REASONS,
  formatBRL,
  methodClass,
  methodLabel,
  paymentStatusClass,
  paymentStatusLabel,
  type PaymentMethod,
  type PaymentStatus,
} from '../data/mock'

function MoneyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="4" y="8" width="20" height="14" rx="3" stroke="#002233" strokeWidth="1.8" />
      <path d="M4 12h20" stroke="#002233" strokeWidth="1.8" />
      <circle cx="14" cy="16" r="2.2" stroke="#002233" strokeWidth="1.6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="#002233" strokeWidth="1.8" />
      <path d="M9 14.5l3.2 3.2L19 11" stroke="#002233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="#002233" strokeWidth="1.8" />
      <path d="M10 10l8 8M18 10l-8 8" stroke="#002233" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="9" y="8" width="3.2" height="12" rx="1" fill="#002233" />
      <rect x="15.8" y="8" width="3.2" height="12" rx="1" fill="#002233" />
    </svg>
  )
}

function UndoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M8 13H20a5 5 0 010 10H16" stroke="#002233" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 13l4-4M8 13l4 4" stroke="#002233" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="2" y="5" width="18" height="12" rx="2" stroke="#002233" strokeWidth="1.6" />
      <path d="M2 9h18" stroke="#002233" strokeWidth="1.6" />
    </svg>
  )
}

function BoletoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="4" y="3" width="14" height="16" rx="2" stroke="#002233" strokeWidth="1.6" />
      <path d="M7 8h8M7 11h8M7 14h5" stroke="#002233" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PixIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path d="M11 3l8 8-8 8-8-8 8-8z" stroke="#002233" strokeWidth="1.6" />
    </svg>
  )
}

function DataBlock({
  label,
  value,
  helper,
}: {
  label: string
  value: string
  helper?: string
}) {
  return (
    <div className="data-block">
      <span className="data-block-label">{label}</span>
      <strong className="data-block-value">{value}</strong>
      {helper ? <span className="data-block-helper">{helper}</span> : null}
    </div>
  )
}

export function DashboardPage() {
  const [tab, setTab] = useState<'geral' | 'operacoes'>('geral')
  const [period, setPeriod] = useState('30')
  const maxBar = Math.max(...MONTHLY_VOLUME.map((item) => item.value))
  const maxRefusal = Math.max(...REFUSAL_REASONS.map((item) => item.value))

  return (
    <AppShell>
      <div className="workspace-inner">
        <header className="page-header">
          <h1 className="page-title">{tab === 'geral' ? 'Visão geral' : 'Visão operacional'}</h1>
        </header>

        <div className="dash-toolbar">
          <Select className="control control-period" value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Período">
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="year">Este ano</option>
          </Select>
        </div>

        <div className="tabs" role="tablist">
          <button
            className={`tab${tab === 'geral' ? ' active' : ''}`}
            role="tab"
            aria-selected={tab === 'geral'}
            onClick={() => setTab('geral')}
          >
            Geral
          </button>
          <button
            className={`tab${tab === 'operacoes' ? ' active' : ''}`}
            role="tab"
            aria-selected={tab === 'operacoes'}
            onClick={() => setTab('operacoes')}
          >
            Operações
          </button>
        </div>

        {tab === 'geral' ? (
          <>
            <p className="help-link">
              <a className="tg-link" href="#suporte">
                Consulte a gestão de recebíveis com nosso suporte
              </a>
            </p>
            <div className="kpi-row">
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-cyan">
                  <MoneyIcon />
                </div>
                <DataBlock label="Total de cobrança" value="R$ 2,4M" helper="20.000 cobranças" />
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-success">
                  <CheckIcon />
                </div>
                <DataBlock label="Cobranças autorizadas" value="R$ 1,4M" helper="8.342 cobranças" />
                <span className="data-block-trend">55,7%</span>
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-danger">
                  <CloseIcon />
                </div>
                <DataBlock label="Cobranças recusadas" value="R$ 1M" helper="1.000 cobranças" />
                <span className="data-block-trend">45,3%</span>
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3 className="card-title">Volume de pagamentos por mês</h3>
                <div className="bars" style={{ gridTemplateColumns: `repeat(${MONTHLY_VOLUME.length}, minmax(0, 1fr))` }}>
                  {MONTHLY_VOLUME.map((item) => (
                    <div key={item.month} className="bar" style={{ height: `${Math.max(8, (item.value / maxBar) * 100)}%` }}>
                      <span>R$ {item.value.toLocaleString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
                <div className="bar-labels" style={{ gridTemplateColumns: `repeat(${MONTHLY_VOLUME.length}, minmax(0, 1fr))` }}>
                  {MONTHLY_VOLUME.map((item) => (
                    <span key={item.month}>{item.month}</span>
                  ))}
                </div>
              </article>
              <article className="card method-card">
                <div className="method-row">
                  <div className="method-icon">
                    <CardIcon />
                  </div>
                  <div className="data-block data-block-compact">
                    <span className="data-block-label">Vendas no cartão de crédito</span>
                    <strong className="data-block-value">R$ 7.265,00</strong>
                  </div>
                  <span className="method-pct">58%</span>
                </div>
                <div className="method-row">
                  <div className="method-icon">
                    <BoletoIcon />
                  </div>
                  <div className="data-block data-block-compact">
                    <span className="data-block-label">Vendas no boleto</span>
                    <strong className="data-block-value">R$ 7.265,00</strong>
                  </div>
                  <span className="method-pct">58%</span>
                </div>
                <div className="method-row">
                  <div className="method-icon">
                    <PixIcon />
                  </div>
                  <div className="data-block data-block-compact">
                    <span className="data-block-label">Vendas no pix</span>
                    <strong className="data-block-value">R$ 7.265,00</strong>
                  </div>
                  <span className="method-pct">58%</span>
                </div>
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3 className="card-title">Taxa de pagamentos aprovados por método</h3>
                <div className="stack">
                  <div className="stack-item" style={{ background: '#e8ecef', width: '98%' }}>
                    61 (98%) <span>Pix</span>
                  </div>
                  <div className="stack-item" style={{ background: '#ffe6b0', width: '70%' }}>
                    30 (89%) <span>Cartão de crédito</span>
                  </div>
                  <div className="stack-item" style={{ background: '#b6f5c9', width: '42%' }}>
                    9 (76%) <span>Boleto</span>
                  </div>
                </div>
                <p className="stack-total">
                  Total de links <strong>91,7%</strong>
                </p>
              </article>
              <article className="card">
                <div className="card-title-row">
                  <h3 className="card-title">Principais motivos de recusa</h3>
                  <button className="btn btn-tertiary" type="button">
                    Ver mais
                  </button>
                </div>
                <div className="bars bars-danger" style={{ gridTemplateColumns: `repeat(${REFUSAL_REASONS.length}, minmax(0, 1fr))` }}>
                  {REFUSAL_REASONS.map((item) => (
                    <div key={item.label} className="bar" style={{ height: `${Math.max(8, (item.value / maxRefusal) * 100)}%` }}>
                      <span>{item.value.toLocaleString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
                <div className="bar-labels" style={{ gridTemplateColumns: `repeat(${REFUSAL_REASONS.length}, minmax(0, 1fr))` }}>
                  {REFUSAL_REASONS.map((item) => (
                    <span key={item.label}>{item.label}</span>
                  ))}
                </div>
              </article>
            </div>
          </>
        ) : (
          <>
            <div className="kpi-row">
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-cyan">
                  <MoneyIcon />
                </div>
                <DataBlock label="Total de cobrança" value="R$ 2,4M" helper="20.000 cobranças" />
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-warning">
                  <PauseIcon />
                </div>
                <DataBlock label="Estorno" value="R$ 1M" helper="8.342 em disputa" />
                <span className="data-block-trend">45,3%</span>
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-danger">
                  <UndoIcon />
                </div>
                <DataBlock label="Cancelamento" value="R$ 1M" helper="8.765 devolvidos" />
                <span className="data-block-trend">45,3%</span>
              </article>
            </div>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3 className="card-title">Cobranças estornadas</h3>
              <svg className="line-chart" viewBox="0 0 640 180" preserveAspectRatio="none" role="img" aria-label="Cobranças estornadas">
                <polyline fill="none" stroke="#00DBFF" strokeWidth="3" points="20,90 120,70 220,55 320,80 420,75 520,60 620,78" />
                <polyline fill="none" stroke="#003D5C" strokeWidth="3" points="20,110 120,85 220,95 320,88 420,92 520,70 620,82" />
              </svg>
            </article>
            <article className="card">
              <h3 className="card-title">Listagem de cobrança</h3>
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Identificador</th>
                      <th>Data de criação</th>
                      <th>Forma de pagamento</th>
                      <th>Valor original</th>
                      <th>Valor atual</th>
                      <th>Status</th>
                      <th>Unidade de negócio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OPERATIONS.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span className="name-link">{row.id}</span>
                        </td>
                        <td>{row.created}</td>
                        <td>
                          <span className={`badge ${methodClass(row.method as PaymentMethod)}`}>
                            {methodLabel(row.method as PaymentMethod)}
                          </span>
                        </td>
                        <td>{formatBRL(row.original)}</td>
                        <td>{formatBRL(row.current)}</td>
                        <td>
                          <span className={`badge ${paymentStatusClass(row.status as PaymentStatus)}`}>
                            {paymentStatusLabel(row.status as PaymentStatus)}
                          </span>
                        </td>
                        <td>{row.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </>
        )}
      </div>
    </AppShell>
  )
}
