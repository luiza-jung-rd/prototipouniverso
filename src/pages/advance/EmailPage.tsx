import { Link } from 'react-router-dom'
import '../../advance/advance.css'
import { emailBody } from '../../advance/model'
import { useAdvance } from '../../advance/store'
import { FlowNav } from './FlowNav'

export function EmailPage() {
  const { link } = useAdvance()
  const url = link?.url ?? 'https://link.malga.io/8e93099f-182a-4a00-affb-7e0d3f28c705'
  const body = emailBody(url)
  const [before, after] = body.split(url)

  return (
    <div className="advance-root">
      <div className="mail-page">
        <article className="mail-sheet">
          <div className="mail-subject">
            <h1>Link adiantamento Prop/Reserva 23</h1>
            <span className="mail-chip">Caixa de entrada</span>
          </div>
          <div className="mail-meta">
            <span className="mail-avatar">U</span>
            <div>
              <strong>Usuário mestre</strong>
              <small>para mim</small>
            </div>
            <span className="mail-time">12:51 (há 0 minuto)</span>
          </div>
          <p className="mail-body">
            {before}
            <Link to="/checkout">{url}</Link>
            {after}
          </p>
        </article>
      </div>
      <FlowNav />
    </div>
  )
}
