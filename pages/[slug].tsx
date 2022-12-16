import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import styles from '../styles/layout.module.css'
import { Navbar } from '../components/NavBar'
import { MDXProvider } from '@mdx-js/react'

const url = 'https://annieehler.com'

interface Params {
  slug: string
}

interface Post {
  slug: string
  content: string
  data: object
  excerpt: string
  file: {
    cwd: string
    data: object
    history: Array<string>
    messages: Array<string>
    value: string
  }
  isEmpty: boolean
  mdx: MDXRemoteSerializeResult
  source: MDXRemoteSerializeResult
}

interface Page {
  slug: string
  title?: string
  description?: string
  date?: string
  author?: string
}

export default function Page({ post, pages }: { post: Post; pages: Page[] }) {
  return (
    <>
      <div className={styles['main-area']} id="MainArea">
        <MDXProvider>
          <MDXRemote {...(post?.mdx ?? post?.source)} />
        </MDXProvider>
      </div>
      <div className="nav-area" id="NavBar">
        <Navbar pages={pages} />
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context: {
  params: Params
  preview?: boolean
  previewData?: object
  locale?: string
  locales?: Array<string>
  defaultLocale?: string
}) => {
  const post = await fetch(`${url}/api/resume/${context?.params.slug}`)
    .then((res) => res.json())
    .catch(() => null)

  const pages = await fetch(`${url}/api/resume`)
    .then((res) => res.json())
    .catch(() => null)

  if (!post || !pages) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
        statusCode: 301,
      },
    }
  }

  return {
    props: {
      post,
      pages,
    },
    revalidate: 60,
  }
}
