import { IData } from './type'
import {
  BarsOutlined,
  CommentOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { OPQ_DOC_SITE, OPQ_REPO, OPQ_OSC_LINK } from './constants'
import opqPngLogoUrl from '@/assets/logo/opq.logo-only.min.png'
import styles from './index.module.scss'

export const HEADER_CONFIG: Pick<IData, 'header'> = {
  header: {
    title: <img src={opqPngLogoUrl} alt="OPQBot" className={styles.opq_logo} />,
    github: OPQ_REPO,
    menu: [
      {
        name: '文档站',
        link: OPQ_DOC_SITE,
        icon: <BarsOutlined />,
      },
      {
        name: '社区生态',
        link: OPQ_OSC_LINK,
        icon: <CommentOutlined />,
      },
      {
        name: '加入我们',
        link: 'https://docs.opqbot.com/other/join.html',
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
}
