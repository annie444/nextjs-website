import fs from 'fs'
import path from 'path'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import stringWidth from 'string-width'
import remarkMdx from 'remark-mdx'
import { remark } from 'remark'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import html from 'remark-html'

main()

async function main() {
  async function getAll() {
    // Read files at _posts/{directory}
    const directory = path.join(process.cwd(), `_posts`)
    const fileNames = fs.readdirSync(directory)
    console.log(fileNames)
    // Get the content of the files as JSON
    const content = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(directory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        const file = remark()
          .use(remarkMdx)
          .use(remarkParse)
          .use(html)
          .use(remarkGfm, { stringLength: stringWidth })
          .use(remarkRehype)
          .use(rehypeStringify)
          .processSync(matterResult.content)

        const mdx = await serialize(matterResult.content).then((data) => data)
        return {
          slug,
          file,
          mdx,
          ...matterResult,
        }
      })
    ).then((data) => data)
    console.log(content)
    // Return a big array of JSON
    return JSON.stringify(content)
  }

  const allPosts = await getAll()

  const postFileContents = `${allPosts}`

  // Create the cache folder if it doesn't exist
  try {
    fs.readdirSync('public/cache')
  } catch (e) {
    fs.mkdirSync('public/cache')
  }

  // Create our cached posts JSON
  fs.writeFile('public/cache/resume.json', postFileContents, (err) => {
    if (err) return console.log(err)
    console.log('Posts cached.')
  })
}
