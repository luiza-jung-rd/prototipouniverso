import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'icon' | 'neutral' }) {
  return (
    <button className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="field">
      <span className="field-label">
        {label}
        {required ? <span className="required"> *</span> : null}
      </span>
      {children}
      {hint ? <span className="hint">{hint}</span> : null}
    </div>
  )
}

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`control ${className}`.trim()} {...props} />
}

export function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={className ?? 'control'} {...props}>
      {children}
    </select>
  )
}

export function Tooltip({
  text,
  placement = 'top',
  children,
}: {
  text: string
  placement?: 'top' | 'right'
  children: ReactNode
}) {
  return (
    <span className={`tg-tooltip-anchor tg-tooltip-anchor--${placement}`}>
      {children}
      <span className="tg-tooltip" role="tooltip">
        {text}
      </span>
    </span>
  )
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: () => void
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export function TrashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 6h12M8 6V4h4v2M7 6v9h6V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
