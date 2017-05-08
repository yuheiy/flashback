// @flow
import remark from 'remark'
import html from 'remark-html'

let processer

const getProcesser = () => {
  if (!processer) {
    processer = remark().use(html)
  }

  return processer
}

export default (markdown: string) => {
  return getProcesser().processSync(markdown).contents
}
