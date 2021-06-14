import React, { FC } from 'react'
import styles from './index.module.scss'
import { text } from '@data/index'
import { Button, Popover, ButtonProps } from 'antd'
import cx from 'classnames'
import { REVEAL_CLASS } from '@constants/index'
import { isString } from 'lodash'
import { IDataFooterLinkChildHrefMulti } from '@data/type'

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
                {link.child.map((item) => {
                  const isSingle = isString(item.href)

                  const btnProps: ButtonProps = {
                    type: 'link',
                    target: '_blank',
                    href: isSingle ? (item.href as string) : undefined,
                  }

                  return (
                    <Popover
                      content={
                        isSingle
                          ? item.desc
                          : (item.href as IDataFooterLinkChildHrefMulti[]).map(
                              (item) => (
                                <div>
                                  <Button
                                    type="link"
                                    target="_blank"
                                    href={item.link}
                                    style={{ padding: 0 }}
                                  >
                                    {item.name}
                                  </Button>
                                  <div>{item.desc}</div>
                                </div>
                              )
                            )
                      }
                      key={item.name}
                      visible={
                        isSingle ? (item.desc ? undefined : false) : undefined
                      }
                      placement="right"
                    >
                      <Button
                        {...btnProps}
                        icon={item.icon}
                        className={styles.link_btn}
                        title={item.name}
                      >
                        {item.name}
                      </Button>
                    </Popover>
                  )
                })}
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
