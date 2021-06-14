import React, { FC } from 'react'
import { NodejsIcon, GolangIcon, CsharpIcon, PythonIcon } from './'
import styled from 'styled-components'

const LANG_ICON_SIZE = 60
const LANG_ICON_SIZE_MOBILE = 35
const ICON_GAP = 15

const WrapperStyle = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin-right: 10px;
  }

  svg {
    width: ${LANG_ICON_SIZE}px;
    height: ${LANG_ICON_SIZE}px;

    @media screen and (max-width: 768px) {
      width: ${LANG_ICON_SIZE_MOBILE}px;
      height: ${LANG_ICON_SIZE_MOBILE}px;
    }
  }

  svg + svg {
    margin-left: ${ICON_GAP}px;
  }
`

const LineStyle = styled.div`
  display: flex;
  align-items: center;
`

export const MultiLangIcon: FC = () => {
  return (
    <WrapperStyle>
      {/* 1 line */}
      <LineStyle
        style={{
          marginBottom: ICON_GAP,
        }}
      >
        <PythonIcon />
        <GolangIcon />
      </LineStyle>
      {/* 2 line */}
      <LineStyle>
        <NodejsIcon />
        <CsharpIcon />
      </LineStyle>
    </WrapperStyle>
  )
}
