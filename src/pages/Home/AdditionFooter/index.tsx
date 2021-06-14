import React, { FC } from 'react'
import styles from './index.module.scss'
import { text } from '@data/index'
import { Button } from 'antd'
import cx from 'classnames'
import { REVEAL_CLASS } from '@constants/index'

export const AdditionFooter: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {text.footer.links.map((link, index) => {
          return (
            <div
              key={index}
              className={cx(styles.single_category, REVEAL_CLASS)}
            >
              <div className={styles.link_title}>{link.title}</div>
              <div className={styles.link_child}>
                {link.child.map((item) => (
                  <Button
                    type="link"
                    target="_blank"
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    className={styles.link_btn}
                    title={item.desc || item.name}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <div className={cx(styles.license, REVEAL_CLASS)}>
        {text.footer.license}
      </div>
    </div>
  )
}
