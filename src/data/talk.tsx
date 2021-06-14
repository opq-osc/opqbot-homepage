import { IData } from './type'
import img from '@assets/img/avatar.jpeg'

export const TALK_CONFIG: Pick<IData, 'talk'> = {
  talk: [
    {
      avatar: img,
      text: '先帝创业未半而中道崩殂',
      desc: '先帝开创的大业未完成一半却中途去世了',
    },
    {
      avatar: 'https://docs.opqbot.com/avatar.jpeg',
      text: '今天下三分，益州疲弊，此诚危急存亡之秋也',
      desc: '现在天下分为三国，蜀汉国力薄弱，处境艰难',
    },
  ],
}
