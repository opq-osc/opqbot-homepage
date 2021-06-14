import styles from './index.module.scss'
import { IData } from './type'
import { CorrectIcon, RainbowIcon, MultiLangIcon } from '@assets/index'
import { OPQ_DOC_SITE } from './constants'

export const CARDS_CONFIG: Pick<IData, 'cards'> = {
  cards: [
    {
      icon: <CorrectIcon className={styles.correct_icon} />,
      title: 'Easy to use',
      desc: '无论你是小白还是经验丰富的大佬，经过简单学习即可轻松搭建自己的 OPQBot',
      link: OPQ_DOC_SITE,
    },
    {
      icon: <MultiLangIcon />,
      title: 'Develop with power',
      desc: '借助社区提供的多语言 SDK 支持，轻松开发属于你独一无二的功能',
      link: 'https://docs.opqbot.com/project/sdk.html',
    },
    {
      icon: <RainbowIcon className={styles.correct_icon} />,
      title: 'Enrich open source',
      desc: '极低成本即可享受开源社区丰富的即开即用插件和功能',
      link: 'https://docs.opqbot.com/project/plugins.html',
    },
  ],
}
