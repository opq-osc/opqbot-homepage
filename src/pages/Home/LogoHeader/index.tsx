import React, { FC, useCallback } from 'react'
import styles from './index.module.scss'
import { Menu, Tooltip } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { text } from '@data/index'
import cx from 'classnames'
import { REVEAL_CLASS } from '@constants/index'

export const LogoHeader: FC = () => {
  // 备用
  // const onClickLogo = useCallback(() => {
  //   window.scrollTo({
  //     left: 0,
  //     top: 0,
  //     behavior: 'smooth',
  //   })
  // }, [])

  return (
    <div className={cx(styles.header, REVEAL_CLASS)}>
      <div className={styles.logo}>{text.header.title}</div>
      <div className={styles.header_right}>
        <Menu mode="horizontal" className={styles.menu} selectable={false}>
          {text.header.menu.map((item, index) => (
            <Menu.Item
              key={index}
              className={styles.menu_item}
              icon={item.icon}
            >
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </Menu.Item>
          ))}
        </Menu>
        <Tooltip title="项目地址" placement="bottomRight">
          <a
            className={styles.github_btn}
            href={text.header.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubOutlined className={styles.github_icon} />
          </a>
        </Tooltip>
      </div>
    </div>
  )
}
