import { useEffect, useState } from 'react'
import { PieChart } from 'lucide-react'
import Panel from './Panel'
import { todoStats } from '../data/todos'
import { useUi, type TodoTabId } from '../ui/UiProvider'
import './StatsPanel.css'

const pcts = [30, 31, 35]
const R = 41
const CIRC = 2 * Math.PI * R

function Ring({ value, index }: { value: number; index: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setProgress(value), 120 + index * 140)
    return () => window.clearTimeout(timer)
  }, [value, index])

  return (
    <div className="ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#5fb5ea" strokeWidth="9" />
        <g transform="translate(100,0) scale(-1,1)">
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="#8cc63f"
            strokeWidth="9"
            strokeDasharray={`${CIRC} ${CIRC}`}
            strokeDashoffset={CIRC * (1 - progress / 100)}
            transform="rotate(-90 50 50)"
          />
        </g>
      </svg>
      <div className="ring__text">
        <span>完成率</span>
        <b>{progress}%</b>
      </div>
    </div>
  )
}

export default function StatsPanel() {
  const { navigate } = useUi()

  return (
    <Panel title="今日个人待办事项统计" watermark={PieChart} className="stats-panel">
      <div className="stats-body">
        {todoStats.map((s, i) => (
          <div className="stat-cell" key={s.id}>
            <Ring value={pcts[i]} index={i} />
            <div
              className="stat-cell__nums stat-link"
              title="查看对应待办列表"
              onClick={() => navigate({ name: 'todoList', tab: s.id as TodoTabId })}
            >
              <span>{s.label}</span>
              <b className="is-blue">{s.total}</b>
              <i>已办</i>
              <b className="is-green">{s.done}</b>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
