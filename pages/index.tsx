import React from 'react'
import fetch from 'isomorphic-unfetch'
import styles from '../styles/layout.module.css'
import { Navbar } from '../components/NavBar'

const url = 'https://annieehler.com'

interface Post {
  slug: string
  title?: string
  description?: string
  date?: string
  author?: string
}

export default function Page({ pages }: { pages: Post[] }) {
  return (
    <>
      <div className={styles['main-area']} id="MainArea"></div>
      <div className="nav-area" id="NavBar">
        <Navbar pages={pages} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const pages = await fetch(`${url}/api/resume`)
    .then((res) => res.json())
    .catch(() => null)

  if (!pages) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pages,
    },
    revalidate: 60,
  }
}
