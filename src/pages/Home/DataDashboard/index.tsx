import React, { FC } from 'react'
import styles from './index.module.scss'
import { Card } from 'antd'
import CountUp from 'react-countup'
import { toNumber } from 'lodash'
import { handleNumberAddComma, getNumberDecimalCount } from '@utils/format'
import { text } from '@data/index'
import cx from 'classnames'
import { REVEAL_CLASS } from '@constants/index'
import { useInView } from 'react-intersection-observer'

export const DataDashboard: FC = () => {
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true,
  })

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.title, REVEAL_CLASS)} ref={ref}>
        ☁️ OPQ Clound Center Data
      </div>
      {inView && (
        <div className={cx(styles.content, styles.content_grid)}>
          {text.dashboard.map((item) => {
            const decimals = getNumberDecimalCount(item.value)

            return (
              <div
                className={cx(styles.single_card, REVEAL_CLASS)}
                key={item.desc}
              >
                <Card hoverable bordered={false} className={styles.card}>
                  <div className={styles.card_content}>
                    <div className={styles.card_top}>
                      <CountUp
                        duration={2}
                        decimals={decimals}
                        end={toNumber(item.value)}
                        formattingFn={(n) => {
                          return handleNumberAddComma(n, decimals)
                        }}
                        className={styles.card_number}
                      />
                      <div className={styles.card_unit}>{item.unit}</div>
                    </div>
                    <div className={styles.card_desc}>{item.desc}</div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
