import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
import { InferGetStaticPropsType, GetStaticProps } from 'next'

const url = 'https://annieehler.com'

interface Post {
  slug: string
  content: string
  data: {
    title: string
    description: string
    date: string
    author: string
  }
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

export default function Page({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{post.data.title}</title>
        <meta name="description" content={post.data.description} />
        <meta name="author" content={post.data.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@anniethetrannie" />
        <meta name="twitter:creator" content="@anniethetrannie" />
        <meta property="og:url" content={`${url}/resume/${post.slug}`} />
        <meta property="og:title" content={post.data.title} />
        <meta property="og:description" content={post.data.description} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Annie Ehler" />
        <meta property="og:updated_time" content={post.data.date} />
        <meta property="og:published_time" content={post.data.date} />
        <meta property="og:author" content={post.data.author} />
        <meta property="og:article:author" content={post.data.author} />
        <meta property="og:article:published_time" content={post.data.date} />
        <meta property="og:article:modified_time" content={post.data.date} />
        <meta property="og:article:section" content={post.data.title} />
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
      <MDXProvider>
        <MDXRemote {...(post?.mdx ?? post?.source)} />
      </MDXProvider>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  const post = await fetch(`${url}/api/resume/${context?.params?.slug}`)
    .then((res) => res.json())
    .catch(() => null)

  if (!post) {
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
    },
    revalidate: 60,
  }
}
