import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../../advance/advance.css'
import { DEFAULT_AMOUNT, PROPOSAL } from '../../advance/model'
import { useAdvance } from '../../advance/store'
import { formatBRL } from '../../data/mock'
import { FlowNav } from './FlowNav'

const EMPTY_PAYER = {
  name: 'Cristiano',
  email: 'cristiano@totvs.com',
  phone: '(31) 91111-1111',
  documentCountry: 'Brazil',
  documentType: 'CPF',
  document: '111.111.111-11',
  country: 'Brazil',
  postal: '32146-015',
  street: 'Alameda das Garças',
  number: '300',
  extra: '',
  neighborhood: 'Cabral',
  city: 'Contagem',
  state: 'Minas Gerais',
}

export function CheckoutPage() {
  const { link, markPaid } = useAdvance()
  const [params, setParams] = useSearchParams()
  const etapa = params.get('etapa')
  const [payer, setPayer] = useState(EMPTY_PAYER)
  const [method, setMethod] = useState<'card' | 'pix'>('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '', installments: '1' })
  const [paying, setPaying] = useState(false)
  const amount = link?.amount ?? DEFAULT_AMOUNT
  const paid = link?.status === 'paid' || etapa === 'confirmado'
  const cancelled = link?.status === 'cancelled'

  const installments = useMemo(() => {
    return [1, 2, 3, 6].map((count) => ({
      count,
      label: `${count}x of ${formatBRL(amount / count)}`,
    }))
  }, [amount])

  function patch<K extends keyof typeof payer>(key: K, value: (typeof payer)[K]) {
    setPayer((current) => ({ ...current, [key]: value }))
  }

  function pay() {
    setPaying(true)
    window.setTimeout(() => {
      markPaid()
      setPaying(false)
      setParams({ etapa: 'confirmado' })
    }, 700)
  }

  if (cancelled) {
    return (
      <div className="advance-root checkout-root">
        <div className="ck-blocked">
          <section className="ck-blocked-card">
            <div className="ck-mark warn">!</div>
            <h1>Link indisponível</h1>
            <p>Este link de pagamento foi cancelado e a cobrança não aceita mais pagamento.</p>
            <Link className="ck-pay" to="/proposta" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              Voltar para a proposta
            </Link>
          </section>
        </div>
        <FlowNav />
      </div>
    )
  }

  if (paid) {
    return (
      <div className="advance-root checkout-root">
        <div className="ck-done">
          <section className="ck-done-card">
            <div className="ck-mark">✓</div>
            <h1>Pagamento confirmado</h1>
            <p>Adiantamento · Proposta/Reserva {PROPOSAL.number}</p>
            <p>{PROPOSAL.enterprise}</p>
            <strong style={{ fontSize: 28 }}>{formatBRL(amount)}</strong>
            <Link className="ck-pay" to="/proposta" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none', marginTop: 18 }}>
              Voltar para a proposta
            </Link>
          </section>
        </div>
        <FlowNav />
      </div>
    )
  }

  const showPayment = etapa === 'pagamento'
  const phoneOk = payer.phone.replace(/\D/g, '').length >= 10

  return (
    <div className="advance-root checkout-root">
      <div className="checkout">
        <section>
          {showPayment ? (
            <>
              <div className="ck-title-row">
                <h1>Identification</h1>
                <button className="ck-edit" type="button" onClick={() => setParams({})}>
                  Edit
                </button>
              </div>
              <div className="ck-summary">
                <span>{payer.name}</span>
                <span>
                  {payer.street}, {payer.number}
                </span>
                <span>{payer.email}</span>
                <span>{payer.neighborhood}</span>
                <span>{payer.phone}</span>
                <span>
                  {payer.city}, {payer.state === 'Minas Gerais' ? 'MG' : payer.state}
                </span>
                <span>{payer.document}</span>
                <span>{payer.postal}</span>
              </div>
              <h2>Payment</h2>
              <div className="ck-method">
                <button className="ck-method-head" type="button" onClick={() => setMethod('card')}>
                  <span className={`ck-dot${method === 'card' ? ' on' : ''}`} />
                  <CardIcon /> Credit Card
                </button>
                {method === 'card' ? (
                  <div className="fields">
                    <label className="ck-label">
                      <span>Card Number</span>
                      <input
                        className="ck-input"
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                        value={card.number}
                        onChange={(event) =>
                          setCard({
                            ...card,
                            number: event.target.value
                              .replace(/\D/g, '')
                              .slice(0, 16)
                              .replace(/(\d{4})(?=\d)/g, '$1 ')
                              .trim(),
                          })
                        }
                      />
                    </label>
                    <div className="ck-grid">
                      <label className="ck-label">
                        <span>Expiration Date</span>
                        <input className="ck-input" placeholder="MM/YY" value={card.expiry} onChange={(event) => setCard({ ...card, expiry: event.target.value })} />
                      </label>
                      <label className="ck-label">
                        <span>CVV</span>
                        <input
                          className="ck-input"
                          placeholder="3 digits"
                          value={card.cvv}
                          onChange={(event) => setCard({ ...card, cvv: event.target.value.replace(/\D/g, '').slice(0, 4) })}
                        />
                      </label>
                    </div>
                    <div className="ck-grid">
                      <label className="ck-label">
                        <span>Cardholder name</span>
                        <input className="ck-input" placeholder="Cardholder name" value={card.name} onChange={(event) => setCard({ ...card, name: event.target.value })} />
                      </label>
                      <label className="ck-label">
                        <span>Installments</span>
                        <select className="ck-select" value={card.installments} onChange={(event) => setCard({ ...card, installments: event.target.value })}>
                          {installments.map((item) => (
                            <option key={item.count} value={String(item.count)}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="ck-method">
                <button className="ck-method-head" type="button" onClick={() => setMethod('pix')}>
                  <span className={`ck-dot${method === 'pix' ? ' on' : ''}`} />
                  <PixIcon /> Pix
                </button>
                {method === 'pix' ? <p className="ck-pix-note">O QR Code do Pix aparece depois da confirmação.</p> : null}
              </div>
              <button className="ck-pay" type="button" disabled={paying} onClick={pay}>
                {paying ? 'Processando...' : `Pay ${formatBRL(amount)}`}
              </button>
            </>
          ) : (
            <>
              <h1>Identification</h1>
              <h2>Personal details</h2>
              <label className="ck-label">
                <span>Full Name</span>
                <input className="ck-input" value={payer.name} onChange={(event) => patch('name', event.target.value)} />
              </label>
              <div className="ck-grid">
                <label className="ck-label">
                  <span>Email</span>
                  <input className="ck-input" value={payer.email} onChange={(event) => patch('email', event.target.value)} />
                </label>
                <label className="ck-label">
                  <span>Phone number</span>
                  <span className="ck-phone">
                    <input className="ck-input" value={payer.phone} onChange={(event) => patch('phone', event.target.value)} />
                    {phoneOk ? <span className="ck-ok">✓</span> : null}
                  </span>
                </label>
              </div>
              <h2>Document</h2>
              <div className="ck-grid">
                <label className="ck-label">
                  <span>Document Country</span>
                  <select className="ck-select" value={payer.documentCountry} onChange={(event) => patch('documentCountry', event.target.value)}>
                    <option>Brazil</option>
                  </select>
                </label>
                <label className="ck-label">
                  <span>Document Type</span>
                  <select className="ck-select" value={payer.documentType} onChange={(event) => patch('documentType', event.target.value)}>
                    <option>CPF</option>
                    <option>CNPJ</option>
                  </select>
                </label>
              </div>
              <label className="ck-label">
                <span>Document number</span>
                <input className="ck-input" value={payer.document} onChange={(event) => patch('document', event.target.value)} />
              </label>
              <h2>Address</h2>
              <div className="ck-grid">
                <label className="ck-label">
                  <span>Address Country</span>
                  <select className="ck-select" value={payer.country} onChange={(event) => patch('country', event.target.value)}>
                    <option>Brazil</option>
                  </select>
                </label>
                <label className="ck-label">
                  <span>Postal code (ZIP code)</span>
                  <input className="ck-input" value={payer.postal} onChange={(event) => patch('postal', event.target.value)} />
                </label>
              </div>
              <label className="ck-label">
                <span>Street</span>
                <input className="ck-input" value={payer.street} onChange={(event) => patch('street', event.target.value)} />
              </label>
              <div className="ck-grid">
                <label className="ck-label">
                  <span>Number</span>
                  <input className="ck-input" value={payer.number} onChange={(event) => patch('number', event.target.value)} />
                </label>
                <label className="ck-label">
                  <span>Additional info (optional)</span>
                  <input className="ck-input" placeholder="Apt, Suite, Unit, etc." value={payer.extra} onChange={(event) => patch('extra', event.target.value)} />
                </label>
              </div>
              <label className="ck-label">
                <span>Neighborhood</span>
                <input className="ck-input" value={payer.neighborhood} onChange={(event) => patch('neighborhood', event.target.value)} />
              </label>
              <div className="ck-grid">
                <label className="ck-label">
                  <span>City</span>
                  <input className="ck-input" value={payer.city} onChange={(event) => patch('city', event.target.value)} />
                </label>
                <label className="ck-label">
                  <span>State</span>
                  <select className="ck-select" value={payer.state} onChange={(event) => patch('state', event.target.value)}>
                    <option>Minas Gerais</option>
                    <option>São Paulo</option>
                    <option>Rio de Janeiro</option>
                  </select>
                </label>
              </div>
              <button
                className="ck-next"
                type="button"
                disabled={!payer.name || !payer.email}
                onClick={() => setParams({ etapa: 'pagamento' })}
              >
                Next
              </button>
            </>
          )}
        </section>
        <aside className="ck-order">
          <h2>Order</h2>
          <div className="ck-order-row">
            <div>
              Adiantamento
              <small>Quantity: 1</small>
            </div>
            <span>{formatBRL(amount)}</span>
          </div>
          <div className="ck-total">
            <span>Total</span>
            <span>{formatBRL(amount)}</span>
          </div>
        </aside>
      </div>
      <FlowNav />
    </div>
  )
}

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function PixIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <path d="M8 1.8 10.2 4 8 6.2 5.8 4 8 1.8ZM3.2 6.6 5.4 8.8 3.2 11 1 8.8l2.2-2.2ZM12.8 6.6 15 8.8 12.8 11 10.6 8.8l2.2-2.2ZM8 9.8l2.2 2.2L8 14.2 5.8 12 8 9.8Z" fill="currentColor" />
    </svg>
  )
}
