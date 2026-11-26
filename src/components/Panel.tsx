import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface PanelProps {
  title: string
  extra?: ReactNode
  watermark?: LucideIcon
  className?: string
  children: ReactNode
}

export default function Panel({ title, extra, watermark: Watermark, className = '', children }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-head">
        {Watermark && <Watermark className="panel-head__wm" size={66} strokeWidth={1.3} />}
        <h2 className="panel-title">{title}</h2>
        {extra && <div className="panel-extra">{extra}</div>}
      </header>
      {children}
    </section>
  )
}
