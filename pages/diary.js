// @flow
import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import ArticleHeader from '../components/ArticleHeader'
import ArticleBody from '../components/ArticleBody'
import ArticleNavigation from '../components/ArticleNavigation'
import striptags from 'striptags'
import {fetchDiaryById, fetchNextDiary, fetchPrevDiary} from '../utils/postApi'
import type {DiaryObjectType} from '../types'

type Props = {
  +url: any,
  +diary: DiaryObjectType,
  +nextDiary: DiaryObjectType,
  +prevDiary: DiaryObjectType,
  +hasError?: boolean,
};

const getTextFromHtml = (html: string, limit: number) => {
  return striptags(html).slice(0, limit)
}

export default class DiaryPage extends React.Component<void, Props, void> {
  static async getInitialProps({query: {id}}) {
    if (!id) {
      return {
        hasError: true,
      }
    }

    try {
      const [
        diary,
        nextDiary,
        prevDiary,
      ] = await Promise.all([
        fetchDiaryById(id),
        fetchNextDiary(id),
        fetchPrevDiary(id),
      ])

      return {
        diary,
        nextDiary,
        prevDiary,
      }
    } catch (err) {
      console.error(err)
      return {
        hasError: true,
      }
    }
  }

  render() {
    const {hasError, url, diary, nextDiary, prevDiary} = this.props

    if (hasError) {
      return <Layout pathname={`/diaries/${diary.id}`}>
        <p role="alert">記事の取得に失敗しました。</p>
      </Layout>
    }

    return <Layout
      title={diary.title}
      description={getTextFromHtml(diary.body, 160)}
      image={diary.cover.image}
      pathname={`/diaries/${diary.id}`}>
      <article>
        <ArticleHeader
          title={diary.title}
          published={diary.published}
          cover={diary.cover} />

        <ArticleBody>
          {diary.body}
        </ArticleBody>
      </article>

      <ArticleNavigation
        nextDiary={nextDiary}
        prevDiary={prevDiary} />
    </Layout>
  }
}
