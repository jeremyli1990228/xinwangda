import { useState } from 'react'
import { useData } from '../../ui/DataStore'
import { useUi } from '../../ui/UiProvider'
import PageShell, { FieldGrid } from './PageShell'

export default function TodoDetailPage({ id }: { id: string }) {
  const { todos, removeTodo } = useData()
  const { closeView, notify } = useUi()
  const [pass, setPass] = useState(true)
  const [comment, setComment] = useState('')

  const todo = todos.find((t) => t.id === id)
  if (!todo || todo.type === 'workorder') return null

  if (todo.type === 'audit') {
    return (
      <PageShell
        title="违规整改验收"
        onBack={closeView}
        footer={
          <>
            <button className="btn-cancel" onClick={closeView}>
              取消
            </button>
            <button
              className="btn-submit"
              onClick={() => {
                removeTodo(todo.id)
                notify('审核意见已提交，该待办已完成')
                closeView()
              }}
            >
              提交
            </button>
          </>
        }
      >
        <section className="page-section">
          <h2 className="page-section__title">宿舍信息</h2>
          <FieldGrid
            rows={[
              { label: '楼栋', value: '135B-11-07-测试栋宿舍楼' },
              { label: '宿舍类型', value: '男宿舍' },
              { label: '在住人数', value: '-1人' },
              { label: '违规原因', value: todo.title },
              { label: '最后整改时间', value: '2025-06-25 15:46:25' }
            ]}
          />
        </section>

        <section className="page-section">
          <h2 className="page-section__title">违规整改信息</h2>
          <div className="audit-block">
            <div className="audit-line">
              <em>整改说明:</em>
              {todo.desc}
            </div>
            <div className="audit-thumb">这里有图片</div>
            <div className="audit-time">提交时间: 2025-06-25 15:46:25</div>
          </div>
        </section>

        <section className="page-section">
          <h2 className="page-section__title">验收</h2>
          <div className="audit-row">
            <span className="audit-row__label">是否通过:</span>
            <label className="audit-radio">
              <input type="radio" name="audit-pass" checked={pass} onChange={() => setPass(true)} />
              通过
            </label>
            <label className="audit-radio">
              <input type="radio" name="audit-pass" checked={!pass} onChange={() => setPass(false)} />
              不通过
            </label>
          </div>
          <div className="audit-row">
            <span className="audit-row__label">提交:</span>
            <textarea
              className="audit-textarea"
              placeholder="请输入评价"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </section>
      </PageShell>
    )
  }

  const isAlert = todo.type === 'alert'

  return (
    <PageShell title={isAlert ? '告警待办详情' : '待办详情'} onBack={closeView}>
      <section className="page-section">
        <h2 className="page-section__title">基本信息</h2>
        <FieldGrid
          rows={
            isAlert
              ? [
                  { label: '消息类别', value: todo.title },
                  { label: '所属业务分类', value: '智慧消防' },
                  { label: '发生位置', value: '石龙仔园区 A3 栋配电房' },
                  { label: '提醒时间', value: `${todo.timeLabel} ${todo.time}` },
                  { label: '消息推送方式', value: '企业微信' },
                  { label: '推送对象', value: '陈杰、园区管理员' },
                  { label: '管理部门', value: '园区运营部' },
                  { label: '责任人', value: '陈杰' },
                  { label: '是否要求处置回执', value: '是' },
                  { label: '当前是否回执', value: todo.status === '待回执' ? '未回执' : '已回执' },
                  { label: '处置时限', value: todo.limit },
                  { label: '超时通知人', value: '李成峰' },
                  { label: '详细提醒内容', value: todo.desc, full: true }
                ]
              : [
                  { label: '待办编号', value: todo.id.toUpperCase() },
                  { label: '待办类型', value: '待我审核' },
                  { label: '待办等级', value: todo.level },
                  { label: '来源系统', value: '智慧园区综合管理平台' },
                  { label: '发生位置', value: '石龙仔园区' },
                  { label: todo.timeLabel, value: todo.time },
                  { label: '当前状态', value: todo.status },
                  { label: '处置时限', value: todo.limit },
                  { label: '责任人', value: '陈杰' },
                  { label: '待办描述', value: todo.desc, full: true }
                ]
          }
        />
      </section>

      {isAlert && (
        <section className="page-section">
          <h2 className="page-section__title">告警处理回执</h2>
          <FieldGrid
            rows={[
              { label: '回执人', value: '陈杰' },
              { label: '回执时间', value: '—' },
              { label: '处理回执', value: '', full: true, tall: true },
              { label: '上传附件', value: '暂无数据', full: true }
            ]}
          />
        </section>
      )}
    </PageShell>
  )
}
