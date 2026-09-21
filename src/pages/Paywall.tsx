import { Link } from 'react-router-dom'
import totvsLogo from '../assets/totvs-logo.svg'
import avatar from '../assets/avatar.png'
import iconSearch from '../assets/icon-search-nav.svg'
import iconBell from '../assets/icon-bell-nav.svg'
import iconGear from '../assets/icon-gear-nav.svg'
import heroChart from '../assets/paywall-chart.svg'
import iconSales from '../assets/paywall-icon-sales.svg'
import iconTicket from '../assets/paywall-icon-ticket.svg'
import iconPix from '../assets/paywall-icon-pix.svg'
import previewApp from '../assets/paywall-app.png'
import previewModal from '../assets/paywall-modal.png'

export function PaywallPage() {
  return (
    <div className="paywall">
      <header className="topbar">
        <div className="brand">
          <img src={totvsLogo} alt="TOTVS Pay" width={139} height={40} />
          <span className="brand-pay">Pay</span>
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

      <div className="paywall-inner">
      <section className="paywall-hero">
        <div className="hero-copy">
          <h1>Seus maiores desafios de cobrança, resolvidos!</h1>
          <p>
            A TOTVS Pay integra pagamentos ao seu fluxo de vendas, marketing e atendimento, eliminando
            complexidade. Mais simples, mais rápido e livre de assinaturas!
          </p>
          <Link to="/credenciamento" className="btn btn-secondary">
            Faça sua conta gratuitamente
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <img className="hero-chart-img" src={heroChart} alt="" width={485} height={314} />
          <article className="float-card float-sales">
            <span className="ic">
              <img src={iconSales} alt="" width={48} height={48} />
            </span>
            <div>
              <small>Total em vendas</small>
              <strong>R$ 100.493,99</strong>
            </div>
          </article>
          <article className="float-card float-ticket">
            <span className="ic">
              <img src={iconTicket} alt="" width={32} height={32} />
            </span>
            <div>
              <small>Ticket médio</small>
              <strong>R$ 3690,00</strong>
            </div>
          </article>
          <article className="float-card float-pix">
            <span className="ic">
              <img src={iconPix} alt="" width={32} height={32} />
            </span>
            <div>
              <small>No pix</small>
              <strong>R$ 70.000</strong>
            </div>
          </article>
        </div>
      </section>

      <section className="paywall-panel">
        <div className="preview-stack" aria-hidden="true">
          <img className="preview-app" src={previewApp} alt="" width={573} height={355} />
          <img className="preview-modal-img" src={previewModal} alt="" width={492} height={311} />
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
    </div>
  )
}
