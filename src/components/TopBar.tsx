import { useEffect, useRef, useState } from 'react'
import { Bell, ChevronDown, CloudSun, House, MapPin, Volume2 } from 'lucide-react'
import { useUi } from '../ui/UiProvider'
import './TopBar.css'

const navs = [
  { id: 'screen', label: '运营大屏' },
  { id: 'biz', label: '业务中心' },
  { id: 'iot', label: '物联中心' },
  { id: 'data', label: '数据资产中心' }
]

const parks = ['石龙仔园区', '龙华园区', '惠州博罗园区', '南京溧水园区']

const messageList = [
  { id: 'm1', title: '食堂提前消费提醒', time: '15:26' },
  { id: 'm2', title: '考勤机设备离线告警', time: '14:51' },
  { id: 'm3', title: '工单「照明故障」已指派给您', time: '14:05' }
]

export default function TopBar() {
  const { notify, openDetail } = useUi()
  const [active, setActive] = useState('biz')
  const [park, setPark] = useState(parks[0])
  const [menu, setMenu] = useState<null | 'park' | 'bell' | 'user'>(null)
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setMenu(null)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const switchNav = (id: string) => {
    setActive(id)
    const target = navs.find((n) => n.id === id)
    if (id !== 'biz') notify(`正在加载「${target?.label}」模块…`)
  }

  return (
    <header className="topbar" ref={barRef}>
      <div className="brand">
        <img className="brand__logo" src="logo1.png" alt="SUNWODA 欣旺达" />
        <i className="brand__divide" />
        <h1 className="brand__title">智慧园区综合管理平台</h1>
      </div>

      <button className="home-btn" title="首页" onClick={() => notify('已返回首页')}>
        <House size={19} strokeWidth={2} />
      </button>

      <nav className="nav">
        {navs.map((n) => (
          <button
            key={n.id}
            className={`nav__item${active === n.id ? ' is-active' : ''}`}
            onClick={() => switchNav(n.id)}
          >
            {n.label}
          </button>
        ))}
      </nav>

      <div className="topbar__right">
        <div className="park-select" onClick={() => setMenu(menu === 'park' ? null : 'park')}>
          <span>{park}</span>
          <ChevronDown size={13} />
          {menu === 'park' && (
            <ul className="dropdown">
              {parks.map((p) => (
                <li
                  key={p}
                  className={p === park ? 'is-active' : ''}
                  onClick={(e) => {
                    e.stopPropagation()
                    setPark(p)
                    setMenu(null)
                    notify(`已切换至「${p}」`)
                  }}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <i className="tb-sep" />
        <span className="tb-info">
          <MapPin size={13} />
          深圳
        </span>
        <i className="tb-sep" />
        <span className="tb-info">
          <CloudSun size={18} />
          晴 24~32°C
        </span>
        <i className="tb-sep" />
        <span className="tb-date">2023年7月8日</span>

        <div className="icon-btns">
          <button className="icon-btn" title="语音播报" onClick={() => notify('语音播报已开启')}>
            <Volume2 size={17} />
            <i className="icon-badge">1</i>
          </button>
          <button
            className="icon-btn"
            title="消息通知"
            onClick={() => setMenu(menu === 'bell' ? null : 'bell')}
          >
            <Bell size={17} />
            <i className="icon-badge">2</i>
            {menu === 'bell' && (
              <ul className="dropdown dropdown--msg" onClick={(e) => e.stopPropagation()}>
                <li className="dropdown__head">消息通知</li>
                {messageList.map((m) => (
                  <li
                    key={m.id}
                    onClick={() => {
                      setMenu(null)
                      openDetail({
                        title: m.title,
                        subtitle: `2023.03.06 ${m.time}`,
                        body: '该消息为系统实时推送，点击「查看详情」可跳转至对应业务模块进行处置。',
                        actionLabel: '查看详情',
                        onAction: () => notify('正在打开业务详情…')
                      })
                    }}
                  >
                    <span>{m.title}</span>
                    <em>{m.time}</em>
                  </li>
                ))}
              </ul>
            )}
          </button>
        </div>

        <div className="user" onClick={() => setMenu(menu === 'user' ? null : 'user')}>
          <span className="avatar">陈</span>
          <span className="user__name">陈杰</span>
          <ChevronDown size={13} />
          {menu === 'user' && (
            <ul className="dropdown dropdown--user">
              {['个人中心', '切换园区', '系统设置', '退出登录'].map((t) => (
                <li
                  key={t}
                  onClick={() => {
                    setMenu(null)
                    notify(`已执行：${t}`)
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  )
}
