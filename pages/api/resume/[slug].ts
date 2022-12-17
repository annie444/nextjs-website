import { NextRequest } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'experimental-edge',
}

const url = 'https://annieehler.com'

/**
 * fetches and returns all posts from json cache
 */
export const getAllPosts = async () => {
  const data = await fetch(`${url}/cache/resume.json`).then((res) => res.json())
  return data
}

/**
 * Finds and returns a single post
 */
const Resume = async (req: NextRequest) => {
  const url = new URL(req.url)
  const slug = url.pathname.split('/').pop()
  const data = (await getAllPosts()).find(
    (page: { slug: string }) => page.slug === slug
  )
  if (data) {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    })
  } else {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default Resume
