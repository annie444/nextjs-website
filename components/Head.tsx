import React from 'react'
import Head from 'next/head'

const url = 'https://annieehler.com'

export const Header = () => {
  return (
    <>
      <Head>
        <title>Analetta Rae Marie Ehler</title>
        <meta
          name="description"
          content="Analetta (Annie) Rae Marie Ehler Resume Curriculum Vitae and Bioinformatics Data Science Engineer Portfolio"
        />
        <meta name="author" content="Analetta (Annie) Ehler" />
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
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="description"
          content="Analetta (Annie) Rae Marie Ehler Resume Curriculum Vitae and Bioinformatics Data Science Engineer Portfolio"
        />
      </Head>
    </>
  )
}
