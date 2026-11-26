import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Clock, Newspaper, ChevronRight, ChevronLeft, Search, X } from 'lucide-react'
import Panel from './Panel'
import { newsData } from '../data/news'
import './NewsBoard.css'

interface NewsEntry {
  id: string
  title: string
  time: string
  summary: string
  image: string
}

export default function NewsBoard() {
  const { featured, list } = newsData
  const [listOpen, setListOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<NewsEntry | null>(null)

  const entries: NewsEntry[] = [
    { id: 'featured', title: featured.title, time: featured.time, summary: featured.summary, image: featured.image },
    ...list.map((n) => ({
      id: n.id,
      title: n.title,
      time: `${n.month.replace('.', '-')}-${n.day} 09:30`,
      summary: n.summary,
      image: featured.image
    }))
  ]

  const shown = entries.filter((n) => !query || n.title.includes(query) || n.summary.includes(query))

  const runSearch = () => setQuery(keyword.trim())
  const resetSearch = () => {
    setKeyword('')
    setQuery('')
  }

  return (
    <Panel
      title="动态信息"
      watermark={Newspaper}
      className="news-panel"
      extra={
        <>
          <span className="news-new">NEW</span>
          <button className="panel-more" onClick={() => setListOpen(true)}>
            更多
          </button>
        </>
      }
    >
      <div className="news-body">
        <article className="news-feature" onClick={() => setDetail(entries[0])}>
          <img className="news-feature__bg" src={featured.image} alt={featured.title} />
          <span className="news-feature__shade" />
          <div className="news-feature__overlay">
            <span className="news-feature__tag">园区要闻</span>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            <span className="news-feature__time">
              <Clock size={12} />
              {featured.time}
            </span>
          </div>
        </article>

        <div className="news-list">
          {list.map((n, idx) => (
            <button className="news-item" key={n.id} onClick={() => setDetail(entries[idx + 1])}>
              <span className="news-item__date">
                <b>{n.day}</b>
                <i>{n.month}</i>
              </span>
              <span className="news-item__main">
                <h4>{n.title}</h4>
                <p>{n.summary}</p>
              </span>
              <ChevronRight className="news-item__arrow" size={16} />
            </button>
          ))}
        </div>
      </div>

      {listOpen &&
        createPortal(
          <div className="news-list-mask" onClick={() => setListOpen(false)}>
            <section className="news-list-dialog" onClick={(e) => e.stopPropagation()}>
              <header className="news-list-dialog__head">
                <h3>园区资讯动态</h3>
                <button className="news-back" onClick={() => setListOpen(false)}>
                  返回
                </button>
              </header>

              <div className="news-search">
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && runSearch()}
                  placeholder="请输入关键字"
                />
                <button className="news-search__btn" onClick={runSearch}>
                  <Search size={13} />
                  查询
                </button>
                <button className="news-search__reset" onClick={resetSearch}>
                  重置
                </button>
              </div>

              <div className="news-rows">
                {shown.map((n) => (
                  <button className="news-row" key={n.id} onClick={() => setDetail(n)}>
                    <img src={n.image} alt={n.title} />
                    <span className="news-row__main">
                      <b>{n.title}</b>
                      <p>{n.summary}</p>
                    </span>
                    <em>{n.time}</em>
                  </button>
                ))}
                {shown.length === 0 && <div className="news-row__empty">未找到相关资讯</div>}
              </div>

              <footer className="news-pager">
                <button disabled aria-label="上一页">
                  <ChevronLeft size={14} />
                </button>
                <button className="is-active">1</button>
                <button disabled aria-label="下一页">
                  <ChevronRight size={14} />
                </button>
              </footer>
            </section>
          </div>,
          document.body
        )}

      {detail &&
        createPortal(
          <div className="dialog-mask" onClick={() => setDetail(null)}>
            <div className="news-detail" onClick={(e) => e.stopPropagation()}>
              <header className="news-detail__head">
                <h3>详情</h3>
                <button className="dialog__close" onClick={() => setDetail(null)} aria-label="关闭">
                  <X size={18} />
                </button>
              </header>
              <div className="news-detail__body">
                <h2>{detail.title}</h2>
                <p className="news-detail__time">时间：{detail.time}</p>
                <div className="news-detail__content">
                  <p>{detail.summary}</p>
                  <p>
                    近年来，园区持续围绕安全运营、能源低碳、通行服务等场景推进数字化建设，通过统一数据底座与智能分析能力，实现事件快速发现、联动处置与闭环追踪。
                  </p>
                  <p>
                    后续平台将进一步整合物联感知设备与业务系统，完善运营指标体系，为园区管理者提供更及时、更全面的决策依据。
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </Panel>
  )
}
