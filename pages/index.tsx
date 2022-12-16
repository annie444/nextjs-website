import React from 'react'
import fetch from 'isomorphic-unfetch'
import styles from '../styles/layout.module.css'
import { Navbar } from '../components/NavBar'
import Head from 'next/head'

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
      <Head>
        <title>Analetta Rae Marie Ehler</title>
        <meta
          name="description"
          content="Analetta (Annie) Rae Marie Ehler Bioinformatics Data Science Portfolio and Resume"
        />
        <meta name="author" content="Analetta (Annie) Ehler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@anniethetrannie" />
        <meta name="twitter:creator" content="@anniethetrannie" />
        <meta property="og:url" content={`${url}`} />
        <meta property="og:title" content="Analetta Rae Marie Ehler" />
        <meta
          property="og:description"
          content="Analetta (Annie) Rae Marie Ehler Bioinformatics Data Science Portfolio and Resume"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Annie Ehler" />
        <meta
          property="og:updated_time"
          content={`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`}
        />
        <meta
          property="og:published_time"
          content={`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`}
        />
        <meta property="og:author" content="Analetta (Annie) Ehler" />
        <meta property="og:article:author" content="Analetta (Annie) Ehler" />
        <meta
          property="og:article:published_time"
          content={`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`}
        />
        <meta
          property="og:article:modified_time"
          content={`${new Date().getUTCFullYear()}-${new Date().getUTCMonth()}-${new Date().getUTCDate()}`}
        />
        <meta property="og:article:section" content="home" />
        <meta property="og:article:tag" content="Resume" />
        <meta property="og:article:tag" content="Annie Ehler" />
        <meta property="og:article:tag" content="Annie" />
        <meta property="og:article:tag" content="Ehler" />
        <meta property="og:article:tag" content="Annie Ehler Resume" />
        <meta property="og:article:tag" content="Annie Ehler Portfolio" />
        <meta
          property="og:article:tag"
          content="Annie Ehler Portfolio Resume"
        />
      </Head>
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
