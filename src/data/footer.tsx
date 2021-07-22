import {
  PythonIcon,
  GolangIcon,
  NodejsIcon,
  CsharpIcon,
  GitterIcon,
  TelegramIcon,
} from '@assets/index'
import styles from './index.module.scss'
import {
  BarsOutlined,
  GithubFilled,
  CodeSandboxOutlined,
  DashboardOutlined,
  CloudSyncOutlined,
  TagOutlined,
  HeartOutlined,
  CommentOutlined,
  BulbOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { IData } from './type'
import { OPQ_DOC_SITE, OPQ_REPO, OPQ_OSC_LINK, OPQ_WIKI } from './constants'

export const FOOTER_CONFIG: Pick<IData, 'footer'> = {
  footer: {
    license: (
      <>
        MIT Licensed | Copyright © 2021
        <br />
        <Button
          type="link"
          href={OPQ_OSC_LINK}
          className={styles.osc_link}
          target="_blank"
        >
          OPQ Open Source Community
        </Button>
      </>
    ),
    links: [
      {
        title: 'OPQBot',
        child: [
          {
            name: '文档站',
            icon: <BarsOutlined />,
            href: OPQ_DOC_SITE,
          },
          {
            name: '仓库地址',
            icon: <GithubFilled />,
            href: OPQ_REPO,
          },
          {
            name: '开发社区',
            icon: <CommentOutlined />,
            href: OPQ_OSC_LINK,
          },
          {
            name: 'Wiki',
            icon: <BulbOutlined />,
            href: OPQ_WIKI,
          },
          {
            name: 'Gitter',
            icon: <GitterIcon className={styles.gitter_icon} />,
            href: 'https://gitter.im/OPQBOT/OPQ',
          },
          {
            name: 'Telegram',
            icon: <TelegramIcon className={styles.gitter_icon} />,
            href: 'https://t.me/IOTQQ',
          },
          {
            name: '投喂打赏',
            icon: <HeartOutlined />,
            href: 'https://github.com/opq-osc/OPQ#readme',
          },
          {
            name: '加入我们',
            icon: <UsergroupAddOutlined />,
            href: 'https://docs.opqbot.com/other/join.html',
          },
        ],
      },
      {
        title: '功能开发',
        child: [
          {
            name: 'SDK Summary',
            icon: <CodeSandboxOutlined />,
            href: 'https://docs.opqbot.com/project/sdk.html',
          },
          {
            name: 'Python SDK',
            icon: <PythonIcon className={styles.sdk_color_icon} />,
            href: 'https://github.com/opq-osc/botoy',
            desc: 'OPQ/IOTQQ/IOTBot的一个Python开发助手🐌',
          },
          {
            name: 'Golang SDK',
            icon: <GolangIcon className={styles.sdk_color_icon} />,
            href: 'https://github.com/opq-osc/OPQBot',
            desc: '完全异步，自带队列，而且可以编译出二进制文件的框架。',
          },
          {
            name: 'Nodejs SDK',
            icon: <NodejsIcon className={styles.sdk_color_icon} />,
            href: 'https://github.com/opq-osc/IOTBOT-Node.js',
            desc: 'IOTBOT，Nodejs版',
          },
          {
            name: 'C# SDK',
            icon: <CsharpIcon className={styles.sdk_color_icon} />,
            href: [
              {
                name: 'MeowIOTBot',
                link: 'https://github.com/opq-osc/MeowIOTBot',
                desc: 'IOT Bot Structure For Enterprise Developer',
              },
              {
                name: 'YukinoshitaBot.OPQ',
                link: 'https://github.com/opq-osc/YukinoshitaBot.OPQ',
                desc: 'A c#/.net sdk for OPQ bot',
              },
              {
                name: 'OPQBot-Native',
                link: 'https://github.com/opq-osc/OPQBot-Native',
                desc: 'OPQBot 酷Q插件 兼容框架',
              },
            ],
          },
        ],
      },
      {
        title: '实用工具',
        child: [
          {
            name: 'panel',
            icon: <DashboardOutlined />,
            href: 'https://github.com/opq-osc/panel',
            desc: 'opqbot面板',
          },
          {
            name: 'MeowIOTConsole',
            icon: <CloudSyncOutlined />,
            href: 'https://github.com/opq-osc/MeowIOTConsole',
            desc: 'an EOC IOT Update Program :: Easy(ily) OpenSource CrossPlatfrom',
          },
        ],
      },
      {
        title: '相关站点',
        child: [
          {
            name: 'OPQ Helper',
            href: 'https://docs.opqbot.com',
            icon: <BarsOutlined />,
          },
          {
            name: 'OPQBot Wiki',
            href: 'https://go.opqbot.com',
            icon: <TagOutlined />,
          },
        ],
      },
    ],
  },
}
