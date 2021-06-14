import React, { FC } from 'react'
import styles from './index.module.scss'
import { Card } from 'antd'
import { text } from '@data/index'
import cx from 'classnames'
import { REVEAL_CLASS } from '@constants/index'

export const OSCPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {text.cards.map((item, index) => (
          <Card
            className={cx(styles.card, REVEAL_CLASS)}
            key={index}
            onClick={() => {
              window.open(item.link, '_blank', 'noopener')
            }}
          >
            <div className={styles.card_content}>
              <div className={styles.card_icon}>{item.icon}</div>
              <div className={styles.card_box}>
                <div className={styles.card_title}>{item.title}</div>
                <div className={styles.card_desc}>{item.desc}</div>
              </div>
              <a
                className={styles.card_link}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                Get Start
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
