import { useState } from 'react'
import { useData } from '../../ui/DataStore'
import { useUi, type TodoTabId } from '../../ui/UiProvider'
import PageShell from './PageShell'
import { todoTabs } from '../../data/todos'

export default function TodoListPage({ initialTab }: { initialTab: TodoTabId }) {
  const { todos } = useData()
  const { navigate, closeView, notify } = useUi()
  const [tab, setTab] = useState<TodoTabId>(initialTab)

  const counts: Record<TodoTabId, number> = {
    all: todos.length,
    alert: todos.filter((t) => t.type === 'alert').length,
    workorder: todos.filter((t) => t.type === 'workorder').length,
    audit: todos.filter((t) => t.type === 'audit').length
  }
  const list = tab === 'all' ? todos : todos.filter((t) => t.type === tab)

  const open = (id: string, type: string) => {
    if (type === 'workorder') {
      notify('工单待办详情暂未开放')
      return
    }
    navigate({ name: 'todoDetail', id })
  }

  return (
    <PageShell title="我的待办" onBack={closeView}>
      <div className="page-tabs">
        {todoTabs.map((t) => (
          <button
            key={t.id}
            className={`page-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="page-tab__count">({counts[t.id]})</span>
          </button>
        ))}
      </div>

      <div className="page-list">
        {list.length === 0 && <div className="page-empty">暂无待办事项</div>}
        {list.map((t) => (
          <button className="page-row" key={t.id} onClick={() => open(t.id, t.type)}>
            <span className="page-row__main">
              <span className="page-row__title">
                <em
                  className={`pill ${
                    t.level === '紧急' ? 'pill--red' : t.level === '重要' ? 'pill--warn' : 'pill--gray'
                  }`}
                >
                  {t.level}
                </em>
                {t.title}
                <i className="pill pill--blue">{t.status}</i>
              </span>
              <span className="page-row__meta">
                <span>
                  {t.timeLabel} {t.time}
                </span>
                <span>处置时限 {t.limit}</span>
              </span>
            </span>
            <span className="page-row__time">查看详情</span>
          </button>
        ))}
      </div>
    </PageShell>
  )
}
