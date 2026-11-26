import { Clock, Newspaper, ChevronRight } from 'lucide-react'
import Panel from './Panel'
import { newsData } from '../data/news'
import { useUi } from '../ui/UiProvider'
import './NewsBoard.css'

export default function NewsBoard() {
  const { openDetail, notify } = useUi()
  const { featured, list } = newsData

  const openFeatured = () => {
    openDetail({
      title: featured.title,
      subtitle: `发布时间：${featured.time}`,
      body: featured.summary,
      actionLabel: '查看全文',
      onAction: () => notify('正在打开资讯详情…')
    })
  }

  return (
    <Panel
      title="动态信息"
      watermark={Newspaper}
      className="news-panel"
      extra={
        <>
          <span className="news-new">NEW</span>
          <button className="news-more" onClick={() => notify('正在跳转资讯列表…')}>
            更多
          </button>
        </>
      }
    >
      <div className="news-body">
        <article className="news-feature" onClick={openFeatured}>
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
          {list.map((n) => (
            <button
              className="news-item"
              key={n.id}
              onClick={() =>
                openDetail({
                  title: n.title,
                  subtitle: `发布时间：${n.month.slice(0, 4)}.${n.month.slice(5)}.${n.day}`,
                  body: n.summary,
                  actionLabel: '查看全文',
                  onAction: () => notify('正在打开资讯详情…')
                })
              }
            >
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
    </Panel>
  )
}
