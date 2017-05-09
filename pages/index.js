// @flow
import React from 'react'
import Layout from '../components/Layout'
import ArticleLink from '../components/ArticleLink'
import ArticleHeader from '../components/ArticleHeader'
import {fetchAllDiaries} from '../utils/postApi'
import type {DiaryObjectType} from '../types'

type Props = {
  +url: any,
  +diaries: Array<DiaryObjectType>,
  +hasError?: boolean,
};

const description = 'おじさんによるおじさんの記憶を綴るゆるフワ日記。'
const ogImage = '/static/ogp.png'

export default class HomePage extends React.Component<void, Props, void> {
  static async getInitialProps() {
    try {
      const diaries = await fetchAllDiaries()
      return {
        diaries,
      }
    } catch (err) {
      console.error(err)
      return {
        hasError: true
      }
    }
  }

  render() {
    const {hasError, url, diaries} = this.props

    if (hasError) {
      return <Layout
        pathname={url.pathname}
        description={description}
        image={ogImage}>
        <p role="alert">記事の取得に失敗しました。</p>
      </Layout>
    }

    return <Layout
      pathname={url.pathname}
      description={description}
      image={ogImage}>
      {diaries.map(diary => {
        const {caption, ...cover} = diary.cover
        return <section key={diary.id}>
          <ArticleLink
            href={`/diary?id=${diary.id}`}
            as={`/diaries/${diary.id}`}>
            <ArticleHeader
              title={diary.title}
              published={diary.published}
              cover={cover}
              isHome={true} />
          </ArticleLink>
        </section>
      })}
    </Layout>
  }
}
