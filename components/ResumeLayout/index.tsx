import { motion, useSpring, useScroll, useTransform } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import NavBar from '../NavBar'

const ResumeLayoutDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 3;
  position: relative;
  pointer-events: none;
  font-size: 1.6rem;
`

const HeaderContainer = styled.div<{ color: string }>`
  height: 8rem;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  wrap: nowrap;
  z-index: 3;
  position: relative;
  pointer-events: none;
  border: 1px solid ${(props) => props.color};
  * {
    pointer-events: auto;
  }
`

const HeaderRight = styled.div`
  justify-items: flex-start;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
`
const HeaderMiddle = styled.div``
const HeaderLeft = styled.div``

const MainContainer = styled.div<{ color: string }>`
  height: calc(100% - 8rem);
  width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  wrap: nowrap;
  overflow: hidden;
  z-index: 3;
  position: relative;
  pointer-events: none;

  * {
    pointer-events: auto;
  }
`

const MainArea = styled.div`
  height: 100%;
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
  * {
    pointer-events: auto;
  }
`

const MainLeft = styled.div`
  height: 100%;
  display: flex;
  width: 20%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
  border: 1px solid #000;
  border-top: none;
  * {
    pointer-events: auto;
  }
`

type IndexPageProps = {
  children: React.ReactNode
}

const IndexPage = ({ children }: IndexPageProps) => {
  const txt = '#000'

  const { NameAnimationMotion, GridAnimation } = {
    NameAnimationMotion: dynamic(() => import('../NameAnimation'), {
      ssr: false,
    }),
    GridAnimation: dynamic(() => import('../GridAnimation'), {
      ssr: false,
    }),
  }

  const { scrollYProgress } = useScroll()
  const springY = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    duration: 0.5,
  })

  const yTransform = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ['0%', '90%']
  )

  const xTransform = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ['0%', '-30%']
  )

  const heightTransform = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ['100vh', '0vh']
  )

  const widthTransform = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    ['100vw', '0wh']
  )

  const zIndexTransform = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    [4, 10]
  )

  const scaler = useTransform(
    springY,
    // Map x from these values:
    [0, 1],
    // Into these values:
    [1, 0.7]
  )

  // const template = ({ x }) => {
  // 	return `translateY(${x})`
  // }

  return (
    <>
      <main>
        <GridAnimation />

        <motion.div
          style={{
            translateY: yTransform,
            translateX: xTransform,
            zIndex: zIndexTransform,
            minHeight: heightTransform,
            minWidth: widthTransform,
            scale: scaler,
            backgroundColor: 'transparent',
            display: 'flex',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'relative',
            pointerEvents: 'none',
            alignContent: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <NameAnimationMotion />
        </motion.div>

        <ResumeLayoutDiv style={{ color: txt }}>
          <HeaderContainer color={txt}>
            <HeaderRight></HeaderRight>
            <HeaderMiddle></HeaderMiddle>
            <HeaderLeft></HeaderLeft>
          </HeaderContainer>
          <MainContainer color={txt}>
            <MainArea>{children}</MainArea>
            <MainLeft>
              <NavBar />
            </MainLeft>
          </MainContainer>
        </ResumeLayoutDiv>
      </main>
    </>
  )
}

export default IndexPage
