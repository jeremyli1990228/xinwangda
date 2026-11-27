import { useEffect, useRef, useState } from 'react'
import { ChevronDown, House, Sparkles } from 'lucide-react'
import { useUi } from '../ui/UiProvider'
import './TopBar.css'

const navs = [
  { id: 'screen', label: '运营大屏' },
  { id: 'biz', label: '业务中心' },
  { id: 'iot', label: '物联中心' },
  { id: 'data', label: '数据资产中心' }
]

const parks = ['总部智慧园区', '石龙仔园区', '龙华园区', '惠州博罗园区', '南京溧水园区']

export default function TopBar() {
  const { notify, toggleVersion } = useUi()
  const [active, setActive] = useState('biz')
  const [park, setPark] = useState(parks[0])
  const [menu, setMenu] = useState<null | 'park' | 'user'>(null)
  const barRef = useRef<HTMLElement>(null)

  // 演示用：Ctrl+Shift+V 与顶部小圆点均可切换 V1.0 / V2.0
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v') toggleVersion()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleVersion])

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

      <button className="ver-switch" onClick={toggleVersion} aria-label="切换视觉版本" tabIndex={-1}>
        <Sparkles size={9} strokeWidth={2.4} />
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
        <div className="park-wrap">
          <span className="park-select__label">当前园区：</span>
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
        </div>

        <span className="tb-date">2026年11月27日</span>
        <span className="tb-week">星期五</span>
        <span className="tb-lunar">农历十九</span>

        <div className="user" onClick={() => setMenu(menu === 'user' ? null : 'user')}>
          <span className="avatar">管</span>
          <span className="user__name">管理员</span>
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
