import React, { FC } from 'react'
import styles from './index.module.scss'
import { Button } from 'antd'
import { GithubOutlined, BarsOutlined } from '@ant-design/icons'
import { text } from '@data/index'
import { AutoTalkCom } from './AutoTalkCom'
import { REVEAL_CLASS } from '@constants/index'
import cx from 'classnames'

export const CenterContent: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={cx(styles.title, REVEAL_CLASS)}>
          {text.article.title}
        </div>
        <div className={cx(styles.desc, REVEAL_CLASS)}>{text.article.desc}</div>
        <div className={cx(styles.btns, REVEAL_CLASS)}>
          <Button
            type="primary"
            shape="round"
            className={styles.btn}
            size="large"
            icon={<BarsOutlined />}
            href={text.article.doc}
            target="_blank"
          >
            Document
          </Button>
          <Button
            shape="round"
            className={styles.btn}
            size="large"
            icon={<GithubOutlined />}
            href={text.article.github}
            target="_blank"
          >
            Github
          </Button>
        </div>
      </div>
      <div className={cx(styles.right, REVEAL_CLASS)}>
        <AutoTalkCom />
      </div>
    </div>
  )
}
