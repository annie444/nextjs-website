import { NextApiRequest, NextApiResponse } from 'next'

// You'll need to specify the absolute URL to fetch your file

const url = 'https://annieehler.com'

/**
 * fetches and returns all posts from json cache
 */
export const getAllPosts = async () => {
  const data = await fetch(`${url}/cache/resume.json`).then((res) => res.json())
  return data
}

interface Post {
  slug?: string
  data?: {
    Title?: string
    Description?: string
    Date?: string
    Author?: string
  }
}

/**
 * Returns a list of paginated posts
 */
const posts = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getAllPosts().then((res) => res)
  const mappedData = data.map((post: Post) => {
    return {
      slug: post.slug ?? '',
      title: post.data?.Title ?? '',
      description: post.data?.Description ?? '',
      date: post.data?.Date ?? '',
      author: post.data?.Author ?? '',
    }
  })
  res.status(200).json(mappedData)
  res.end()
}

export default posts
