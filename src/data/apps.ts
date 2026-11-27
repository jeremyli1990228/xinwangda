export type GroupTone = 'lime' | 'yellow' | 'blue' | 'orange' | 'green' | 'royal'
export type IconTone = 'blue' | 'orange' | 'teal' | 'mint' | 'green' | 'gold' | 'gray'

export interface AppItem {
  id: string
  name: string
  icon: string
  tone?: IconTone
  flat?: boolean
}

export interface AppGroup {
  id: string
  title: string
  tone: GroupTone
  cols: number
  compact?: boolean
  area?: { x: number; y: number; w: number; h: number }
  apps: AppItem[]
}

export interface AppPage {
  id: string
  layout: 'mosaic' | 'grid'
  groups: AppGroup[]
}

export interface AppCategory {
  id: string
  name: string
  pages: AppPage[]
}

/* 首页核心马赛克布局，百分比坐标严格对齐设计稿 */
const mosaicBiz: AppPage = {
  id: 'biz-1',
  layout: 'mosaic',
  groups: [
    {
      id: 'g-operate',
      title: '智慧运营',
      tone: 'lime',
      cols: 3,
      area: { x: 0, y: 0, w: 32.4, h: 47.9 },
      apps: [
        { id: 'a1', name: '综合管理', icon: 'monitor', tone: 'blue' },
        { id: 'a2', name: '领导驾驶舱', icon: 'chat', tone: 'orange' },
        { id: 'a3', name: '智能工单', icon: 'clipboard', tone: 'teal' },
        { id: 'a4', name: '智能巡检', icon: 'monitorCog', tone: 'mint' },
        { id: 'a5', name: '空间管理', icon: 'chart', tone: 'green' }
      ]
    },
    {
      id: 'g-office',
      title: '智慧办公',
      tone: 'yellow',
      cols: 3,
      area: { x: 34.2, y: 0.4, w: 27.6, h: 47.5 },
      apps: [
        { id: 'b1', name: '考勤机管理', icon: 'landmark', tone: 'gray', flat: true },
        { id: 'b2', name: '环境管理', icon: 'pencil', tone: 'gray', flat: true },
        { id: 'b3', name: '车辆全生命周期管理', icon: 'truck', tone: 'gray', flat: true }
      ]
    },
    {
      id: 'g-service',
      title: '智慧服务',
      tone: 'blue',
      cols: 3,
      area: { x: 63.6, y: 0.4, w: 36.4, h: 47.5 },
      apps: [
        { id: 'c1', name: '智慧食堂', icon: 'utensils', tone: 'blue' },
        { id: 'c2', name: '智慧宿舍', icon: 'bed', tone: 'gold' },
        { id: 'c3', name: '智慧会议室', icon: 'presentation', tone: 'teal' },
        { id: 'c4', name: '多媒体设备管理', icon: 'monitorPlay', tone: 'blue' },
        { id: 'c5', name: '智慧厕所', icon: 'accessible', tone: 'gold' },
        { id: 'c6', name: '智慧充电桩', icon: 'zap', tone: 'teal' }
      ]
    },
    {
      id: 'g-safe',
      title: '数智安全',
      tone: 'orange',
      cols: 3,
      area: { x: 0, y: 50.3, w: 32.4, h: 47.9 },
      apps: [
        { id: 'd1', name: '智慧安防', icon: 'shield', tone: 'blue' },
        { id: 'd2', name: '智慧巡更', icon: 'footprints', tone: 'orange' },
        { id: 'd3', name: '智慧消防', icon: 'flame', tone: 'teal' }
      ]
    },
    {
      id: 'g-lowcarbon',
      title: '绿色低碳',
      tone: 'green',
      cols: 3,
      area: { x: 34.2, y: 50.3, w: 27.6, h: 47.9 },
      apps: [
        { id: 'e1', name: '碳排管理', icon: 'cog', tone: 'gray', flat: true },
        { id: 'e2', name: '智慧环境', icon: 'users', tone: 'gray', flat: true },
        { id: 'e3', name: '能耗', icon: 'leaf', tone: 'gold' }
      ]
    },
    {
      id: 'g-pass',
      title: '智慧通行',
      tone: 'royal',
      cols: 3,
      area: { x: 63.6, y: 50.3, w: 36.4, h: 47.9 },
      apps: [
        { id: 'f1', name: '人员', icon: 'users', tone: 'mint' },
        { id: 'f2', name: '物流', icon: 'truck', tone: 'blue' }
      ]
    }
  ]
}

const bizPage2: AppPage = {
  id: 'biz-2',
  layout: 'grid',
  groups: [
    {
      id: 'g-logistics',
      title: '智慧后勤',
      tone: 'yellow',
      cols: 4,
      apps: [
        { id: 'h1', name: '智慧餐饮', icon: 'utensils', tone: 'blue' },
        { id: 'h2', name: '宿舍管理', icon: 'bed', tone: 'gold' },
        { id: 'h3', name: '工服管理', icon: 'shirt', tone: 'mint' },
        { id: 'h4', name: '班车管理', icon: 'bus', tone: 'orange' }
      ]
    },
    {
      id: 'g-energy',
      title: '智慧能源',
      tone: 'green',
      cols: 4,
      apps: [
        { id: 'i1', name: '能耗监测', icon: 'gauge', tone: 'green' },
        { id: 'i2', name: '光伏管理', icon: 'sun', tone: 'gold' },
        { id: 'i3', name: '储能管理', icon: 'plug', tone: 'teal' },
        { id: 'i4', name: '碳资产管理', icon: 'leaf', tone: 'green' }
      ]
    },
    {
      id: 'g-safety',
      title: '安全生产',
      tone: 'orange',
      cols: 4,
      apps: [
        { id: 'j1', name: '安全巡检', icon: 'shield', tone: 'blue' },
        { id: 'j2', name: '隐患管理', icon: 'siren', tone: 'orange' },
        { id: 'j3', name: '应急预案', icon: 'clipboard', tone: 'teal' },
        { id: 'j4', name: '培训考试', icon: 'users', tone: 'mint' }
      ]
    }
  ]
}

const bizPage3: AppPage = {
  id: 'biz-3',
  layout: 'grid',
  groups: [
    {
      id: 'g-parking',
      title: '智慧停车',
      tone: 'blue',
      cols: 4,
      apps: [
        { id: 'k1', name: '车位管理', icon: 'car', tone: 'blue' },
        { id: 'k2', name: '车辆识别', icon: 'camera', tone: 'mint' },
        { id: 'k3', name: '收费管理', icon: 'card', tone: 'gold' },
        { id: 'k4', name: '停车引导', icon: 'layers', tone: 'teal' }
      ]
    },
    {
      id: 'g-light',
      title: '智慧照明',
      tone: 'lime',
      cols: 4,
      apps: [
        { id: 'l1', name: '照明控制', icon: 'lightbulb', tone: 'gold' },
        { id: 'l2', name: '场景策略', icon: 'sparkles', tone: 'blue' },
        { id: 'l3', name: '故障告警', icon: 'siren', tone: 'orange' }
      ]
    },
    {
      id: 'g-water',
      title: '智慧水务',
      tone: 'royal',
      cols: 4,
      apps: [
        { id: 'm1', name: '用水监测', icon: 'droplets', tone: 'teal' },
        { id: 'm2', name: '管网管理', icon: 'waves', tone: 'blue' },
        { id: 'm3', name: '水质管理', icon: 'gauge', tone: 'mint' }
      ]
    }
  ]
}

const screenPage: AppPage = {
  id: 'screen-1',
  layout: 'grid',
  groups: [
    {
      id: 's1',
      title: '综合态势',
      tone: 'blue',
      cols: 4,
      apps: [
        { id: 'n1', name: '园区总览', icon: 'monitor', tone: 'blue' },
        { id: 'n2', name: '能耗态势', icon: 'chart', tone: 'green' },
        { id: 'n3', name: '安防态势', icon: 'shield', tone: 'blue' },
        { id: 'n4', name: '通行态势', icon: 'footprints', tone: 'orange' }
      ]
    },
    {
      id: 's2',
      title: '运营指标',
      tone: 'green',
      cols: 4,
      apps: [
        { id: 'o1', name: '经营指标', icon: 'gauge', tone: 'mint' },
        { id: 'o2', name: '工单效率', icon: 'clipboard', tone: 'teal' },
        { id: 'o3', name: '人员效能', icon: 'users', tone: 'mint' },
        { id: 'o4', name: '碳排看板', icon: 'leaf', tone: 'green' }
      ]
    },
    {
      id: 's3',
      title: '视频中心',
      tone: 'royal',
      cols: 4,
      apps: [
        { id: 'p1', name: '视频巡查', icon: 'video', tone: 'blue' },
        { id: 'p2', name: '重点点位', icon: 'camera', tone: 'teal' },
        { id: 'p3', name: '告警中心', icon: 'siren', tone: 'orange' }
      ]
    }
  ]
}

const iotPage: AppPage = {
  id: 'iot-1',
  layout: 'grid',
  groups: [
    {
      id: 'i1',
      title: '设备接入',
      tone: 'blue',
      cols: 4,
      apps: [
        { id: 'q1', name: '设备台账', icon: 'harddrive', tone: 'blue' },
        { id: 'q2', name: '网关管理', icon: 'router', tone: 'teal' },
        { id: 'q3', name: '传感器', icon: 'radio', tone: 'mint' },
        { id: 'q4', name: '网络拓扑', icon: 'network', tone: 'gold' }
      ]
    },
    {
      id: 'i2',
      title: '视频物联',
      tone: 'lime',
      cols: 4,
      apps: [
        { id: 'r1', name: '摄像头管理', icon: 'camera', tone: 'blue' },
        { id: 'r2', name: '录像管理', icon: 'video', tone: 'teal' },
        { id: 'r3', name: 'AI 分析', icon: 'monitorPlay', tone: 'mint' }
      ]
    },
    {
      id: 'i3',
      title: '门禁通行',
      tone: 'orange',
      cols: 4,
      apps: [
        { id: 't1', name: '门禁设备', icon: 'door', tone: 'blue' },
        { id: 't2', name: '访客机', icon: 'users', tone: 'mint' },
        { id: 't3', name: '对讲设备', icon: 'phone', tone: 'orange' },
        { id: 't4', name: '充电桩', icon: 'zap', tone: 'gold' }
      ]
    }
  ]
}

const dataPage: AppPage = {
  id: 'data-1',
  layout: 'grid',
  groups: [
    {
      id: 'd1',
      title: '数据目录',
      tone: 'blue',
      cols: 4,
      apps: [
        { id: 'u1', name: '数据资源目录', icon: 'folder', tone: 'blue' },
        { id: 'u2', name: '主数据管理', icon: 'database', tone: 'teal' },
        { id: 'u3', name: '数据服务', icon: 'server', tone: 'mint' }
      ]
    },
    {
      id: 'd2',
      title: '指标体系',
      tone: 'green',
      cols: 4,
      apps: [
        { id: 'v1', name: '指标中心', icon: 'gauge', tone: 'mint' },
        { id: 'v2', name: '数据质量', icon: 'badge', tone: 'green' },
        { id: 'v3', name: '数据共享', icon: 'share', tone: 'blue' }
      ]
    }
  ]
}

/* 运营大屏 C 端参观模式应用，仅出现在「添加应用」弹窗的 C 端配置中 */
export const screenModeC: AppGroup[] = [
  {
    id: 'sc-control',
    title: '参观大屏控制端',
    tone: 'blue',
    cols: 1,
    apps: [
      { id: 'sc1', name: '安全', icon: 'monitorCog', tone: 'blue' },
      { id: 'sc2', name: '通行', icon: 'truck', tone: 'teal' },
      { id: 'sc3', name: '能源', icon: 'zap', tone: 'gold' },
      { id: 'sc4', name: '设备', icon: 'monitor', tone: 'green' },
      { id: 'sc5', name: '生产', icon: 'chart', tone: 'orange' },
      { id: 'sc6', name: '办公', icon: 'landmark', tone: 'gray' }
    ]
  },
  {
    id: 'sc-manage',
    title: '参观大屏管理端',
    tone: 'royal',
    cols: 1,
    apps: [
      { id: 'sc7', name: '策略管理', icon: 'clipboard', tone: 'blue' },
      { id: 'sc8', name: '视频通道同步', icon: 'monitorPlay', tone: 'teal' },
      { id: 'sc9', name: '视频播放配置', icon: 'presentation', tone: 'orange' },
      { id: 'sc10', name: 'B库数据管理', icon: 'chart', tone: 'green' },
      { id: 'sc11', name: '日志管理', icon: 'pencil', tone: 'gray' }
    ]
  },
  {
    id: 'sc-show',
    title: '参观大屏展示端',
    tone: 'green',
    cols: 1,
    apps: [
      { id: 'sc12', name: '参观大屏展示端', icon: 'monitor', tone: 'blue' },
      { id: 'sc13', name: 'PAD展示端', icon: 'presentation', tone: 'teal' }
    ]
  }
]

export const appCategories: AppCategory[] = [
  { id: 'screen', name: '运营大屏', pages: [screenPage] },
  { id: 'biz', name: '业务中心', pages: [mosaicBiz, bizPage2, bizPage3] },
  { id: 'iot', name: '物联中心', pages: [iotPage] },
  { id: 'data', name: '数据资产中心', pages: [dataPage] }
]
