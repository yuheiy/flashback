// @flow
import React from 'react'
import Link from 'next/link'
import Next from './Next'
import Prev from './Prev'
import All from './All'
import type {DiaryObjectType} from '../../types'

type Props = {
  +nextDiary?: DiaryObjectType,
  +prevDiary?: DiaryObjectType,
};

export default class ArticleNavigation extends React.Component<void, Props, void> {
  render() {
    const {nextDiary, prevDiary} = this.props

    return <nav className="ArticleNavigation">
      <ul>
        {nextDiary && <li className="ArticleNavigation_Next">
          <Link
            href={`/diary?id=${nextDiary.id}`}
            as={`/diaries/${nextDiary.id}`}><a>
            <Next />
          </a></Link>
        </li>}
        {prevDiary && <li className="ArticleNavigation_Prev">
          <Link
            href={`/diary?id=${prevDiary.id}`}
            as={`/diaries/${prevDiary.id}`}><a>
            <Prev />
          </a></Link>
        </li>}
        <li className="ArticleNavigation_All">
          <Link href="/"><a>
            <All />
          </a></Link>
        </li>
      </ul>
    </nav>
  }
}
