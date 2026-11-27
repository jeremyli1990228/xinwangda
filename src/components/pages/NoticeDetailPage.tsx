import { useEffect } from 'react'
import { useData } from '../../ui/DataStore'
import { useUi } from '../../ui/UiProvider'
import PageShell, { FieldGrid, type FieldRow } from './PageShell'
import type { NoticeItem, NoticeType } from '../../data/notices'

const typeLabel: Record<NoticeType, string> = {
  alert: '告警通知',
  remind: '提醒通知',
  inspect: '巡检通知',
  workorder: '工单通知'
}

const buildRows = (n: NoticeItem): FieldRow[] => {
  switch (n.type) {
    case 'alert':
      return [
        { label: '消息类别', value: n.title },
        { label: '所属业务分类', value: '智慧消防' },
        { label: '发生位置', value: '石龙仔园区 A3 栋配电房' },
        { label: '提醒时间', value: n.time },
        { label: '消息推送方式', value: '企业微信' },
        { label: '推送对象', value: '陈杰、园区管理员' },
        { label: '管理部门', value: '园区运营部' },
        { label: '责任人', value: '陈杰' },
        { label: '是否要求处置回执', value: '是' },
        { label: '当前是否回执', value: n.unread ? '未回执' : '已回执' },
        { label: '处置时限', value: '2023-03-06 16:26' },
        { label: '超时通知人', value: '李成峰' },
        { label: '详细提醒内容', value: n.content, full: true }
      ]
    case 'remind':
      return [
        { label: '消息类别', value: n.title },
        { label: '所属业务分类', value: '园区服务' },
        { label: '提醒时间', value: n.time },
        { label: '消息推送方式', value: '平台消息 / 企业微信' },
        { label: '推送对象', value: '全体员工' },
        { label: '管理部门', value: '行政部' },
        { label: '责任人', value: '王敏' },
        { label: '阅读状态', value: n.unread ? '未读' : '已读' },
        { label: '提醒内容', value: n.content, full: true },
        { label: '备注', value: '请及时关注园区通知，如有疑问请联系行政服务热线 0755-12345678。', full: true }
      ]
    case 'inspect':
      return [
        { label: '巡检任务', value: n.title },
        { label: '所属业务分类', value: '智慧安防' },
        { label: '巡检点位', value: 'A 栋消防栓 / 配电房 / 危化品仓' },
        { label: '计划时间', value: n.time },
        { label: '巡检人', value: '陈杰' },
        { label: '复核部门', value: '安全部' },
        { label: '巡检结果', value: '待执行' },
        { label: '异常等级', value: '一般' },
        { label: '巡检内容', value: n.content, full: true }
      ]
    default:
      return [
        { label: '工单编号', value: 'GD202303060018' },
        { label: '工单标题', value: n.title },
        { label: '所属业务分类', value: '设备运维' },
        { label: '提报时间', value: n.time },
        { label: '提报人', value: '张伟' },
        { label: '受理人', value: '陈杰' },
        { label: '当前状态', value: '处理中' },
        { label: '要求完成时间', value: '2023-03-06 18:00' },
        { label: '工单描述', value: n.content, full: true }
      ]
  }
}

export default function NoticeDetailPage({ id }: { id: string }) {
  const { notices, markNoticeRead } = useData()
  const { closeView } = useUi()
  const notice = notices.find((n) => n.id === id)

  useEffect(() => {
    markNoticeRead(id)
  }, [id, markNoticeRead])

  if (!notice) return null

  return (
    <PageShell title={`${typeLabel[notice.type]}详情`} onBack={closeView}>
      <section className="page-section">
        <h2 className="page-section__title">基本信息</h2>
        <FieldGrid rows={buildRows(notice)} />
      </section>

      {notice.type === 'alert' && (
        <>
          <section className="page-section">
            <h2 className="page-section__title">其他联动设备信息</h2>
            <div className="empty-box">暂无数据</div>
          </section>
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
        </>
      )}
    </PageShell>
  )
}
