// @flow
import React from 'react'
import Link from 'next/link'

type Props = {
  +href: string,
  +as: string,
  +children?: any,
};

export default class ArticleLink extends React.Component<void, Props, void> {
  render() {
    const {href, as, children} = this.props
    return <Link href={href} as={as}>
      <a className="ArticleLink">
        {children}
      </a>
    </Link>
  }
}
