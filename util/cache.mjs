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
        const source = await serialize(fileContents).then((data) => data)
        return {
          slug,
          file,
          mdx,
          source,
          ...matterResult,
        }
      })
    ).then((data) => data)
    // Return a big array of JSON
    const json = JSON.stringify(content)
    const data = content.map((item) => {
      const slug = item.slug
      const data = item.data
      return { slug, data }
    })
    const menuItems = JSON.stringify({ data })
    return {
      json,
      menuItems,
    }
  }

  const allPosts = await getAll()

  const postFileContents = `${allPosts.json}`

  // Create the cache folder if it doesn't exist
  try {
    fs.readdirSync('public/cache')
  } catch (e) {
    fs.mkdirSync('public/cache')
  }

  // Create our cached posts JSON
  fs.writeFile('public/cache/resume.json', postFileContents, (err) => {
    if (err) return console.log(err)
    console.log('Resume cache created')
  })

  fs.writeFile('public/cache/menu.json', allPosts.menuItems, (err) => {
    if (err) return console.log(err)
    console.log('Menu cache created')
  })
}
