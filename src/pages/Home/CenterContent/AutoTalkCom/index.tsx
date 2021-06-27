import React, { FC } from 'react'
import styles from './index.module.scss'
import { Avatar, Tooltip } from 'antd'
import cx from 'classnames'
import { text } from '@data/index'
import { motion } from 'framer-motion'

export const AutoTalkCom: FC = () => {
  return (
    <div className={styles.wrapper}>
      {text.talk.map((item, index) => {
        const isEven = index % 2 === 0

        const margin = 18

        const avatarElm = (
          <Avatar
            src={item.avatar}
            size={38}
            className={styles.avatar}
            style={{
              marginRight: isEven ? undefined : margin,
              marginLeft: isEven ? margin : undefined,
            }}
          />
        )

        const textElm = (
          <div
            className={cx(
              styles.text,
              isEven ? styles.text_triangle_right : styles.text_triangle_left
            )}
          >
            {item.text}
          </div>
        )

        const talkElm = (
          <>
            {avatarElm}
            <Tooltip
              placement={isEven ? 'top' : 'bottom'}
              arrowPointAtCenter
              title={item.desc}
              zIndex={1}
              overlayClassName={styles.j_tooltip}
            >
              {textElm}
            </Tooltip>
          </>
        )

        return (
          <motion.div
            className={styles.talk}
            style={{
              flexFlow: isEven ? 'row-reverse' : undefined,
            }}
            initial={{
              opacity: 0,
              x: isEven ? 20 : -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                delay: index * 0.5 + 0.7,
                type: 'spring',
              },
            }}
          >
            {talkElm}
          </motion.div>
        )
      })}
    </div>
  )
}
