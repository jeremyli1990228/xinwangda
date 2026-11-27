import { useState } from 'react'
import { useData } from '../../ui/DataStore'
import { useUi } from '../../ui/UiProvider'
import PageShell from './PageShell'
import { noticeTabs, type NoticeType } from '../../data/notices'

export default function NoticeListPage() {
  const { notices } = useData()
  const { navigate, closeView } = useUi()
  const [tab, setTab] = useState<NoticeType>('alert')

  const counts = noticeTabs.reduce<Record<NoticeType, number>>(
    (acc, t) => {
      acc[t.id] = notices.filter((n) => n.type === t.id).length
      return acc
    },
    { alert: 0, remind: 0, inspect: 0, workorder: 0 }
  )
  const list = notices.filter((n) => n.type === tab)

  return (
    <PageShell title="我的通知" onBack={closeView}>
      <div className="page-tabs">
        {noticeTabs.map((t) => (
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
        {list.length === 0 && <div className="page-empty">暂无通知</div>}
        {list.map((n) => (
          <button
            className="page-row"
            key={n.id}
            onClick={() => navigate({ name: 'noticeDetail', id: n.id })}
          >
            <span className="page-row__main">
              <span className="page-row__title">
                {n.unread && <i className="page-row__dot" />}
                {n.title}
              </span>
              <span className="page-row__desc">{n.content}</span>
            </span>
            <span className="page-row__time">{n.time}</span>
          </button>
        ))}
      </div>
    </PageShell>
  )
}
