import { useId, useState } from 'react'

function UploadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="19" stroke="#B2BCC1" strokeWidth="1.5" />
      <path
        d="M20 26V14M20 14l-5 5M20 14l5 5"
        stroke="#6B7785"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="19" stroke="#1AA251" strokeWidth="1.5" />
      <path d="M13 20.5l4.5 4.5L27 15" stroke="#1AA251" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Dropfile({
  label,
  value,
  accept = '.pdf,.jpg,.jpeg,.png',
  onPick,
}: {
  label?: string
  value: string
  accept?: string
  onPick: (name: string) => void
}) {
  const id = useId()
  const [dragging, setDragging] = useState(false)

  function take(file?: File) {
    if (!file) return
    onPick(file.name)
  }

  return (
    <div className="dropfile-field">
      {label ? (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <label
        htmlFor={id}
        className={`dropfile${dragging ? ' is-dragging' : ''}${value ? ' has-file' : ''}`}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          take(event.dataTransfer.files[0])
        }}
      >
        <input
          id={id}
          className="sr-only"
          type="file"
          accept={accept}
          onChange={(event) => {
            take(event.target.files?.[0])
            event.currentTarget.value = ''
          }}
        />
        {value ? <SuccessIcon /> : <UploadIcon />}
        <p>
          Arraste e solte seu arquivo aqui ou <span className="dropfile-link">clique aqui para selecionar</span>
        </p>
        <small>Formatos aceitos: .pdf ou .jpg</small>
        {value ? <span className="file-chip">{value}</span> : null}
      </label>
    </div>
  )
}
