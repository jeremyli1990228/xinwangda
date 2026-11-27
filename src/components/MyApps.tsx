import { useMemo, useState } from 'react'
import { Settings2, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import Panel from './Panel'
import AppsConfig from './AppsConfig'
import { iconMap } from './iconMap'
import { appCategories, screenModeC, type AppGroup, type AppItem, type AppPage } from '../data/apps'
import { useUi } from '../ui/UiProvider'
import './MyApps.css'

type Selection = Record<string, string[]>

const buildDefaultSelection = (): Selection => {
  const map: Selection = {}
  appCategories.forEach((c) => {
    map[c.id] = c.pages.flatMap((p) => p.groups.flatMap((g) => g.apps.map((a) => a.id)))
  })
  // 运营大屏 C 端参考模式的应用单独归档，默认全部可用
  map.screen = [...(map.screen ?? []), ...screenModeC.flatMap((g) => g.apps.map((a) => a.id))]
  return map
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((id) => b.includes(id))

function AppButton({ app, compact, roomy }: { app: AppItem; compact?: boolean; roomy?: boolean }) {
  const { notify } = useUi()
  const Icon = iconMap[app.icon] ?? LayoutGrid
  const icoSize = compact ? 19 : roomy ? 34 : 25
  const flatSize = compact ? 24 : roomy ? 40 : 30
  return (
    <button className="app-item" title={app.name} onClick={() => notify(`正在打开「${app.name}」…`)}>
      {app.flat ? (
        <span className="app-item__flat">
          <Icon size={flatSize} strokeWidth={1.7} />
        </span>
      ) : (
        <span className={`app-item__ico ico-${app.tone ?? 'blue'}`}>
          <Icon size={icoSize} strokeWidth={1.9} />
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

  // 应用数较少的分组放大图标与间距，避免卡片大面积留白
  const roomy = useArea && !group.compact && group.apps.length <= 3

  return (
    <div className={`app-group${group.compact ? ' is-compact' : ''}${roomy ? ' is-roomy' : ''}`} style={style}>
      <span className={`app-group__label tone-${group.tone}`}>{group.title}</span>
      <div
        className="app-group__grid"
        style={{ gridTemplateColumns: `repeat(${group.cols}, minmax(0, 1fr))` }}
      >
        {group.apps.map((app) => (
          <AppButton key={app.id} app={app} compact={group.compact} roomy={roomy} />
        ))}
      </div>
    </div>
  )
}

export default function MyApps() {
  const [catId, setCatId] = useState('biz')
  const [mode, setMode] = useState<'b' | 'c'>('b')
  const [page, setPage] = useState(0)
  const [configOpen, setConfigOpen] = useState(false)
  const [defaults] = useState<Selection>(buildDefaultSelection)
  const [selection, setSelection] = useState<Selection>(buildDefaultSelection)
  const { notify } = useUi()

  const category = appCategories.find((c) => c.id === catId) ?? appCategories[1]

  // 是否已通过「添加应用」调整过勾选
  const custom = useMemo(
    () => appCategories.some((c) => !sameSet(selection[c.id] ?? [], defaults[c.id] ?? [])),
    [selection, defaults]
  )

  const pages = useMemo<AppPage[]>(() => {
    const picked = selection[category.id] ?? []
    const keepApps = (g: AppGroup) => ({ ...g, apps: g.apps.filter((a) => picked.includes(a.id)) })

    // 运营大屏：B 端管理模式与 C 端参考模式各自独立成页，避免混排
    if (category.id === 'screen') {
      if (mode === 'b') {
        return category.pages
          .map((p) => ({ ...p, groups: p.groups.map(keepApps).filter((g) => g.apps.length > 0) }))
          .filter((p) => p.groups.length > 0)
      }
      const groups = screenModeC.map(keepApps).filter((g) => g.apps.length > 0)
      return groups.length > 0 ? [{ id: 'screen-c', layout: 'grid', groups }] : []
    }

    if (!custom) return category.pages
    const base = category.pages.flatMap((p) => p.groups)
    const groups = base.map(keepApps).filter((g) => g.apps.length > 0)

    // 按 6 个框一页重新分页，超过 6 个才出现左右翻页
    const out: AppPage[] = []
    for (let i = 0; i < groups.length; i += 6) {
      out.push({ id: `${category.id}-custom-${i / 6}`, layout: 'grid', groups: groups.slice(i, i + 6) })
    }
    return out
  }, [category, custom, selection, mode])

  const total = pages.length
  const current = Math.min(page, Math.max(total - 1, 0))

  const go = (dir: -1 | 1) => {
    setPage((p) => Math.min(total - 1, Math.max(0, p + dir)))
  }

  return (
    <Panel
      title="我的应用"
      watermark={LayoutGrid}
      className="apps-panel"
      extra={
        <button className="apps-add" title="管理我的应用" onClick={() => setConfigOpen(true)}>
          <Settings2 size={14} strokeWidth={1.9} />
          <span>管理</span>
        </button>
      }
    >
      {category.id === 'screen' && (
        <div className="apps-mode">
          <div className="mode-switch" role="group" aria-label="运营大屏模式">
            <button
              className={`mode-switch__item${mode === 'b' ? ' is-active' : ''}`}
              onClick={() => {
                setMode('b')
                setPage(0)
              }}
            >
              B端管理模式
            </button>
            <button
              className={`mode-switch__item${mode === 'c' ? ' is-active' : ''}`}
              onClick={() => {
                setMode('c')
                setPage(0)
              }}
            >
              C端参考模式
            </button>
          </div>
        </div>
      )}
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
          {total === 0 ? (
            <div className="apps-empty">暂未选择应用，点击右上角「+」添加</div>
          ) : (
            <div className="apps-viewport">
              <div className="apps-track" style={{ transform: `translateX(-${current * 100}%)` }}>
                {pages.map((p) => (
                  <div
                    className={`apps-page apps-page--${p.layout}${
                      p.groups.length > 1 && p.groups.length <= 3 ? ' is-single-row' : ''
                    }`}
                    key={p.id}
                  >
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
          )}

          {total > 1 && (
            <>
              <button
                className="stage-arrow stage-arrow--prev"
                disabled={current === 0}
                onClick={() => go(-1)}
                aria-label="上一页"
              >
                <ChevronLeft size={52} strokeWidth={3} />
              </button>
              <button
                className="stage-arrow stage-arrow--next"
                disabled={current === total - 1}
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
              className={`apps-dot${i === current ? ' is-active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`第 ${i + 1} 页`}
            />
          ))}
        </div>
      )}

      {configOpen && (
        <AppsConfig
          selection={selection}
          onClose={() => setConfigOpen(false)}
          onConfirm={(next) => {
            setSelection(next)
            setConfigOpen(false)
            setPage(0)
            notify('应用配置已更新，已同步至首页')
          }}
        />
      )}
    </Panel>
  )
}
