import { IDataFooterLinkChild } from './type'
import { BranchesOutlined, AppstoreOutlined } from '@ant-design/icons'
import { upperFirst, groupBy, concat } from 'lodash'

export interface IDataFooterLinkChildPlugin extends IDataFooterLinkChild {
  lang: string
}

export const pluginsGenerator = (
  list: IDataFooterLinkChildPlugin[]
): IDataFooterLinkChild[] => {
  // 先把语言聚合下
  const groupByLang = groupBy(list, 'lang')
  // 打散
  const handleList = concat([], ...Object.values(groupByLang))

  return handleList.map((item) => ({
    ...item,
    name: `${item.name} (${upperFirst(item.lang)})`,
    icon: <BranchesOutlined />,
  }))
}

export const plugins: IDataFooterLinkChildPlugin[] = [
  {
    name: 'botoy-plugins',
    lang: 'python',
    href: 'https://github.com/opq-osc/botoy-plugins',
    desc: '一些 botoy 插件',
  },
  {
    name: 'OPQBot-GroupManager',
    lang: 'golang',
    href: 'https://github.com/opq-osc/OPQBot-GroupManager',
    desc: 'OPQBot 群管理机器人',
  },
  {
    name: 'IOTQQ_Plugins',
    lang: 'lua',
    href: 'https://github.com/opq-osc/IOTQQ_Plugins',
    desc: 'IOTQQ 机器人 LuaPlugins 插件仓库',
  },
  {
    name: 'OPQ-SetuBot',
    lang: 'python',
    href: 'https://github.com/opq-osc/OPQ-SetuBot',
    desc: 'OPQBOT 的涩图机器人插件',
  },
  {
    name: 'lua-plugins',
    lang: 'lua',
    href: 'https://github.com/opq-osc/lua-plugins',
    desc: '适用于 OPQBOT 的一系列 lua 插件',
  },
  {
    name: 'opqqq-plugin',
    lang: 'python',
    href: 'https://github.com/opq-osc/opqqq-plugin',
    desc: 'OPQBot 即开即用的插件，自定义表情、早晚安、Vtuber/Pcr/原神 运势等',
  },
  {
    name: 'LuaPlugins',
    lang: 'lua',
    href: 'https://github.com/opq-osc/LuaPlugins',
    desc: 'IOTQQ -- Lua 插件',
  },
  {
    name: 'ioobot',
    lang: 'python',
    href: 'https://github.com/opq-osc/ioobot',
    desc: '一个适用于OPQBOT 的识图姬',
  },
  {
    name: 'OPQBOT-jikipedia',
    lang: 'golang',
    href: 'https://github.com/opq-osc/OPQBOT-jikipedia',
    desc: 'opqosc/OPQBot 的查梗插件',
  },
]

// 放在 footer.links 里的，暂时先不放出来，有点多
export const OSC_PLUGINS = {
  title: '社区插件',
  child: [
    {
      name: 'Plugin Summary',
      icon: <AppstoreOutlined />,
      href: 'https://docs.opqbot.com/project/plugins.html',
    },
    ...pluginsGenerator(plugins),
  ],
}
