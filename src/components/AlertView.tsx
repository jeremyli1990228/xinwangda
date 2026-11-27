import { useState } from 'react'
import { Calendar, ChevronDown, ChevronRight, Search, X } from 'lucide-react'
import { useUi } from '../ui/UiProvider'
import './AlertView.css'

const cats = ['智慧运营', '智慧办公', '智慧服务', '数智安全', '绿色低碳', '智慧通行', '人脸识别']

const fields: [string, 'input' | 'select'][] = [
  ['告警编号', 'input'],
  ['设备编码', 'input'],
  ['告警信息', 'input'],
  ['告警设备名称', 'input'],
  ['所在区域', 'input'],
  ['告警类型', 'select'],
  ['告警级别', 'select'],
  ['推送人员', 'select'],
  ['推送方式', 'select'],
  ['告警消息查阅状态', 'select'],
  ['是否回执', 'select'],
  ['是否回执超时', 'select']
]

const columns = ['序号', '告警编号', '告警设备编号', '告警设备名称', '告警类型', '告警级别', '告警消息', '推送人员', '责任人', '管理部门']

const row = ['1', 'slzyq031', '-', '-', '-', '离线告警', '各硬件系统服务离线告警', '欣旺达智慧园区', '管理员,耿华', '安全部门']

export default function AlertView({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { notify } = useUi()
  const [cat, setCat] = useState('智慧运营')
  const [keyword, setKeyword] = useState('')
  const [form, setForm] = useState<Record<string, string>>({})
  const [collapsed, setCollapsed] = useState(false)

  if (!open) return null

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div className="alert-view" onClick={onClose}>
      <div className="alert-view__panel" onClick={(e) => e.stopPropagation()}>
        <header className="alert-view__head">
          <h3>预警信息查看</h3>
          <button className="alert-view__close" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </header>

        <div className="alert-view__body">
          <aside className="alert-aside">
            <div className="alert-aside__search">
              <input
                placeholder="请输入关键字进行搜索"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && notify(`已搜索「${keyword || '全部'}」相关预警`)}
              />
              <Search size={13} onClick={() => notify(`已搜索「${keyword || '全部'}」相关预警`)} />
            </div>
            <ul className="alert-aside__list">
              {cats.map((c) => (
                <li
                  key={c}
                  className={`alert-aside__item${cat === c ? ' is-active' : ''}`}
                  onClick={() => setCat(c)}
                >
                  <ChevronRight size={12} className="alert-aside__caret" />
                  {c}
                </li>
              ))}
            </ul>
          </aside>

          <section className="alert-main">
            <div className="alert-form">
              {fields.map(([label, type]) => (
                <div className="alert-field" key={label}>
                  <label>{label}</label>
                  {type === 'input' ? (
                    <input
                      className="alert-ctl"
                      placeholder="请输入"
                      value={form[label] ?? ''}
                      onChange={(e) => set(label, e.target.value)}
                    />
                  ) : (
                    <button className="alert-ctl alert-ctl--select">
                      <span>{form[label] || '请选择'}</span>
                      <ChevronDown size={13} />
                    </button>
                  )}
                </div>
              ))}

              {!collapsed && (
                <>
                  <div className="alert-field alert-field--time">
                    <label>告警时间</label>
                    <button className="alert-ctl alert-ctl--select">
                      <span>请选择</span>
                      <Calendar size={13} />
                    </button>
                    <span className="alert-field__arrow">→</span>
                    <button className="alert-ctl alert-ctl--select">
                      <span>请选择</span>
                      <Calendar size={13} />
                    </button>
                  </div>
                  <div className="alert-actions">
                    <button
                      className="alert-btn"
                      onClick={() => {
                        setForm({})
                        notify('已重置查询条件')
                      }}
                    >
                      重置
                    </button>
                    <button className="alert-btn is-primary" onClick={() => notify(`已按条件查询「${cat}」预警信息`)}>
                      查询
                    </button>
                    <button className="alert-btn" onClick={() => setCollapsed(true)}>
                      收起
                    </button>
                  </div>
                </>
              )}

              {collapsed && (
                <div className="alert-actions alert-actions--full">
                  <button
                    className="alert-btn"
                    onClick={() => {
                      setForm({})
                      notify('已重置查询条件')
                    }}
                  >
                    重置
                  </button>
                  <button className="alert-btn is-primary" onClick={() => notify(`已按条件查询「${cat}」预警信息`)}>
                    查询
                  </button>
                  <button className="alert-btn" onClick={() => setCollapsed(false)}>
                    展开
                  </button>
                </div>
              )}
            </div>

            <div className="alert-summary">
              <i className="alert-summary__dot" />
              <span>
                告警消息：待回执 <b>1</b> 个 ｜ 未查阅 <b>0</b> 个
              </span>
              <div className="alert-summary__ops">
                <button className="alert-btn" onClick={() => notify('预警信息已导出')}>
                  导出
                </button>
                <button className="alert-btn is-green" onClick={() => notify('正在打开告警数据分析…')}>
                  告警数据分析
                </button>
              </div>
            </div>

            <div className="alert-table-wrap">
              <table className="alert-table">
                <thead>
                  <tr>
                    {columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {row.map((c, i) => (
                      <td key={i}>{c}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="alert-pager">
              <span>第 1-1 条 / 总共 1 条</span>
              <button className="alert-pager__btn">‹</button>
              <button className="alert-pager__btn is-active">1</button>
              <button className="alert-pager__btn">›</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
