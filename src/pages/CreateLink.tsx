import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { Button, Field, Input, Modal, Select } from '../components/ui'
import { newItem, useStore } from '../context/Store'
import { formatBRL, type LinkItem, type LinkType, type PaymentLink } from '../data/mock'

export function CreateLinkPage() {
  const navigate = useNavigate()
  const { addLink, notify } = useStore()
  const [tab, setTab] = useState<'itens' | 'config'>('itens')
  const [name, setName] = useState('Abril – EF – Turma B Noturno')
  const [description, setDescription] = useState('Link de pagamento para a turma de Abril')
  const [type, setType] = useState<LinkType>('reutilizavel')
  const [items, setItems] = useState<LinkItem[]>([
    { id: 'seed-1', name: 'Ensino fundamental', description: 'Cobrança mensal do ano letivo', unitPrice: 3000, quantity: 1 },
  ])
  const [credit, setCredit] = useState(true)
  const [pix, setPix] = useState(true)
  const [boleto, setBoleto] = useState(true)
  const [installments, setInstallments] = useState('1x')
  const [pixDays, setPixDays] = useState('5')
  const [boletoDue, setBoletoDue] = useState('2026-10-10')
  const [interest, setInterest] = useState('Sem juros')
  const [fine, setFine] = useState('Sem multa')
  const [dueAt, setDueAt] = useState('')
  const [noDue, setNoDue] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [created, setCreated] = useState<PaymentLink | null>(null)

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0),
    [items],
  )
  const canPublish = Boolean(name && items[0]?.name && items[0]?.unitPrice)

  function patchItem(id: string, patch: Partial<LinkItem>) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)))
  }

  function publish() {
    const link: PaymentLink = {
      id: crypto.randomUUID(),
      name,
      description,
      status: 'ativo',
      createdAt: new Date().toLocaleDateString('pt-BR'),
      dueAt: noDue || !dueAt ? null : new Date(dueAt).toLocaleDateString('pt-BR'),
      type,
      url: `https://totvspay.com/l/${crypto.randomUUID().slice(0, 8)}`,
      items,
      payments: [],
      methods: { credit, pix, boleto },
      installments,
    }
    addLink(link)
    setCreated(link)
    setConfirmOpen(false)
    setShareOpen(true)
    notify('Link de pagamento criado')
  }

  return (
    <AppShell>
      <div className="workspace-inner">
        <p className="page-kicker">Links de pagamentos</p>
        <div className="page-title-row">
          <h1 className="page-title">
            <Link to="/links" className="back-link">
              ← {tab === 'config' ? 'Gerenciar configurações para este link de pagamento' : 'Criar link de pagamento'}
            </Link>
          </h1>
          <Button type="button" disabled={!canPublish} onClick={() => (tab === 'itens' ? setConfirmOpen(true) : publish())}>
            {tab === 'config' ? 'Publicar link' : 'Criar link de pagamento'}
          </Button>
        </div>
        <div className="tabs">
          <button className={`tab${tab === 'itens' ? ' active' : ''}`} onClick={() => setTab('itens')}>
            Itens do pagamento
          </button>
          <button className={`tab${tab === 'config' ? ' active' : ''}`} onClick={() => setTab('config')}>
            Configurações de pagamento
          </button>
        </div>

        {tab === 'itens' ? (
          <>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3>Dê um nome para o seu link de pagamento</h3>
              <div className="grid-3">
                <Field label="Nome" required>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Isso é um placeholder" />
                </Field>
                <Field label="Descrição">
                  <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Isso é um placeholder" />
                </Field>
                <Field label="Tipo de link">
                  <Select value={type} onChange={(e) => setType(e.target.value as LinkType)}>
                    <option value="unico">Único</option>
                    <option value="reutilizavel">Reutilizável</option>
                  </Select>
                </Field>
              </div>
            </article>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3>Adicionar itens ao link</h3>
              {items.map((item, index) => (
                <div className="item-card" key={item.id}>
                  <Field label="Nome" required>
                    <Input value={item.name} onChange={(e) => patchItem(item.id, { name: e.target.value })} />
                  </Field>
                  <Field label="Descrição">
                    <Input value={item.description} onChange={(e) => patchItem(item.id, { description: e.target.value })} />
                  </Field>
                  <Field label="Preço unitário" required>
                    <Input
                      type="number"
                      min={0}
                      value={item.unitPrice || ''}
                      onChange={(e) => patchItem(item.id, { unitPrice: Number(e.target.value) })}
                      placeholder="3000"
                    />
                  </Field>
                  <Field label="Quantidade" required>
                    <Input type="number" min={1} value={item.quantity} onChange={(e) => patchItem(item.id, { quantity: Number(e.target.value) })} />
                  </Field>
                  {index > 0 ? (
                    <button className="btn btn-primary" type="button" onClick={() => setItems(items.filter((row) => row.id !== item.id))} aria-label="Remover item">
                      🗑
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
              <Button variant="secondary" type="button" onClick={() => setItems([...items, newItem()])}>
                Adicionar novo item
              </Button>
            </article>
            <article className="card">
              <h3>Total</h3>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', color: '#405466' }}>
                  <span>
                    {item.quantity}x {formatBRL(item.unitPrice)}
                  </span>
                  <span>{formatBRL(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #d6dbde', paddingTop: 12, fontWeight: 700 }}>
                <span>Total:</span>
                <span>{formatBRL(total)}</span>
              </div>
            </article>
          </>
        ) : (
          <>
            <article className="card" style={{ marginBottom: 16 }}>
              <h3>Métodos de pagamento aceitos</h3>
              <label className="toggle">
                <input type="checkbox" checked={credit} onChange={(e) => setCredit(e.target.checked)} />
                Cartão de crédito
              </label>
              {credit ? (
                <div className="nested">
                  <Field label="Número de parcelas">
                    <Select value={installments} onChange={(e) => setInstallments(e.target.value)}>
                      {['1x', '2x', '3x', '6x', '12x'].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </Select>
                  </Field>
                </div>
              ) : null}
              <label className="toggle">
                <input type="checkbox" checked={pix} onChange={(e) => setPix(e.target.checked)} />
                Pix
              </label>
              {pix ? (
                <div className="nested grid-2">
                  <Field label="Validade">
                    <Input value={pixDays} onChange={(e) => setPixDays(e.target.value)} />
                  </Field>
                  <Field label="Unidade">
                    <Select defaultValue="Dias">
                      <option>Dias</option>
                      <option>Horas</option>
                    </Select>
                  </Field>
                </div>
              ) : null}
              <label className="toggle">
                <input type="checkbox" checked={boleto} onChange={(e) => setBoleto(e.target.checked)} />
                Boleto bancário
              </label>
              {boleto ? (
                <div className="nested" style={{ display: 'grid', gap: 12 }}>
                  <Field label="Vencimento">
                    <Input type="date" value={boletoDue} onChange={(e) => setBoletoDue(e.target.value)} />
                  </Field>
                  <Field label="Juros">
                    <Select value={interest} onChange={(e) => setInterest(e.target.value)}>
                      <option>Sem juros</option>
                      <option>1% ao mês</option>
                    </Select>
                  </Field>
                  <Field label="Multa">
                    <Select value={fine} onChange={(e) => setFine(e.target.value)}>
                      <option>Sem multa</option>
                      <option>2%</option>
                    </Select>
                  </Field>
                </div>
              ) : null}
            </article>
            <article className="card">
              <h3>Vencimento do link</h3>
              <Field label="Data">
                <Input type="date" value={dueAt} disabled={noDue} onChange={(e) => setDueAt(e.target.value)} />
              </Field>
              <label className="toggle" style={{ marginTop: 12 }}>
                <input type="checkbox" checked={noDue} onChange={(e) => setNoDue(e.target.checked)} />
                Não tem vencimento
              </label>
            </article>
          </>
        )}
      </div>

      {confirmOpen ? (
        <Modal title="Deseja revisitar as configurações do seu link?" onClose={() => setConfirmOpen(false)}>
          <p>
            Ao salvar sem ajustes as configurações irão no modelo padrão onde todos os métodos de pagamentos estão ativos,
            sem parcelas, sem juros, sem multa e com vencimento do link e do boleto no período de um mês.
          </p>
          <div className="form-actions">
            <Button variant="secondary" type="button" onClick={publish}>
              Criar link de pagamento
            </Button>
            <Button
              type="button"
              onClick={() => {
                setConfirmOpen(false)
                setTab('config')
              }}
            >
              Configurar link
            </Button>
          </div>
        </Modal>
      ) : null}

      {shareOpen && created ? (
        <Modal title="Use seu link em suas estratégias" onClose={() => navigate(`/links/${created.id}`)}>
          <p>Sua cobrança foi criada</p>
          <div className="share-url">
            <input className="control" readOnly value={created.url} />
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                void navigator.clipboard?.writeText(created.url)
                notify('Link copiado')
              }}
            >
              Copiar
            </Button>
          </div>
          <button
            className="share-row"
            type="button"
            onClick={() => {
              window.open(`mailto:?subject=${encodeURIComponent(created.name)}&body=${encodeURIComponent(created.url)}`)
            }}
          >
            <div>
              <strong>E-mail</strong>
              <div style={{ fontSize: 12, color: '#405466' }}>Encaminhar por email</div>
            </div>
            ✈️
          </button>
          <button
            className="share-row"
            type="button"
            onClick={() => {
              window.open(`https://wa.me/?text=${encodeURIComponent(`${created.name} ${created.url}`)}`)
            }}
          >
            <div>
              <strong>WhatsApp</strong>
              <div style={{ fontSize: 12, color: '#405466' }}>Encaminhar por whatsapp</div>
            </div>
            ✈️
          </button>
          <div className="form-actions">
            <Button type="button" onClick={() => navigate(`/links/${created.id}`)}>
              Ver link criado
            </Button>
          </div>
        </Modal>
      ) : null}
    </AppShell>
  )
}
