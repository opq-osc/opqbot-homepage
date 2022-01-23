import { ReactNode } from 'react'

export interface IDataDashboardItem {
  value: number | string
  unit: string
  desc: string
}

export interface IDataCard {
  icon: ReactNode
  title: ReactNode
  desc: ReactNode
  link: string
}

export interface IDataFooterLinkChildHrefMulti {
  link: string
  desc: string
  name: string
}

export type DataFooterLinkChildHref = string | IDataFooterLinkChildHrefMulti[]

export interface IDataFooterLinkChild {
  name: string
  href: DataFooterLinkChildHref
  icon?: ReactNode
  desc?: string
  additionalProps?: any
  preventDefault?: boolean
}

export interface IDataFooterLink {
  title: ReactNode
  child: IDataFooterLinkChild[]
}

export interface IDataFooter {
  license: ReactNode
  links: IDataFooterLink[]
}

export interface IDataHeaderMenu {
  name: string
  icon?: ReactNode
  link?: string
}

export interface IDataHeader {
  title: ReactNode
  github: string
  menu: IDataHeaderMenu[]
}

export interface IDataArticle {
  title: ReactNode
  desc: ReactNode
  github: string // link
  doc: string // link
}

export interface IDataTalk {
  avatar: string
  text: ReactNode
  desc?: ReactNode
}

export interface IData {
  header: IDataHeader
  article: IDataArticle
  talk: IDataTalk[]
  dashboard: IDataDashboardItem[]
  cards: IDataCard[]
  footer: IDataFooter
}
