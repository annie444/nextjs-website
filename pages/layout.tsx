import React from 'react'
import styles from '../styles/layout.module.css'
import { NameAnimationMotion } from '../components/NameAnimation'
import { GridAnimation } from '../components/GridAnimation'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <>
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

      <div className={styles['resume-layout']}>
        <div className={styles['header-container']}></div>
        <div className={styles['main-container']}>{children}</div>
      </div>
    </>
  )
}
