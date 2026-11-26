export type TodoType = 'alert' | 'workorder' | 'audit'

export interface TodoItem {
  id: string
  type: TodoType
  level: '紧急' | '重要' | '普通'
  title: string
  status: string
  timeLabel: string
  time: string
  limit: string
  remainSeconds?: number
  desc: string
}

export const todoTabs: { id: 'all' | TodoType; label: string; count: number }[] = [
  { id: 'all', label: '全部待办', count: 12 },
  { id: 'alert', label: '告警待办', count: 5 },
  { id: 'workorder', label: '工单待办', count: 5 },
  { id: 'audit', label: '待我审核', count: 5 }
]

export const todoItems: TodoItem[] = [
  {
    id: 'td1',
    type: 'alert',
    level: '紧急',
    title: '考勤机设备离线/运行故障告警',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '1小时30分',
    remainSeconds: 1210,
    desc: '考勤机设备已离线 12 分钟，影响 A 栋员工正常打卡，请现场确认设备供电与网络连接状态。'
  },
  {
    id: 'td2',
    type: 'alert',
    level: '紧急',
    title: '考勤机设备离线/运行故障告警',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '1小时30分',
    remainSeconds: 1210,
    desc: '考勤机设备已离线 12 分钟，影响 B 栋员工正常打卡，请现场确认设备供电与网络连接状态。'
  },
  {
    id: 'td3',
    type: 'workorder',
    level: '普通',
    title: '「宿舍卫生工单」垃圾随意对方',
    status: '待处理',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '4小时',
    remainSeconds: 11520,
    desc: 'C2 栋宿舍楼道存在垃圾随意堆放情况，请宿管人员安排清理并回复处理结果。'
  },
  {
    id: 'td4',
    type: 'alert',
    level: '紧急',
    title: '消防主机通讯中断告警',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '1小时',
    remainSeconds: 860,
    desc: '消防主机与监控中心通讯中断，请立即排查线路并确认消防系统运行状态。'
  },
  {
    id: 'td5',
    type: 'alert',
    level: '重要',
    title: '配电房温度超限告警',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '2小时',
    remainSeconds: 3400,
    desc: '配电房环境温度达到 42℃，已超过预警阈值，请检查空调与通风设备运行情况。'
  },
  {
    id: 'td6',
    type: 'alert',
    level: '重要',
    title: '电梯运行异常告警',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '1小时',
    remainSeconds: 1500,
    desc: '2 号厂房客梯检测到异常震动，已自动停运，请联系维保单位到场检修。'
  },
  {
    id: 'td7',
    type: 'alert',
    level: '普通',
    title: '污水站液位偏高提醒',
    status: '待回执',
    timeLabel: '告警时间',
    time: '2017-01-06',
    limit: '3小时',
    remainSeconds: 7200,
    desc: '污水站调节池液位达到 85%，请安排抽排并核查进水流量。'
  },
  {
    id: 'td8',
    type: 'workorder',
    level: '重要',
    title: '「照明故障工单」B1 车间灯具不亮',
    status: '待处理',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '4小时',
    remainSeconds: 9600,
    desc: 'B1 车间东侧 6 盏工矿灯不亮，影响夜间作业，请更换灯具并复测照度。'
  },
  {
    id: 'td9',
    type: 'workorder',
    level: '普通',
    title: '「空调保养工单」会议室滤网清洗',
    status: '待处理',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '8小时',
    remainSeconds: 21000,
    desc: '3 楼大会议室空调出风量下降，请安排滤网清洗及冷凝器检查。'
  },
  {
    id: 'td10',
    type: 'workorder',
    level: '紧急',
    title: '「漏水抢修工单」C 栋卫生间管道渗漏',
    status: '处理中',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '1小时',
    remainSeconds: 540,
    desc: 'C 栋 2 楼卫生间主管道渗漏，已关闭区域阀门，请立即组织抢修。'
  },
  {
    id: 'td11',
    type: 'workorder',
    level: '普通',
    title: '「绿化养护工单」中心广场修剪',
    status: '待处理',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '12小时',
    remainSeconds: 32000,
    desc: '中心广场灌木生长过密，请安排绿化班组修剪并清运枝叶。'
  },
  {
    id: 'td12',
    type: 'workorder',
    level: '重要',
    title: '「门禁维修工单」A 栋闸机无法识别',
    status: '待处理',
    timeLabel: '派单时间',
    time: '2017-01-06',
    limit: '2小时',
    remainSeconds: 4200,
    desc: 'A 栋一层 3 号闸机刷卡无响应，请检查读头与控制器通讯。'
  },
  {
    id: 'td13',
    type: 'audit',
    level: '重要',
    title: '「动火作业申请」B2 厂房焊接施工',
    status: '待审核',
    timeLabel: '提交时间',
    time: '2017-01-06',
    limit: '24小时',
    remainSeconds: 60000,
    desc: '施工方提交 B2 厂房管道焊接动火申请，需安全部审核作业票及现场防护措施。'
  },
  {
    id: 'td14',
    type: 'audit',
    level: '普通',
    title: '「访客预约审批」供应商入园',
    status: '待审核',
    timeLabel: '提交时间',
    time: '2017-01-06',
    limit: '8小时',
    remainSeconds: 18000,
    desc: '供应商 3 人预约 3 月 7 日入园进行设备调试，请审批并确认接待人。'
  },
  {
    id: 'td15',
    type: 'audit',
    level: '紧急',
    title: '「应急演练方案」消防疏散演练',
    status: '待审核',
    timeLabel: '提交时间',
    time: '2017-01-06',
    limit: '12小时',
    remainSeconds: 26000,
    desc: '安全部提交第二季度消防疏散演练方案，请审核演练时间与人员组织安排。'
  },
  {
    id: 'td16',
    type: 'audit',
    level: '普通',
    title: '「能耗异常复核」注塑车间用电',
    status: '待审核',
    timeLabel: '提交时间',
    time: '2017-01-06',
    limit: '24小时',
    remainSeconds: 70000,
    desc: '系统检测到注塑车间用电量较基线上升 18%，请复核是否存在设备空转。'
  },
  {
    id: 'td17',
    type: 'audit',
    level: '重要',
    title: '「供应商准入」保洁服务续签',
    status: '待审核',
    timeLabel: '提交时间',
    time: '2017-01-06',
    limit: '48小时',
    remainSeconds: 90000,
    desc: '保洁服务供应商合同即将到期，请审核续签资料与服务评价结果。'
  }
]

export const todoStats = [
  { id: 'alert', label: '告警待办', total: 6, done: 2 },
  { id: 'workorder', label: '工单待办', total: 8, done: 3 },
  { id: 'audit', label: '审核待办', total: 4, done: 1 }
]
