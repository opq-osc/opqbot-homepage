import { useEffect, useRef } from 'react'
import ScrollReveal from 'scrollreveal'
import { REVEAL_CLASS } from '@constants/index'

export const useScrollReveal = () => {
  const ins = useRef(
    ScrollReveal() as scrollReveal.ScrollRevealObject & {
      destroy?: () => void
    }
  )

  const isStyleAddedRef = useRef(false)

  useEffect(() => {
    const ref = ins.current
    ref.reveal(`.${REVEAL_CLASS}`, {
      interval: 150,
      beforeReveal: () => {
        if (isStyleAddedRef.current) {
          return
        }
        isStyleAddedRef.current = true
        const style = document.createElement('style')
        style.innerHTML = `.${REVEAL_CLASS} {visibility: visible;}`
        document.getElementsByTagName('head')[0].appendChild(style)
      },
    })

    return () => {
      // https://scrollrevealjs.org/guide/whats-new.html
      ref?.destroy?.()
    }
  }, [])
}
