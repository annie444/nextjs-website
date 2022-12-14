import React, { useState } from 'react'
import styles from '../styles/NavItem.module.scss'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Collapse, Loading } from '@nextui-org/react'

type NavItemProps = {
  text: string
  href: string
  idx: number
  children: React.ReactNode
}

export const NavItem = ({
  text,
  href,
  idx,
  children,
}: NavItemProps): JSX.Element => {
  const router = useRouter()
  const [show, setShow] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      e.preventDefault()
      // Start the page transition
      NProgress.start()

      fetch(`/api/resume/${href}`, {
        method: 'GET',
      }).then((res) => {
        // Do a fast client-side transition to the already prefetched dashboard page
        if (res.ok)
          router.replace(`/${href}`, undefined, {
            scroll: false,
            shallow: false,
          })
      })
    },
    [href, router]
  )

  useEffect(() => {
    router.prefetch(`/${href}`)

    const handleStart = () => {
      setShow(false)
    }

    const handleStop = () => {
      setShow(true)
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router, href])

  return (
    <>
      <Collapse
        id={href}
        title={text}
        className={styles['nav-item']}
        onClick={handleClick}
        style={{ pointerEvents: 'all', cursor: 'pointer' }}
        index={idx}
      >
        {show ? (
          children
        ) : (
          <div
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              height: '100px',
            }}
          >
            <Loading type="points" color="primary" size="lg" />
          </div>
        )}
      </Collapse>
    </>
  )
}
