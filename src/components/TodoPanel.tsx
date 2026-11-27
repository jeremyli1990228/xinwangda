import { useEffect, useRef, useState } from 'react'
import { ClipboardCheck } from 'lucide-react'
import Panel from './Panel'
import { todoTabs } from '../data/todos'
import { useData } from '../ui/DataStore'
import { useUi } from '../ui/UiProvider'
import './TodoPanel.css'

const fmt = (sec: number) => {
  if (sec <= 0) return '已超时'
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  return h > 0 ? `${h}小时${m}分` : `${m}分${s}秒`
}

export default function TodoPanel() {
  const [tab, setTab] = useState<'all' | 'alert' | 'workorder' | 'audit'>('all')
  const [, setTick] = useState(0)
  const startRef = useRef(Date.now())
  const { todos } = useData()
  const { navigate, notify } = useUi()

  useEffect(() => {
    const timer = window.setInterval(() => setTick((t) => t + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const elapsed = Math.floor((Date.now() - startRef.current) / 1000)
  const list = tab === 'all' ? todos : todos.filter((i) => i.type === tab)

  const open = (id: string, type: string) => {
    if (type === 'workorder') {
      notify('工单待办详情暂未开放')
      return
    }
    navigate({ name: 'todoDetail', id })
  }

  return (
    <Panel
      title="我的待办"
      watermark={ClipboardCheck}
      className="todo-panel"
      extra={
        <button className="panel-more" onClick={() => navigate({ name: 'todoList', tab: 'all' })}>
          更多
        </button>
      }
    >
      <div className="tabs">
        {todoTabs.map((t) => (
          <button
            key={t.id}
            className={`tabs__item${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="tabs__count">({t.count})</span>
          </button>
        ))}
      </div>

      <div className="todo-list scroll-y">
        {list.length === 0 && <div className="todo-empty">暂无待办事项</div>}
        {list.map((t) => {
          const remain = (t.remainSeconds ?? 0) - elapsed
          return (
            <button className="todo-item" key={t.id} onClick={() => open(t.id, t.type)}>
              <span className="todo-item__row">
                <em className={`pill ${t.level === '紧急' ? 'pill--red' : t.level === '重要' ? 'pill--warn' : 'pill--gray'}`}>
                  {t.level}
                </em>
                <h4>{t.title}</h4>
                <i className="pill pill--blue">{t.status}</i>
              </span>
              <span className="todo-item__meta">
                <span>
                  {t.timeLabel} {t.time}
                </span>
                <span>处置时限 {t.limit}</span>
                <span className={remain > 0 ? 'is-danger' : 'is-over'}>还剩 {fmt(remain)}</span>
              </span>
            </button>
          )
        })}
      </div>
    </Panel>
  )
}
