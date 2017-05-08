// @flow
import React from 'react'
import classNames from 'classnames'

type Props = {
  +children?: any,
  +isHome?: boolean,
};

export default class Main extends React.Component<void, Props, void> {
  render() {
    const {isHome} = this.props

    return <main className={classNames('Main', {'-home': isHome})}>
      {this.props.children}
    </main>
  }
}
