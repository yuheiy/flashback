// @flow
import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  static getInitialProps ({renderPage}) {
    const {html, head} = renderPage()
    return {html, head}
  }

  render () {
    return <html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  }
}
