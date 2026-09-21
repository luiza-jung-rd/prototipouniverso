import { NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import totvsLogo from '../assets/totvs-logo.svg'
import avatar from '../assets/avatar.png'
import iconHome from '../assets/icon-home.svg'
import iconHomeMuted from '../assets/icon-home-muted.svg'
import iconSearch from '../assets/icon-search-nav.svg'
import iconBell from '../assets/icon-bell-nav.svg'
import iconGear from '../assets/icon-gear-nav.svg'
import { useStore } from '../context/Store'

function LinksIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={active ? '#00DBFF' : 'white'} strokeWidth="1.8" />
      <path d="M7 10h10M7 14h6" stroke={active ? '#00DBFF' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { toast } = useStore()
  const onLinks = location.pathname.startsWith('/links')
  const onHome = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/credenciamento')

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={totvsLogo} alt="TOTVS" width={139} height={40} />
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
      <aside className="sidebar">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `nav-item${isActive || (onHome && !onLinks) ? ' active' : ''}`}
          aria-label="Início"
        >
          <img src={onHome && !onLinks ? iconHome : iconHomeMuted} alt="" />
        </NavLink>
        <NavLink to="/links" className={({ isActive }) => `nav-item${isActive || onLinks ? ' active' : ''}`} aria-label="Links de pagamento">
          <LinksIcon active={onLinks} />
        </NavLink>
      </aside>
      <main className="workspace">{children}</main>
      {toast ? <div className="toast">{toast}</div> : null}
    </div>
  )
}
