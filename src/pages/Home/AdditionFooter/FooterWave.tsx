import React, { FC, useCallback, useState } from 'react'
import Wave from 'react-wavify'
import randomColor from 'randomcolor'
import styled from 'styled-components'

const WaveWithStyle = styled(Wave)`
  cursor: pointer;
  margin-bottom: -20px;
  margin-top: -50px;

  svg {
    path {
      transition: all 0.2s ease;
    }
  }
`

export const DEFAULT_WAVE_COLOR = 'rgba(255, 255, 255, .1)'

export const FooterWave: FC = () => {
  const [color, setColor] = useState(DEFAULT_WAVE_COLOR)

  const genRandomColor = useCallback(() => {
    const newColor = randomColor({
      format: 'rgba',
      alpha: 0.2,
      luminosity: 'light',
      hue: 'monochrome',
    })
    setColor(newColor)
  }, [])

  return (
    <WaveWithStyle
      onClick={genRandomColor}
      fill={color}
      paused={false}
      options={{
        height: 40,
        amplitude: 40,
        speed: 0.3,
        points: 3,
      }}
    />
  )
}
