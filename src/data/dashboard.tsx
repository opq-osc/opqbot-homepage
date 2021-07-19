import { IData } from './type'

export const DASHBOARD_CONFIG: Pick<IData, 'dashboard'> = {
  dashboard: [
    // 1 line
    {
      value: 1413,
      unit: '枚',
      desc: '累计服务',
    },
    {
      value: '10.54',
      unit: '亿',
      desc: '累计收包',
    },
    {
      value: 317,
      unit: 'GB',
      desc: '接收流量',
    },
    // 2 line
    {
      value: 950,
      unit: '个',
      desc: '公益服务',
    },
    {
      value: '2.10',
      unit: '亿',
      desc: '累计发包',
    },
    {
      value: 49,
      unit: 'GB',
      desc: '发送流量',
    },
  ],
}
