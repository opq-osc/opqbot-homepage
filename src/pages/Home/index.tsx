import React, { FC } from 'react'
import styles from './index.module.scss'
import { CenterContent } from './CenterContent'
import { LogoHeader } from './LogoHeader'
import { DataDashboard } from './DataDashboard'
import { OSCPage } from './OSCPage'
import { AdditionFooter } from './AdditionFooter'
import { useScrollReveal } from '@hooks/useScrollReveal'

export const Home: FC = () => {
  useScrollReveal()

  return (
    <div>
      <div className={styles.first_page}>
        <LogoHeader />
        <CenterContent />
      </div>
      <div className={styles.dashboard}>
        <DataDashboard />
      </div>
      <div className={styles.osc}>
        <OSCPage />
      </div>
      <div className={styles.footer}>
        <AdditionFooter />
      </div>
    </div>
  )
}
