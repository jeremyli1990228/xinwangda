import { useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import Panel from './Panel'
import { iconMap } from './iconMap'
import { appCategories, type AppGroup, type AppItem } from '../data/apps'
import { useUi } from '../ui/UiProvider'
import './MyApps.css'

function AppButton({ app, compact }: { app: AppItem; compact?: boolean }) {
  const { notify } = useUi()
  const Icon = iconMap[app.icon] ?? LayoutGrid
  return (
    <button className="app-item" title={app.name} onClick={() => notify(`正在打开「${app.name}」…`)}>
      {app.flat ? (
        <span className="app-item__flat">
          <Icon size={compact ? 24 : 30} strokeWidth={1.7} />
        </span>
      ) : (
        <span className={`app-item__ico ico-${app.tone ?? 'blue'}`}>
          <Icon size={compact ? 19 : 25} strokeWidth={1.9} />
        </span>
      )}
      <span className="app-item__name">{app.name}</span>
    </button>
  )
}

function GroupCard({ group, useArea }: { group: AppGroup; useArea: boolean }) {
  const style = useArea && group.area
    ? {
        left: `${group.area.x}%`,
        top: `${group.area.y}%`,
        width: `${group.area.w}%`,
        height: `${group.area.h}%`
      }
    : undefined

  return (
    <div className={`app-group${group.compact ? ' is-compact' : ''}`} style={style}>
      <span className={`app-group__label tone-${group.tone}`}>{group.title}</span>
      <div
        className="app-group__grid"
        style={{ gridTemplateColumns: `repeat(${group.cols}, minmax(0, 1fr))` }}
      >
        {group.apps.map((app) => (
          <AppButton key={app.id} app={app} compact={group.compact} />
        ))}
      </div>
    </div>
  )
}

export default function MyApps() {
  const [catId, setCatId] = useState('biz')
  const [page, setPage] = useState(0)

  const category = appCategories.find((c) => c.id === catId) ?? appCategories[1]
  const pages = category.pages
  const total = pages.length

  const go = (dir: -1 | 1) => {
    setPage((p) => Math.min(total - 1, Math.max(0, p + dir)))
  }

  return (
    <Panel title="我的应用" watermark={LayoutGrid} className="apps-panel">
      <div className="apps-body">
        <div className="cat-tabs">
          {appCategories.map((c) => (
            <button
              key={c.id}
              className={`cat-tab${c.id === catId ? ' is-active' : ''}`}
              onClick={() => {
                setCatId(c.id)
                setPage(0)
              }}
            >
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <div className="apps-stage">
          <div className="apps-viewport">
            <div className="apps-track" style={{ transform: `translateX(-${page * 100}%)` }}>
              {pages.map((p) => (
                <div className={`apps-page apps-page--${p.layout}`} key={p.id}>
                  {p.layout === 'mosaic' ? (
                    <div className="apps-mosaic">
                      {p.groups.map((g) => (
                        <GroupCard key={g.id} group={g} useArea />
                      ))}
                    </div>
                  ) : (
                    p.groups.map((g) => <GroupCard key={g.id} group={g} useArea={false} />)
                  )}
                </div>
              ))}
            </div>
          </div>

          {total > 1 && (
            <>
              <button
                className="stage-arrow stage-arrow--prev"
                disabled={page === 0}
                onClick={() => go(-1)}
                aria-label="上一页"
              >
                <ChevronLeft size={52} strokeWidth={3} />
              </button>
              <button
                className="stage-arrow stage-arrow--next"
                disabled={page === total - 1}
                onClick={() => go(1)}
                aria-label="下一页"
              >
                <ChevronRight size={52} strokeWidth={3} />
              </button>
            </>
          )}
        </div>
      </div>

      {total > 1 && (
        <div className="apps-dots">
          {pages.map((p, i) => (
            <button
              key={p.id}
              className={`apps-dot${i === page ? ' is-active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`第 ${i + 1} 页`}
            />
          ))}
        </div>
      )}
    </Panel>
  )
}
