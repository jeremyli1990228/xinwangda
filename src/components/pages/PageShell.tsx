import type { ReactNode } from 'react'
import './pages.css'

export interface FieldRow {
  label: string
  value?: string
  full?: boolean
  tall?: boolean
}

export function FieldGrid({ rows }: { rows: FieldRow[] }) {
  return (
    <div className="field-grid">
      {rows.map((r, i) => (
        <div
          className={`field${r.full ? ' field--full' : ''}${r.tall ? ' field--tall' : ''}`}
          key={`${r.label}-${i}`}
        >
          <span className="field__label">{r.label}</span>
          <span className="field__value">{r.value || '—'}</span>
        </div>
      ))}
    </div>
  )
}

interface PageShellProps {
  title: string
  onBack: () => void
  children: ReactNode
  footer?: ReactNode
}

export default function PageShell({ title, onBack, children, footer }: PageShellProps) {
  return (
    <div className="page-view">
      <div className="page-view__bar" />
      <div className="page-view__sheet">
        <header className="page-head">
          <h1>{title}</h1>
          <button className="page-back" onClick={onBack}>
            返回
          </button>
        </header>
        {children}
        {footer && <div className="page-foot">{footer}</div>}
      </div>
    </div>
  )
}
