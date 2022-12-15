import { NextApiRequest, NextApiResponse } from 'next'
import { phraseResolver } from '../../util/api'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string }
  try {
    const phrase = await phraseResolver(slug)
    res.json({ phrase })
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
}
