import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Button, Select } from '../components/ui'
import {
  CHARGEBACK_SERIES,
  CHARGEBACK_Y_MAX,
  CHARGEBACK_Y_TICKS,
  DASHBOARD_KPI,
  METHOD_APPROVAL,
  METHOD_APPROVAL_LEGEND,
  METHOD_APPROVAL_TOTAL,
  METHOD_SALES,
  MONTHLY_VOLUME,
  OPERATIONS,
  REFUSAL_REASONS,
  compactBRL,
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
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M22.352 4.802C21.019 4.222 19.684 4 18.35 4c-4.233 0-8.467 2.226-12.7 2.226-1.063 0-2.124-.14-3.186-.49A1.115 1.115 0 001 6.814v11.331c0 .451.249.879.648 1.053 1.333.58 2.667.802 4.001.802 4.234 0 8.468-2.227 12.702-2.227 1.062 0 2.123.14 3.185.49A1.115 1.115 0 0023 17.185V5.855c0-.452-.249-.879-.648-1.053zM2.65 7.58c.692.18 1.413.27 2.156.32-.202 1.049-1.09 1.84-2.156 1.84v-2.16zm0 10.179V16.05c1.181 0 2.137.974 2.19 2.193a8.042 8.042 0 01-2.19-.486zm9.35-2.33c-1.52 0-2.75-1.535-2.75-3.428 0-1.894 1.231-3.429 2.75-3.429 1.518 0 2.75 1.535 2.75 3.429s-1.232 3.429-2.75 3.429zm9.35.993a11.41 11.41 0 00-1.867-.302c.201-.931.945-1.638 1.867-1.76v2.062zm0-8.433c-1.062-.14-1.886-1.06-1.919-2.198.672.077 1.31.223 1.919.452v1.746z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <span className="kpi-glyph">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#0ED869" aria-hidden>
        <path d="M9.114 18.16l-5.85-5.85a.9.9 0 010-1.274l1.272-1.272a.9.9 0 011.273 0l3.941 3.94 8.44-8.44a.9.9 0 011.274 0l1.272 1.272a.9.9 0 010 1.273l-10.35 10.35a.9.9 0 01-1.272 0z" />
      </svg>
    </span>
  )
}

function CloseIcon() {
  return (
    <span className="kpi-glyph">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#E60F57" aria-hidden>
        <path d="M14.274 12l3.412-3.411a1.072 1.072 0 000-1.517l-.758-.758a1.072 1.072 0 00-1.517 0L12 9.725 8.589 6.314a1.072 1.072 0 00-1.517 0l-.758.758a1.072 1.072 0 000 1.517L9.725 12l-3.411 3.412a1.072 1.072 0 000 1.516l.758.758a1.072 1.072 0 001.517 0L12 14.274l3.412 3.412a1.072 1.072 0 001.516 0l.758-.758a1.072 1.072 0 000-1.517L14.274 12z" />
      </svg>
    </span>
  )
}

function PauseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M9.5 19h-3A1.5 1.5 0 015 17.5v-11A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v11A1.5 1.5 0 019.5 19zm9.5-1.5v-11A1.5 1.5 0 0017.5 5h-3A1.5 1.5 0 0013 6.5v11a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5z" />
    </svg>
  )
}

function UndoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M11.983 3a8.97 8.97 0 00-6.2 2.493L4.487 4.197C3.938 3.647 3 4.037 3 4.812v4.865c0 .482.39.871.871.871h4.865c.776 0 1.165-.938.616-1.486L7.837 7.546a6.052 6.052 0 014.109-1.643c3.353-.028 6.18 2.685 6.15 6.15-.027 3.286-2.691 6.044-6.096 6.044a6.052 6.052 0 01-4.015-1.508.435.435 0 00-.594.02l-1.44 1.44a.436.436 0 00.018.632A9 9 0 0021 12c.001-4.966-4.05-9.01-9.015-9.001z" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M2 17.889c0 .92.747 1.667 1.667 1.667h16.666c.92 0 1.667-.747 1.667-1.667v-6.111H2v6.11zm6.667-2.361c0-.23.187-.417.416-.417h4.723c.229 0 .416.188.416.417v1.389c0 .229-.187.416-.416.416H9.083a.418.418 0 01-.416-.416v-1.39zm-4.445 0c0-.23.188-.417.417-.417h2.5c.23 0 .417.188.417.417v1.389c0 .229-.188.416-.417.416h-2.5a.418.418 0 01-.417-.416v-1.39zM22 5.667v1.666H2V5.667C2 4.747 2.747 4 3.667 4h16.666C21.253 4 22 4.747 22 5.667z" />
    </svg>
  )
}

function BoletoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M0 21V3h.844v18H0zm1.259-.013V3h.429v17.987h-.43zm1.272 0V3h.415v17.987h-.415zm2.103 0V3h.415v17.987h-.415zm1.687 0V3h.83v17.987h-.83zm2.103 0V3h.415v17.987h-.415zm.844 0V3h.415v17.987h-.415zm.844 0V3h.415v17.987h-.415zm1.674 0V3h.844v17.987h-.844zm2.102 0V3h.844v17.987h-.844zm1.688 0V3h.844v17.987h-.844zm1.687 0V3h.844v17.987h-.844zm1.26 0V3h.843v17.987h-.844zm2.115 0V3h1.26v17.987h-1.26zm1.674 0V3h.43v17.987h-.43zm.844.013V3H24v18h-.844z" />
    </svg>
  )
}

function PixIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M5.283 18.36a3.505 3.505 0 0 0 2.493-1.032l3.6-3.6a.684.684 0 0 1 .946 0l3.613 3.613a3.504 3.504 0 0 0 2.493 1.032h.71l-4.56 4.56a3.647 3.647 0 0 1-5.156 0L4.85 18.36ZM18.428 5.627a3.505 3.505 0 0 0-2.493 1.032l-3.613 3.614a.67.67 0 0 1-.946 0l-3.6-3.6A3.505 3.505 0 0 0 5.283 5.64h-.434l4.573-4.572a3.646 3.646 0 0 1 5.156 0l4.559 4.559ZM1.068 9.422 3.79 6.699h1.492a2.483 2.483 0 0 1 1.744.722l3.6 3.6a1.73 1.73 0 0 0 2.443 0l3.614-3.613a2.482 2.482 0 0 1 1.744-.723h1.767l2.737 2.737a3.646 3.646 0 0 1 0 5.156l-2.736 2.736h-1.768a2.482 2.482 0 0 1-1.744-.722l-3.613-3.613a1.77 1.77 0 0 0-2.444 0l-3.6 3.6a2.483 2.483 0 0 1-1.744.722H3.791l-2.723-2.723a3.646 3.646 0 0 1 0-5.156" />
    </svg>
  )
}

function smoothPath(points: Array<[number, number]>) {
  if (points.length === 0) return ''
  if (points.length === 1) return `M${points[0][0]},${points[0][1]}`
  let d = `M${points[0][0]},${points[0][1]}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`
  }
  return d
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

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#002233" aria-hidden>
      <path d="M4 19.313C4 20.244 4.768 21 5.714 21h12.572c.946 0 1.714-.756 1.714-1.688V9.75H4v9.563zm2.286-6.75c0-.31.257-.563.571-.563h3.429c.314 0 .571.253.571.563v3.374c0 .31-.257.563-.571.563H6.857a.569.569 0 01-.571-.563v-3.374zm12-7.313H16.57V3.562A.569.569 0 0016 3h-1.143a.569.569 0 00-.571.563V5.25H9.714V3.562A.569.569 0 009.143 3H8a.569.569 0 00-.571.563V5.25H5.714C4.768 5.25 4 6.006 4 6.938v1.687h16V6.937c0-.931-.768-1.687-1.714-1.687z" />
    </svg>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'geral' | 'operacoes'>('geral')
  const [period, setPeriod] = useState('6')
  const [interval, setInterval] = useState('month')
  const maxBar = Math.max(...MONTHLY_VOLUME.map((item) => item.value))
  const maxRefusal = Math.max(...REFUSAL_REASONS.map((item) => item.value))
  const chargePath = (key: 'confirmed' | 'refunds') =>
    smoothPath(
      CHARGEBACK_SERIES.map((item, index) => {
        const x = (index * 600) / (CHARGEBACK_SERIES.length - 1)
        const y = 200 - (item[key] / CHARGEBACK_Y_MAX) * 200
        return [x, y] as [number, number]
      }),
    )

  return (
    <AppShell>
      <div className="workspace-inner">
        <header className="page-header">
          <h1 className="page-title">{tab === 'geral' ? 'Visão Geral' : 'Visão operacional'}</h1>
          <Button type="button" onClick={() => navigate('/links/novo')}>
            Criar link de pagamento
          </Button>
        </header>

        <div className="dash-toolbar">
          <label className="dash-filter">
            <CalendarIcon />
            <Select
              className="dash-filter-select"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              aria-label="Filtrar por período"
            >
              <option value="6">Últimos 6 meses</option>
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
              <option value="year">Este ano</option>
            </Select>
          </label>
          <label className="dash-filter">
            <Select
              className="dash-filter-select"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              aria-label="Filtrar por intervalo"
            >
              <option value="month">Visualizar por mês</option>
              <option value="week">Visualizar por semana</option>
              <option value="day">Visualizar por dia</option>
            </Select>
          </label>
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
                <DataBlock
                  label="Total de cobrança"
                  value={formatBRL(DASHBOARD_KPI.totalValue)}
                  helper={`${DASHBOARD_KPI.totalCount.toLocaleString('pt-BR')} cobranças`}
                />
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-success">
                  <CheckIcon />
                </div>
                <DataBlock
                  label="Cobranças autorizadas"
                  value={formatBRL(DASHBOARD_KPI.authorizedValue)}
                  helper={`${DASHBOARD_KPI.authorizedCount.toLocaleString('pt-BR')} cobranças`}
                />
                <span className="data-block-trend">{DASHBOARD_KPI.authorizedPct}</span>
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-danger">
                  <CloseIcon />
                </div>
                <DataBlock
                  label="Cobranças recusadas"
                  value={formatBRL(DASHBOARD_KPI.refusedValue)}
                  helper={`${DASHBOARD_KPI.refusedCount.toLocaleString('pt-BR')} cobranças`}
                />
                <span className="data-block-trend">{DASHBOARD_KPI.refusedPct}</span>
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3 className="card-title">Volume de pagamentos por mês</h3>
                <div className="bars" style={{ gridTemplateColumns: `repeat(${MONTHLY_VOLUME.length}, minmax(0, 1fr))` }}>
                  {MONTHLY_VOLUME.map((item) => (
                    <div key={item.month} className="bar" style={{ height: `${Math.max(8, (item.value / maxBar) * 100)}%` }}>
                      <span>{compactBRL(item.value)}</span>
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
                {METHOD_SALES.map((item, index) => {
                  const Icon = [CardIcon, BoletoIcon, PixIcon][index]
                  return (
                    <div className="method-row" key={item.label}>
                      <div className="method-icon">
                        <Icon />
                      </div>
                      <div className="data-block data-block-compact">
                        <span className="data-block-label">{item.label}</span>
                        <strong className="data-block-value">{formatBRL(item.value)}</strong>
                      </div>
                      <span className="method-pct">{item.pct}</span>
                    </div>
                  )
                })}
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3 className="card-title">Taxa de pagamentos aprovados por método</h3>
                <div className="approval-chart">
                  <div className="approval-bars">
                    {METHOD_APPROVAL.map((item) => (
                      <div
                        key={item.label}
                        className="approval-bar"
                        style={{ background: item.color, width: item.width }}
                      >
                        {item.count.toLocaleString('pt-BR')} ({item.pct})
                      </div>
                    ))}
                  </div>
                  <ul className="approval-legend" aria-label="Métodos de pagamento">
                    {METHOD_APPROVAL_LEGEND.map((item) => (
                      <li key={item.label}>
                        <span className="approval-swatch" style={{ background: item.color }} aria-hidden />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                  <div className="approval-total">
                    <span>Total de cobranças</span>
                    <strong>{METHOD_APPROVAL_TOTAL}</strong>
                    <div className="approval-dots" aria-hidden>
                      {METHOD_APPROVAL_LEGEND.map((item) => (
                        <span key={item.label} style={{ background: item.color }} />
                      ))}
                    </div>
                  </div>
                </div>
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
                    <span key={item.label}>{item.short}</span>
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
                <DataBlock
                  label="Total de cobrança"
                  value={formatBRL(DASHBOARD_KPI.totalValue)}
                  helper={`${DASHBOARD_KPI.totalCount.toLocaleString('pt-BR')} cobranças`}
                />
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-warning">
                  <PauseIcon />
                </div>
                <DataBlock
                  label="Estorno"
                  value={formatBRL(DASHBOARD_KPI.refundValue)}
                  helper={`${DASHBOARD_KPI.refundCount.toLocaleString('pt-BR')} em disputa`}
                />
                <span className="data-block-trend">{DASHBOARD_KPI.refundPct}</span>
              </article>
              <article className="card kpi">
                <div className="kpi-icon kpi-icon-danger">
                  <UndoIcon />
                </div>
                <DataBlock
                  label="Cancelamento"
                  value={formatBRL(DASHBOARD_KPI.cancelValue)}
                  helper={`${DASHBOARD_KPI.cancelCount.toLocaleString('pt-BR')} devolvidos`}
                />
                <span className="data-block-trend">{DASHBOARD_KPI.cancelPct}</span>
              </article>
            </div>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3 className="card-title">Cobranças estornadas</h3>
              <div className="charge-chart">
                <div className="charge-y" aria-hidden>
                  {CHARGEBACK_Y_TICKS.map((tick) => (
                    <span key={tick.value}>{tick.label}</span>
                  ))}
                </div>
                <div>
                  <svg
                    className="charge-svg"
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Comparação entre cobranças confirmadas e estornadas"
                  >
                    {CHARGEBACK_Y_TICKS.map((tick) => {
                      const y = 200 - (tick.value / CHARGEBACK_Y_MAX) * 200
                      return (
                        <line
                          key={tick.value}
                          x1="0"
                          y1={y}
                          x2="600"
                          y2={y}
                          stroke="#d7e0e6"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                      )
                    })}
                    <path
                      d={chargePath('confirmed')}
                      fill="none"
                      stroke="#00DBFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d={chargePath('refunds')}
                      fill="none"
                      stroke="#005580"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <div className="charge-x">
                    {CHARGEBACK_SERIES.map((item) => (
                      <span key={item.month}>{item.month}</span>
                    ))}
                  </div>
                  <ul className="charge-legend">
                    <li>
                      <span className="approval-swatch" style={{ background: '#00DBFF' }} aria-hidden />
                      Confirmados
                    </li>
                    <li>
                      <span className="approval-swatch" style={{ background: '#005580' }} aria-hidden />
                      Estornos
                    </li>
                  </ul>
                </div>
              </div>
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
