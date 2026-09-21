import { Link } from 'react-router-dom'
import totvsLogo from '../assets/totvs-logo.svg'
import avatar from '../assets/avatar.png'
import iconSearch from '../assets/icon-search-nav.svg'
import iconBell from '../assets/icon-bell-nav.svg'
import iconGear from '../assets/icon-gear-nav.svg'
import iconPix from '../assets/icon-pix.svg'

export function PaywallPage() {
  return (
    <div className="paywall">
      <header className="topbar">
        <div className="brand">
          <img src={totvsLogo} alt="RD Station" width={139} height={40} />
          <span className="brand-pay">RD Station</span>
        </div>
        <div className="topbar-actions">
          <button className="icon-btn" type="button" aria-label="Buscar">
            <img src={iconSearch} alt="" />
          </button>
          <button className="icon-btn" type="button" aria-label="Notificações">
            <img src={iconBell} alt="" />
            <span className="dot" />
          </button>
          <button className="icon-btn" type="button" aria-label="Configurações">
            <img src={iconGear} alt="" />
          </button>
          <span className="topbar-divider" />
          <button className="account" type="button">
            <span className="avatar">
              <img src={avatar} alt="" />
            </span>
            <span>Agência RD</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="#00DBFF" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <section className="paywall-hero">
        <div>
          <h1>Seus maiores desafios de cobrança, resolvidos!</h1>
          <p>
            A TOTVS Pay integra pagamentos ao seu fluxo de vendas, marketing e atendimento, eliminando
            complexidade. Mais simples, mais rápido e livre de assinaturas!
          </p>
          <Link to="/credenciamento" className="btn btn-secondary">
            Faça sua conta gratuitamente
          </Link>
        </div>
        <div className="hero-art">
          <div className="hero-chart">
            <svg className="spark" viewBox="0 0 400 180" preserveAspectRatio="none">
              <path
                d="M0 140 C 40 130, 70 90, 110 100 S 180 40, 220 70 S 300 20, 400 10"
                fill="none"
                stroke="#0a3a4a"
                strokeWidth="3"
                opacity="0.45"
              />
            </svg>
          </div>
          <div className="float-card float-1">
            <span className="ic">💵</span>
            <div>
              <small>Total em vendas</small>
              <strong>R$ 100.493,99</strong>
            </div>
          </div>
          <div className="float-card float-2">
            <span className="ic">📈</span>
            <div>
              <small>Ticket médio</small>
              <strong>R$ 3690,00</strong>
            </div>
          </div>
          <div className="float-card float-3">
            <span className="ic">
              <img src={iconPix} alt="" width={20} height={18} />
            </span>
            <div>
              <small>No pix</small>
              <strong>R$ 70.000</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="paywall-panel">
        <div className="preview-stack">
          <div className="preview-window">
            <div className="mini-top" />
            <div className="mini-body">
              <div style={{ fontSize: 12, color: '#405466' }}>Cobranças</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Links de Pagamentos</div>
              <div style={{ height: 8, background: '#e6eaed', borderRadius: 8, width: '40%', marginBottom: 10 }} />
              {['Abril – EF – Turma B Noturno', 'Abril – EF – Turma B Matutino', 'Abril – EM – Turma B Noturno'].map(
                (name) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 12, color: '#0077a8', fontWeight: 700 }}>
                    <span>{name}</span>
                    <span style={{ color: '#1aa251' }}>●</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="preview-modal">
            <div style={{ fontSize: 12, color: '#405466' }}>Sua cobrança foi criada</div>
            <h3>Use seu link em suas estratégias</h3>
            <div className="share-url">
              <input className="control" readOnly value="https://totvspay.com" />
            </div>
            <div className="share-row">
              <div>
                <strong>E-mail</strong>
                <div style={{ fontSize: 12, color: '#405466' }}>Encaminhar por email</div>
              </div>
              ✈️
            </div>
            <div className="share-row">
              <div>
                <strong>WhatsApp</strong>
                <div style={{ fontSize: 12, color: '#405466' }}>Encaminhar por whatsapp</div>
              </div>
              ✈️
            </div>
          </div>
        </div>
        <div className="case-copy">
          <p className="case-kicker">Caso de uso</p>
          <h2>Links de pagamento</h2>
          <p>
            Com a TOTVS Pay, crie links de pagamento em segundos e receba suas cobranças via Pix, cartão ou boleto de
            forma rápida e segura.
          </p>
          <ul>
            <li>Pagamentos via Pix, cartão e boleto</li>
            <li>Notificações de pagamento em tempo real</li>
          </ul>
          <Link to="/credenciamento" className="btn btn-primary">
            Começar a usar
          </Link>
        </div>
      </section>
    </div>
  )
}
