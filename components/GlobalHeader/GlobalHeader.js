// @flow
import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Logo from './Logo'

type Props = {
  +isHome: boolean,
};

export default class GlobalHeader extends React.Component<void, Props, void> {
  render() {
    const {isHome} = this.props

    return <header className={classNames('GlobalHeader', {'-home': isHome})}>
      <h1>
        <Link href="/"><a>
          <Logo />
        </a></Link>
      </h1>
    </header>
  }
}
