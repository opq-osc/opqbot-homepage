import { IData } from './type'
import { OPQ_DOC_SITE, OPQ_REPO } from './constants'

export const ARTICLE_CONFIG: Pick<IData, 'article'> = {
  article: {
    title: 'OPQ Bot',
    desc: (
      <>
        OPQ RST UVW XYZ，无论是服务器、Mac、树莓派、电视盒子、路由器，AI
        机器人框架 OPQ 为跨平台而生，轻松应对
        <br />
        OPQBot 采用独特的插件机制，内置协程池，高效、稳定、迸发，提供
        WebSocket，Web API，极低内存运行，稳定 0 崩溃
      </>
    ),
    doc: OPQ_DOC_SITE,
    github: OPQ_REPO,
  },
}
