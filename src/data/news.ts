export interface NewsItem {
  id: string
  day: string
  month: string
  title: string
  summary: string
}

export interface NewsData {
  featured: {
    title: string
    time: string
    summary: string
    image: string
  }
  list: NewsItem[]
}

const summary =
  '全世界都在努力解决物联网技术的隐私问题，物联网无需人与人或人与计算机的交互即可传输数据。全世界都在努力解决物联网技术的隐私问题，物联网无需人与人或人...'

export const newsData: NewsData = {
  featured: {
    title: '如何将安全运营转移到云端',
    time: '2023.03.06 15:26',
    summary:
      'ESG公司最近进行的一项调查发现，很多组织正在积极地使用基于云计算的方案来替代内部部署安全分析和运营技术。',
    image: '/news-building.jpg'
  },
  list: [
    { id: 'nw1', day: '22', month: '2020.06', title: '7个引人注目的创新物联网应用', summary },
    { id: 'nw2', day: '22', month: '2020.06', title: '7个引人注目的创新物联网应用', summary },
    { id: 'nw3', day: '22', month: '2020.06', title: '7个引人注目的创新物联网应用', summary }
  ]
}
