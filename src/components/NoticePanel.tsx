import { useState } from 'react'
import { Bell, BellOff, Siren } from 'lucide-react'
import Panel from './Panel'
import { noticeItems, noticeTabs, type NoticeItem, type NoticeType } from '../data/notices'
import { useUi } from '../ui/UiProvider'
import './NoticePanel.css'

const typeLabel: Record<NoticeType, string> = {
  alert: '告警通知',
  remind: '提醒通知',
  inspect: '巡检通知',
  workorder: '工单通知'
}

export default function NoticePanel() {
  const [tab, setTab] = useState<NoticeType>('alert')
  const [items, setItems] = useState<NoticeItem[]>(noticeItems)
  const { openDetail, notify } = useUi()

  const list = items.filter((i) => i.type === tab)
  const unread = items.filter((i) => i.type === 'alert' && i.unread).length

  const open = (n: NoticeItem) => {
    openDetail({
      title: n.title,
      subtitle: `接收时间：${n.time}`,
      tag: typeLabel[n.type],
      body: n.content,
      meta: [
        { label: '通知类型', value: typeLabel[n.type] },
        { label: '接收时间', value: n.time },
        { label: '处理状态', value: n.unread ? '未读' : '已读' },
        { label: '推送渠道', value: '平台消息 / 移动端' }
      ],
      actionLabel: n.unread ? '标记已读' : undefined,
      onAction: () => {
        setItems((prev) => prev.map((it) => (it.id === n.id ? { ...it, unread: false } : it)))
        notify('该通知已标记为已读')
      }
    })
  }

  return (
    <Panel title="我的通知" watermark={Bell} className="notice-panel">
      <div className="tabs">
        {noticeTabs.map((t) => (
          <button
            key={t.id}
            className={`tabs__item${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.dot && <i className="tabs__dot" />}
            {t.id === 'alert' && unread > 0 && <i className="badge-num">{unread}</i>}
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
            onClick={() => open(n)}
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
