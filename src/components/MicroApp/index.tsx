import React, { useEffect } from 'react'
import { MICRO_APP_ELM } from '@/constants/microApp'
import { start } from 'qiankun'
import { isString } from 'lodash'

export const MicroApp: React.FC = () => {
  useEffect(() => {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start({
        fetch: (url, options, ...args) => {
          if (isString(url) && url.endsWith('html')) {
            return fetch(
              url,
              {
                ...options,
                cache: 'no-cache',
              },
              ...args
            )
          }
          return fetch(url, options, ...args)
        },
      })
    }
  }, [])

  return <div id={MICRO_APP_ELM}></div>
}
