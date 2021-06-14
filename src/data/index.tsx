import React from 'react'
import { IData } from './type'

import { DASHBOARD_CONFIG } from './dashboard'
import { CARDS_CONFIG } from './cards'
import { FOOTER_CONFIG } from './footer'
import { HEADER_CONFIG } from './header'
import { ARTICLE_CONFIG } from './article'
import { TALK_CONFIG } from './talk'

export const text: IData = {
  ...HEADER_CONFIG,
  ...ARTICLE_CONFIG,
  ...TALK_CONFIG,
  ...DASHBOARD_CONFIG,
  ...CARDS_CONFIG,
  ...FOOTER_CONFIG,
}
