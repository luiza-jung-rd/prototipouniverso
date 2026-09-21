import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Button } from '../components/ui'
import {
  formatBRL,
  linkTotal,
  methodLabel,
  paymentStatusClass,
  paymentStatusLabel,
} from '../data/mock'
import { useStore } from '../context/Store'

export function LinkDetailPage() {
  const { id } = useParams()
  const { links, notify } = useStore()
  const navigate = useNavigate()
  const link = links.find((item) => item.id === id)
  const [query, setQuery] = useState('')

  const payments = useMemo(
    () => link?.payments.filter((payment) => payment.contact.toLowerCase().includes(query.toLowerCase())) ?? [],
    [link, query],
  )

  if (!link) {
    return (
      <AppShell>
        <div className="workspace-inner">
          <p>Link não encontrado.</p>
          <Button type="button" onClick={() => navigate('/links')}>
            Voltar
          </Button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="workspace-inner">
        <p className="page-kicker">Links de Pagamentos</p>
        <div className="page-title-row">
          <h1 className="page-title">
            <Link to="/links" className="back-link">
              ← {link.name}
            </Link>
          </h1>
        </div>
        <article className="card" style={{ marginBottom: 16 }}>
          <h3>Link de pagamento</h3>
          <div className="stat-row">
            <div>
              <small>Data de criação</small>
              <strong>{link.createdAt}</strong>
            </div>
            <div>
              <small>Data de expiração</small>
              <strong>{link.dueAt ?? '—'}</strong>
            </div>
            <div>
              <small>Quantidade de pagamentos</small>
              <strong>{link.payments.length || 1}</strong>
            </div>
            <div>
              <small>Valor total</small>
              <strong>{formatBRL(linkTotal(link) * Math.max(1, link.payments.filter((p) => p.status === 'pago').length || 1))}</strong>
            </div>
          </div>
          <FieldCopy url={link.url} onCopy={() => notify('Link copiado')} />
        </article>
        <article className="card" style={{ marginBottom: 16 }}>
          <h3>Itens no link</h3>
          <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {link.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{formatBRL(item.unitPrice * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </article>
        <article className="card">
          <div className="page-title-row" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Pagamentos</h3>
            <Button variant="secondary" type="button" onClick={() => notify('Lista exportada (protótipo)')}>
              Exportar lista
            </Button>
          </div>
          <div className="filters">
            <div className="search">
              <input className="control" placeholder="Buscar contato" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contato</th>
                <th>Data do pagamento</th>
                <th>Status</th>
                <th>Forma de pagamento</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.contact}</td>
                  <td>{payment.date}</td>
                  <td>
                    <span className={`badge ${paymentStatusClass(payment.status)}`}>{paymentStatusLabel(payment.status)}</span>
                  </td>
                  <td>{methodLabel(payment.method)}</td>
                  <td>
                    <button className="btn btn-ghost" type="button">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </article>
      </div>
    </AppShell>
  )
}

function FieldCopy({ url, onCopy }: { url: string; onCopy: () => void }) {
  return (
    <div>
      <small style={{ color: '#405466' }}>Link</small>
      <div className="share-url">
        <input className="control" readOnly value={url} />
        <Button
          variant="ghost"
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(url)
            onCopy()
          }}
        >
          Copiar
        </Button>
      </div>
    </div>
  )
}
