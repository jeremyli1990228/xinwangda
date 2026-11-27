import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import './ui.css'

export interface DetailPayload {
  title: string
  subtitle?: string
  tag?: string
  body: string
  meta?: { label: string; value: string }[]
  actionLabel?: string
  onAction?: () => void
}

export type TodoTabId = 'all' | 'alert' | 'workorder' | 'audit'

export type VersionId = 'v1' | 'v2'

export type ViewState =
  | { name: 'noticeList' }
  | { name: 'noticeDetail'; id: string }
  | { name: 'todoList'; tab: TodoTabId }
  | { name: 'todoDetail'; id: string }

interface UiApi {
  notify: (msg: string) => void
  openDetail: (detail: DetailPayload) => void
  closeDetail: () => void
  view: ViewState | null
  navigate: (view: ViewState) => void
  closeView: () => void
  version: VersionId
  toggleVersion: () => void
}

const UiContext = createContext<UiApi>({
  notify: () => undefined,
  openDetail: () => undefined,
  closeDetail: () => undefined,
  view: null,
  navigate: () => undefined,
  closeView: () => undefined,
  version: 'v1',
  toggleVersion: () => undefined
})

export const useUi = () => useContext(UiContext)

export function UiProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; msg: string } | null>(null)
  const [detail, setDetail] = useState<DetailPayload | null>(null)
  const [view, setView] = useState<ViewState | null>(null)
  const [version, setVersion] = useState<VersionId>('v1')
  const versionRef = useRef<VersionId>('v1')
  const timer = useRef<number>()

  const notify = useCallback((msg: string) => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), msg })
    timer.current = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const openDetail = useCallback((d: DetailPayload) => setDetail(d), [])
  const closeDetail = useCallback(() => setDetail(null), [])

  const navigate = useCallback((next: ViewState) => {
    setDetail(null)
    setView(next)
  }, [])
  const closeView = useCallback(() => setView(null), [])

  // 演示用版本切换：V1.0 标准版 / V2.0 结构版（仅前端呈现不同，逻辑完全共用）
  const toggleVersion = useCallback(() => {
    const next: VersionId = versionRef.current === 'v1' ? 'v2' : 'v1'
    versionRef.current = next
    setVersion(next)
    notify(next === 'v2' ? '已切换到 V2.0 方案版本' : '已切回 V1.0 标准版本')
  }, [notify])

  useEffect(() => {
    document.documentElement.dataset.ver = version
  }, [version])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetail(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <UiContext.Provider
      value={{ notify, openDetail, closeDetail, view, navigate, closeView, version, toggleVersion }}
    >
      {children}

      {toast && (
        <div className="toast" key={toast.id}>
          <span className="toast__dot" />
          {toast.msg}
        </div>
      )}

      {detail && (
        <div className="dialog-mask" onClick={closeDetail}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <header className="dialog__head">
              <h3>{detail.title}</h3>
              <button className="dialog__close" onClick={closeDetail} aria-label="关闭">
                <X size={18} />
              </button>
            </header>
            <div className="dialog__body">
              {detail.subtitle && (
                <div className="dialog__sub">
                  {detail.tag && <em className="dialog__tag">{detail.tag}</em>}
                  <span>{detail.subtitle}</span>
                </div>
              )}
              <p className="dialog__text">{detail.body}</p>
              {detail.meta && (
                <dl className="dialog__meta">
                  {detail.meta.map((m) => (
                    <div key={m.label}>
                      <dt>{m.label}</dt>
                      <dd>{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <footer className="dialog__foot">
              <button className="btn btn--ghost" onClick={closeDetail}>
                关闭
              </button>
              {detail.actionLabel && (
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    detail.onAction?.()
                    setDetail(null)
                  }}
                >
                  {detail.actionLabel}
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </UiContext.Provider>
  )
}
