import { MDXRemote } from 'next-mdx-remote'
import React from 'react'
import styles from '../styles/layout.module.css'
import { Navbar } from '../components/NavBar'

const url = `http://localhost:3000`

interface Params {
  slug: string
}

interface Post {
  mdx: {
    compiledSource: string
    frontmatter: {
      title: string
      description: string
      date: string
    }
  }
}

interface Page {
  slug?: string
  title?: string
  description?: string
  date?: string
  author?: string
}

export default function Page({ post, pages }: { post: Post; pages: Page[] }) {
  return (
    <>
      <div className={styles['main-area']}>
        <MDXRemote
          compiledSource={post?.mdx.compiledSource ?? ''}
          frontmatter={
            post?.mdx.frontmatter ?? {
              title: '',
              description: '',
              date: '',
            }
          }
          lazy={true}
        />
      </div>
      <div className={styles['nav-area']}>
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
