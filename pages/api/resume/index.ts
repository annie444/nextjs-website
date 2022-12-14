import { NextApiRequest, NextApiResponse } from 'next'

// You'll need to specify the absolute URL to fetch your file

/**
 * fetches and returns all posts from json cache
 */
export const getAllPosts = async () => {
  const data = await fetch(`${process.env.SITEMAP_URL}/cache/resume.json`).then(
    (res) => res.json()
  )
  return data
}

interface Post {
  slug?: string
  title?: string
  description?: string
  date?: string
  author?: string
}

/**
 * Returns a list of paginated posts
 */
const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getAllPosts()
  const mappedData = data.map((post: Post) => {
    return {
      slug: post.slug ?? '',
      title: post.title ?? '',
      description: post.description ?? '',
      date: post.date ?? '',
      author: post.author ?? '',
    }
  })
  res.status(200).json(mappedData)
}

export default posts
