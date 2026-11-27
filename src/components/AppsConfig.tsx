import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, Plus, X } from 'lucide-react'
import { appCategories, screenModeC, type AppGroup } from '../data/apps'
import './AppsConfig.css'

type Selection = Record<string, string[]>

const tabs = [
  { id: 'screen', label: '运营大屏' },
  { id: 'biz', label: '业务中心' },
  { id: 'iot', label: '物联中心' },
  { id: 'data', label: '数据资产中心' }
]

interface Props {
  selection: Selection
  onClose: () => void
  onConfirm: (next: Selection) => void
}

export default function AppsConfig({ selection, onClose, onConfirm }: Props) {
  const [tab, setTab] = useState('screen')
  const [mode, setMode] = useState<'b' | 'c'>('b')
  const [draft, setDraft] = useState<Selection>(() =>
    Object.fromEntries(Object.entries(selection).map(([k, v]) => [k, [...v]]))
  )

  const category = appCategories.find((c) => c.id === tab)
  const groups: AppGroup[] =
    tab === 'screen' && mode === 'c'
      ? screenModeC
      : (category?.pages.flatMap((p) => p.groups) ?? [])

  const isOn = (id: string) => (draft[tab] ?? []).includes(id)

  const toggle = (id: string) => {
    setDraft((prev) => {
      const list = prev[tab] ?? []
      return {
        ...prev,
        [tab]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
      }
    })
  }

  return createPortal(
    <div className="dialog-mask" onClick={onClose}>
      <div className="apps-config" onClick={(e) => e.stopPropagation()}>
        <header className="apps-config__head">
          <h3>添加应用</h3>
          <button className="dialog__close" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </header>

        <div className="apps-config__tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`apps-config__tab${tab === t.id ? ' is-active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'screen' && (
          <div className="apps-config__mode">
            <span>应用端:</span>
            <button className={mode === 'b' ? 'is-active' : ''} onClick={() => setMode('b')}>
              B端管理模式
            </button>
            <button className={mode === 'c' ? 'is-active' : ''} onClick={() => setMode('c')}>
              C端参考模式
            </button>
          </div>
        )}

        <div className="apps-config__cols">
          {groups.length === 0 && <div className="apps-config__empty">暂无可配置应用</div>}
          {groups.map((g) => (
            <div className="apps-col" key={g.id}>
              <div className="apps-col__head">{g.title}</div>
              <div className="apps-col__body">
                {g.apps.map((a) => {
                  const on = isOn(a.id)
                  return (
                    <button
                      key={a.id}
                      className={`apps-opt${on ? ' is-on' : ''}`}
                      onClick={() => toggle(a.id)}
                    >
                      <span>{a.name}</span>
                      <i className="apps-opt__circle">
                        {on ? <Check size={10} strokeWidth={3} /> : <Plus size={10} strokeWidth={2.6} />}
                      </i>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <footer className="apps-config__foot">
          <button className="apps-config__cancel" onClick={onClose}>
            取消
          </button>
          <button className="apps-config__confirm" onClick={() => onConfirm(draft)}>
            确认
          </button>
        </footer>
      </div>
    </div>,
    document.body
  )
}
