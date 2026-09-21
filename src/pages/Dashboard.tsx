import { useState } from 'react'
import { AppShell } from '../components/AppShell'
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

export function DashboardPage() {
  const [tab, setTab] = useState<'geral' | 'operacoes'>('geral')
  const maxBar = Math.max(...MONTHLY_VOLUME.map((item) => item.value))
  const maxRefusal = Math.max(...REFUSAL_REASONS.map((item) => item.value))

  return (
    <AppShell>
      <div className="workspace-inner">
        <div className="page-title-row">
          <h1 className="page-title">{tab === 'geral' ? 'Visão Geral' : 'Visão operacional'}</h1>
        </div>
        <button className="btn btn-ghost" type="button" style={{ marginBottom: 8 }}>
          📅 Período
        </button>
        <div className="tabs">
          <button className={`tab${tab === 'geral' ? ' active' : ''}`} onClick={() => setTab('geral')}>
            {tab === 'geral' ? 'Geral' : 'Transacional'}
          </button>
          <button className={`tab${tab === 'operacoes' ? ' active' : ''}`} onClick={() => setTab('operacoes')}>
            Operações
          </button>
        </div>

        {tab === 'geral' ? (
          <>
            <p className="help-link">Consulte a gestão de recebíveis com nosso suporte</p>
            <div className="kpi-row">
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#00DBFF' }}>💰</div>
                <div>
                  <h3>Total de cobrança</h3>
                  <strong>R$ 2,4M</strong>
                  <small>20.000 cobranças</small>
                </div>
              </article>
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#22c55e' }}>✓</div>
                <div>
                  <h3>Cobranças autorizadas</h3>
                  <strong>R$ 1,4M</strong>
                  <small>8.342 cobranças</small>
                </div>
                <span className="pct">55,7%</span>
              </article>
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#fb7185' }}>✕</div>
                <div>
                  <h3>Cobranças recusadas</h3>
                  <strong>R$ 1M</strong>
                  <small>1.000 cobranças</small>
                </div>
                <span className="pct">45,3%</span>
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3>Volume de pagamentos por mês</h3>
                <div className="bars">
                  {MONTHLY_VOLUME.map((item) => (
                    <div key={item.month} className="bar" style={{ height: `${Math.max(6, (item.value / maxBar) * 100)}%` }}>
                      <span>R${item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="bar-labels">
                  {MONTHLY_VOLUME.map((item) => (
                    <span key={item.month}>{item.month}</span>
                  ))}
                </div>
              </article>
              <article className="card">
                <div className="method-row">
                  <div className="method-icon">💳</div>
                  <div>
                    <small>Vendas no cartão de crédito</small>
                    <strong style={{ display: 'block', fontSize: 22 }}>R$ 7.265,00</strong>
                  </div>
                  <span>58%</span>
                </div>
                <div className="method-row">
                  <div className="method-icon">▦</div>
                  <div>
                    <small>Vendas no boleto</small>
                    <strong style={{ display: 'block', fontSize: 22 }}>R$ 7.265,00</strong>
                  </div>
                  <span>58%</span>
                </div>
                <div className="method-row">
                  <div className="method-icon">✱</div>
                  <div>
                    <small>Vendas no pix</small>
                    <strong style={{ display: 'block', fontSize: 22 }}>R$ 7.265,00</strong>
                  </div>
                  <span>58%</span>
                </div>
              </article>
            </div>

            <div className="dash-grid">
              <article className="card">
                <h3>Taxa de pagamentos aprovados por método</h3>
                <div className="stack">
                  <div className="stack-item" style={{ background: '#e8ecef', width: '98%' }}>61 (98%) <span>Pix</span></div>
                  <div className="stack-item" style={{ background: '#ffe6b0', width: '70%' }}>30 (89%) <span>Cartão de crédito</span></div>
                  <div className="stack-item" style={{ background: '#b6f5c9', width: '42%' }}>9 (76%) <span>Boleto</span></div>
                </div>
                <p style={{ margin: '16px 0 0', color: '#405466' }}>
                  Total de links <strong style={{ color: '#002233', fontSize: 22 }}>91,7%</strong>
                </p>
              </article>
              <article className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>Principais motivos de recusa</h3>
                  <button className="tab" type="button">Ver mais</button>
                </div>
                <div className="bars">
                  {REFUSAL_REASONS.map((item) => (
                    <div key={item.label} className="bar" style={{ height: `${Math.max(6, (item.value / maxRefusal) * 100)}%`, background: '#e11d48' }}>
                      <span>{item.value.toLocaleString('pt-BR')}</span>
                    </div>
                  ))}
                </div>
                <div className="bar-labels">
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
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#00DBFF' }}>💰</div>
                <div>
                  <h3>Total de cobrança</h3>
                  <strong>R$ 2,4M</strong>
                  <small>20.000 cobranças</small>
                </div>
              </article>
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#f5c518' }}>❚❚</div>
                <div>
                  <h3>Estorno</h3>
                  <strong>R$ 1M</strong>
                  <small>8.342 em disputa</small>
                </div>
                <span className="pct">45,3%</span>
              </article>
              <article className="kpi">
                <div className="kpi-icon" style={{ background: '#fb7185' }}>↩</div>
                <div>
                  <h3>Cancelamento</h3>
                  <strong>R$ 1M</strong>
                  <small>8765 devolvidos</small>
                </div>
                <span className="pct">45,3%</span>
              </article>
            </div>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3>Cobranças estornadas</h3>
              <svg viewBox="0 0 640 180" width="100%" height="180">
                <polyline fill="none" stroke="#00DBFF" strokeWidth="3" points="20,90 120,70 220,55 320,80 420,75 520,60 620,78" />
                <polyline fill="none" stroke="#002233" strokeWidth="3" points="20,110 120,85 220,95 320,88 420,92 520,70 620,82" />
              </svg>
            </article>
            <article className="card">
              <h3>Listagem de cobrança</h3>
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
                      <td><span className="name-link">{row.id}</span></td>
                      <td>{row.created}</td>
                      <td><span className={`badge ${methodClass(row.method as PaymentMethod)}`}>{methodLabel(row.method as PaymentMethod)}</span></td>
                      <td>{formatBRL(row.original)}</td>
                      <td>{formatBRL(row.current)}</td>
                      <td><span className={`badge ${paymentStatusClass(row.status as PaymentStatus)}`}>{paymentStatusLabel(row.status as PaymentStatus)}</span></td>
                      <td>{row.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </>
        )}
      </div>
    </AppShell>
  )
}
