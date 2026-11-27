import { useState } from 'react'
import { Bell, BellOff, Siren } from 'lucide-react'
import Panel from './Panel'
import { noticeTabs, type NoticeType } from '../data/notices'
import { useData } from '../ui/DataStore'
import { useUi } from '../ui/UiProvider'
import './NoticePanel.css'

export default function NoticePanel() {
  const [tab, setTab] = useState<NoticeType>('alert')
  const { notices } = useData()
  const { navigate } = useUi()

  const list = notices.filter((n) => n.type === tab)
  const counts = noticeTabs.reduce<Record<NoticeType, number>>(
    (acc, t) => {
      acc[t.id] = notices.filter((n) => n.type === t.id).length
      return acc
    },
    { alert: 0, remind: 0, inspect: 0, workorder: 0 }
  )

  return (
    <Panel
      title="我的通知"
      watermark={Bell}
      className="notice-panel"
      extra={
        <button className="panel-more" onClick={() => navigate({ name: 'noticeList' })}>
          更多
        </button>
      }
    >
      <div className="tabs">
        {noticeTabs.map((t) => (
          <button
            key={t.id}
            className={`tabs__item${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            <span className="tabs__count">({counts[t.id]})</span>
          </button>
        ))}
      </div>

      <div className="notice-list scroll-y">
        {list.length === 0 && (
          <div className="notice-empty">
            <BellOff size={26} strokeWidth={1.4} />
            暂无通知
          </div>
        )}
        {list.map((n) => (
          <button
            key={n.id}
            className={`notice-item${n.unread ? '' : ' is-read'}`}
            onClick={() => navigate({ name: 'noticeDetail', id: n.id })}
          >
            <span className="notice-item__ico">
              <Siren size={22} strokeWidth={2} />
            </span>
            <span className="notice-item__main">
              <span className="notice-item__top">
                <h4>{n.title}</h4>
                <em>{n.time}</em>
              </span>
              <p>{n.content}</p>
            </span>
          </button>
        ))}
      </div>
    </Panel>
  )
}
