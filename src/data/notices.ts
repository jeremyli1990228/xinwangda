export type NoticeType = 'alert' | 'remind' | 'inspect' | 'workorder'

export interface NoticeItem {
  id: string
  type: NoticeType
  title: string
  content: string
  time: string
  unread: boolean
}

export const noticeTabs: { id: NoticeType; label: string }[] = [
  { id: 'alert', label: '告警通知' },
  { id: 'remind', label: '提醒通知' },
  { id: 'inspect', label: '巡检通知' },
  { id: 'workorder', label: '工单通知' }
]

const foodText = '员工XXXX，上班时间提前进入食堂就餐，请提醒他遵守公司制度！上班时间提前进入食堂就餐，请提醒他遵守公司制度！'

export const noticeItems: NoticeItem[] = [
  { id: 'nt1', type: 'alert', title: '食堂提前消费提醒', content: foodText, time: '2023.03.06 15:26', unread: true },
  { id: 'nt2', type: 'alert', title: '食堂提前消费提醒', content: foodText, time: '2023.03.06 15:23', unread: true },
  { id: 'nt3', type: 'alert', title: '宿舍用电异常告警', content: 'A3 栋 502 宿舍电流持续超过阈值 15 分钟，已自动推送至宿管中心，请及时核实处理。', time: '2023.03.06 14:51', unread: true },
  { id: 'nt4', type: 'alert', title: '消防通道占用告警', content: 'B2 厂房东侧消防通道检测到车辆长时间停放，存在安全隐患，请通知安保现场处置。', time: '2023.03.06 13:40', unread: true },
  { id: 'nt5', type: 'alert', title: '充电桩设备离线告警', content: '停车场 P3 区 07 号充电桩通讯中断超过 10 分钟，请运维人员现场排查。', time: '2023.03.06 11:08', unread: true },
  { id: 'nt6', type: 'remind', title: '园区停水通知', content: '因市政管网改造，3 月 8 日 22:00 至 3 月 9 日 06:00 全园区停水，请各部门提前做好储水准备。', time: '2023.03.06 10:20', unread: true },
  { id: 'nt7', type: 'remind', title: '月度能耗账单已生成', content: '2 月园区综合能耗账单已生成，请前往「能耗管理」查看明细并完成复核。', time: '2023.03.05 17:30', unread: false },
  { id: 'nt8', type: 'inspect', title: '本周巡检任务待执行', content: '本周含 3 个必检点位未完成：配电房、危化品仓、污水处理站，请于周五 18:00 前完成。', time: '2023.03.06 09:00', unread: true },
  { id: 'nt9', type: 'inspect', title: '巡检异常已复核', content: '您提交的「A 栋消防栓压力不足」巡检异常已由安全部复核通过，已生成整改工单。', time: '2023.03.05 15:12', unread: false },
  { id: 'nt10', type: 'workorder', title: '工单已指派给您', content: '工单「空压机房噪音超标整改」已指派给您，处置时限 4 小时，请及时处理。', time: '2023.03.06 14:05', unread: true },
  { id: 'nt11', type: 'workorder', title: '工单超时预警', content: '工单「B1 车间照明故障」距处置时限不足 30 分钟，请尽快回执处理结果。', time: '2023.03.06 12:48', unread: true }
]
