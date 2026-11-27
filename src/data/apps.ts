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

/* 运营大屏：按设计稿分为安全、通行、能源、设备、办公、生产、场景/系统/资源/数据管理 */
const screenPage1: AppPage = {
  id: 'screen-1',
  layout: 'grid',
  groups: [
    {
      id: 's-safety',
      title: '安全',
      tone: 'lime',
      cols: 2,
      apps: [
        { id: 's1', name: '安防', icon: 'shield', tone: 'blue' },
        { id: 's2', name: '消防', icon: 'flame', tone: 'orange' },
        { id: 's3', name: '巡更', icon: 'footprints', tone: 'teal' },
        { id: 's4', name: '应急', icon: 'siren', tone: 'gold' }
      ]
    },
    {
      id: 's-pass',
      title: '通行',
      tone: 'yellow',
      cols: 2,
      apps: [
        { id: 's5', name: '人员', icon: 'users', tone: 'blue' },
        { id: 's6', name: '车辆', icon: 'truck', tone: 'teal' },
        { id: 's7', name: '物流', icon: 'bus', tone: 'orange' }
      ]
    },
    {
      id: 's-energy',
      title: '能源',
      tone: 'green',
      cols: 2,
      apps: [
        { id: 's8', name: '碳排放', icon: 'leaf', tone: 'green' },
        { id: 's9', name: '能耗', icon: 'zap', tone: 'gold' }
      ]
    },
    {
      id: 's-device',
      title: '设备',
      tone: 'blue',
      cols: 3,
      apps: [
        { id: 's10', name: '冷源', icon: 'waves', tone: 'teal' },
        { id: 's11', name: '工艺气体', icon: 'gauge', tone: 'orange' },
        { id: 's12', name: '配电', icon: 'plug', tone: 'gold' },
        { id: 's13', name: '给排水', icon: 'droplets', tone: 'blue' },
        { id: 's14', name: '电梯', icon: 'layers', tone: 'green' },
        { id: 's15', name: '照明', icon: 'lightbulb', tone: 'gold' }
      ]
    },
    {
      id: 's-office',
      title: '办公',
      tone: 'royal',
      cols: 2,
      apps: [
        { id: 's16', name: '环境', icon: 'sun', tone: 'gold' },
        { id: 's17', name: '会议室', icon: 'presentation', tone: 'blue' },
        { id: 's18', name: '服务', icon: 'phone', tone: 'teal' }
      ]
    },
    {
      id: 's-produce',
      title: '生产',
      tone: 'orange',
      cols: 1,
      apps: [{ id: 's19', name: '生产', icon: 'gauge', tone: 'orange' }]
    }
  ]
}

const screenPage2: AppPage = {
  id: 'screen-2',
  layout: 'grid',
  groups: [
    {
      id: 's-scene',
      title: '场景管理',
      tone: 'blue',
      cols: 1,
      apps: [{ id: 's20', name: '场景中心', icon: 'monitorPlay', tone: 'teal' }]
    },
    {
      id: 's-system',
      title: '系统管理',
      tone: 'royal',
      cols: 2,
      apps: [
        { id: 's21', name: '登陆日志', icon: 'folder', tone: 'gray' },
        { id: 's22', name: '操作日志', icon: 'pencil', tone: 'gray' }
      ]
    },
    {
      id: 's-resource',
      title: '资源管理',
      tone: 'green',
      cols: 2,
      apps: [
        { id: 's23', name: 'HDR', icon: 'camera', tone: 'blue' },
        { id: 's24', name: '图片', icon: 'layers', tone: 'teal' },
        { id: 's25', name: '模型', icon: 'share', tone: 'orange' }
      ]
    },
    {
      id: 's-data',
      title: '数据管理',
      tone: 'lime',
      cols: 1,
      apps: [{ id: 's26', name: '数据管理', icon: 'database', tone: 'blue' }]
    }
  ]
}

/* 业务中心：首页按设计稿分组，第 7 个人脸识别单独一页 */
const mosaicBiz: AppPage = {
  id: 'biz-1',
  layout: 'mosaic',
  groups: [
    {
      id: 'g-operate',
      title: '智慧运营',
      tone: 'lime',
      cols: 3,
      compact: true,
      area: { x: 0, y: 0, w: 32.4, h: 47.9 },
      apps: [
        { id: 'a1', name: '硬件管理', icon: 'server', tone: 'blue' },
        { id: 'a2', name: '领导驾驶舱', icon: 'monitor', tone: 'blue' },
        { id: 'a3', name: '测试英文', icon: 'pencil', tone: 'gray' },
        { id: 'a4', name: '智能工单', icon: 'clipboard', tone: 'teal' },
        { id: 'a5', name: '智能巡检', icon: 'monitorCog', tone: 'green' }
      ]
    },
    {
      id: 'g-office',
      title: '智慧办公',
      tone: 'yellow',
      cols: 2,
      compact: true,
      area: { x: 34.2, y: 0.4, w: 27.6, h: 47.5 },
      apps: [
        { id: 'b1', name: '考勤机管理', icon: 'landmark', tone: 'orange' },
        { id: 'b2', name: '空间管理', icon: 'chart', tone: 'teal' },
        { id: 'b3', name: '环境管理', icon: 'pencil', tone: 'gray', flat: true },
        { id: 'b4', name: '车辆全生命周期管理', icon: 'truck', tone: 'gray', flat: true },
        { id: 'b5', name: '测试中文', icon: 'clipboard', tone: 'gray', flat: true }
      ]
    },
    {
      id: 'g-service',
      title: '智慧服务',
      tone: 'blue',
      cols: 3,
      compact: true,
      area: { x: 63.6, y: 0.4, w: 36.4, h: 47.5 },
      apps: [
        { id: 'c1', name: '智慧食堂', icon: 'utensils', tone: 'blue' },
        { id: 'c2', name: '智慧宿舍', icon: 'bed', tone: 'gold' },
        { id: 'c3', name: '智慧会议室', icon: 'presentation', tone: 'teal' },
        { id: 'c4', name: '多媒体设备管理', icon: 'monitorPlay', tone: 'blue' },
        { id: 'c5', name: '广播系统', icon: 'radio', tone: 'orange' },
        { id: 'c6', name: '智慧厕所', icon: 'accessible', tone: 'gold' },
        { id: 'c7', name: '智慧充电桩', icon: 'zap', tone: 'teal' }
      ]
    },
    {
      id: 'g-safety',
      title: '数智安全',
      tone: 'royal',
      cols: 3,
      compact: true,
      area: { x: 0, y: 58.4, w: 32.4, h: 41.2 },
      apps: [
        { id: 'd1', name: '智慧安防', icon: 'shield', tone: 'blue' },
        { id: 'd2', name: '智慧巡更', icon: 'footprints', tone: 'teal' },
        { id: 'd3', name: '智慧消防', icon: 'flame', tone: 'orange' },
        { id: 'd4', name: '应急指挥调度', icon: 'siren', tone: 'gold' },
        { id: 'd5', name: 'RFID物联网防盗', icon: 'radio', tone: 'green' },
        { id: 'd6', name: '黑白名单识别', icon: 'badge', tone: 'blue' }
      ]
    },
    {
      id: 'g-green',
      title: '绿色低碳',
      tone: 'green',
      cols: 3,
      compact: true,
      area: { x: 34.2, y: 58.8, w: 27.6, h: 40.8 },
      apps: [
        { id: 'e1', name: '碳排放管理', icon: 'leaf', tone: 'green' },
        { id: 'e2', name: '能耗管理', icon: 'zap', tone: 'gold' },
        { id: 'e3', name: '智慧环境', icon: 'sun', tone: 'gold' },
        { id: 'e4', name: '动环监测', icon: 'gauge', tone: 'teal' },
        { id: 'e5', name: '智慧照明', icon: 'lightbulb', tone: 'gold' },
        { id: 'e6', name: '工务设备管理', icon: 'cog', tone: 'gray' }
      ]
    },
    {
      id: 'g-pass',
      title: '智慧通行',
      tone: 'blue',
      cols: 2,
      compact: true,
      area: { x: 63.6, y: 58.8, w: 36.4, h: 40.8 },
      apps: [
        { id: 'f1', name: '智慧门禁', icon: 'door', tone: 'blue' },
        { id: 'f2', name: '智慧访客', icon: 'users', tone: 'teal' },
        { id: 'f3', name: '智慧停车', icon: 'card', tone: 'gold' },
        { id: 'f4', name: '智慧梯控', icon: 'layers', tone: 'green' }
      ]
    }
  ]
}

const bizPage2: AppPage = {
  id: 'biz-2',
  layout: 'grid',
  groups: [
    {
      id: 'g-face',
      title: '人脸识别',
      tone: 'blue',
      cols: 4,
      apps: [
        { id: 'h1', name: '通行概览', icon: 'chart', tone: 'blue' },
        { id: 'h2', name: '识别记录', icon: 'camera', tone: 'teal' },
        { id: 'h3', name: '考勤管理', icon: 'landmark', tone: 'orange' },
        { id: 'h4', name: '人员管理', icon: 'users', tone: 'blue' },
        { id: 'h5', name: '设备管理', icon: 'server', tone: 'green' },
        { id: 'h6', name: '通行管理', icon: 'share', tone: 'teal' },
        { id: 'h7', name: '访客管理', icon: 'phone', tone: 'gold' }
      ]
    }
  ]
}

/* 物联中心：单分组完整展示 */
const iotPage: AppPage = {
  id: 'iot-1',
  layout: 'grid',
  groups: [
    {
      id: 'iot-all',
      title: '物联中心',
      tone: 'blue',
      cols: 5,
      apps: [
        { id: 'i1', name: '首页', icon: 'monitor', tone: 'blue' },
        { id: 'i2', name: '设备管理', icon: 'server', tone: 'teal' },
        { id: 'i3', name: '设备接入', icon: 'plug', tone: 'orange' },
        { id: 'i4', name: '事件中心', icon: 'siren', tone: 'gold' },
        { id: 'i5', name: '数据采集', icon: 'database', tone: 'green' },
        { id: 'i6', name: '通知管理', icon: 'chat', tone: 'blue' },
        { id: 'i7', name: '视频网关', icon: 'video', tone: 'teal' },
        { id: 'i8', name: '日志管理', icon: 'folder', tone: 'gray' },
        { id: 'i9', name: '数据流转', icon: 'share', tone: 'orange' },
        { id: 'i10', name: '个人设置', icon: 'cog', tone: 'gray' }
      ]
    }
  ]
}

/* 数据资产中心：与设计稿一致，仅一个名为 12112 的空分组 */
const dataPage: AppPage = {
  id: 'data-1',
  layout: 'grid',
  groups: [
    {
      id: 'data-empty',
      title: '12112',
      tone: 'blue',
      cols: 1,
      apps: []
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
  { id: 'screen', name: '运营大屏', pages: [screenPage1, screenPage2] },
  { id: 'biz', name: '业务中心', pages: [mosaicBiz, bizPage2] },
  { id: 'iot', name: '物联中心', pages: [iotPage] },
  { id: 'data', name: '数据资产中心', pages: [dataPage] }
]
