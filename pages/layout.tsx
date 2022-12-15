import React from 'react'
import { useRef, useEffect } from 'react'
import styles from '../styles/layout.module.css'
import { NameAnimationMotion } from '../components/NameAnimation'
import { GridAnimation } from '../components/GridAnimation'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ResumeRef = useRef(null)
  const MainContainerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ResumeRef,
  })
  const WindowFollower = useScroll().scrollY
  const NameAnimationTransform = useMotionValue(0)
  const springY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 10,
    duration: 0.1,
  })
  const lastUpdate = useMotionValue(0)

  useEffect(() => {
    const unsubWF = WindowFollower.onChange(() => {
      if (springY.get() <= 0 && lastUpdate.get() === 0) {
        lastUpdate.set(WindowFollower.get())
      }
      if (springY.get() <= 0) {
        const now = WindowFollower.get()
        NameAnimationTransform.set(
          NameAnimationTransform.get() + (now - lastUpdate.get())
        )
        lastUpdate.set(now)
      }
      if (NameAnimationTransform.get() < 0) {
        NameAnimationTransform.set(0)
      }
    })
    return () => {
      unsubWF()
    }
  }, [WindowFollower])

  const yTransform = useTransform(
    springY,
    // Map x from these values:
    [1, 0],
    // Into these values:
    ['0vh', '60vh']
  )

  const zIndexTransform = useTransform(
    springY,
    // Map x from these values:
    [1, 0],
    // Into these values:
    [4, 10]
  )

  const scaler = useTransform(
    springY,
    // Map x from these values:
    [1, 0],
    // Into these values:
    [1, 0.6]
  )

  const opacityTransform = useTransform(
    springY,
    // Map x from these values:
    [1, 0.6],
    // Into these values:
    [0, 1]
  )

  const yTemplate = useMotionTemplate`calc(${yTransform} + ${NameAnimationTransform}px)`

  return (
    <>
      <GridAnimation />

      <motion.div
        style={{
          height: '100vh',
          width: '100vw',
          backgroundColor: 'transparent',
          display: 'flex',
          overflow: 'visible',
          position: 'relative',
          pointerEvents: 'none',
          alignContent: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <NameAnimationMotion
          style={{
            translateY: yTemplate,
            zIndex: zIndexTransform,
            scale: scaler,
          }}
        />
      </motion.div>

      <motion.div
        className={styles['resume-layout']}
        style={{
          opacity: opacityTransform,
        }}
      >
        <div ref={ResumeRef} className={styles['header-container']}></div>
        <div ref={MainContainerRef} className={styles['main-container']}>
          {children}
        </div>
      </motion.div>
    </>
  )
}
