// @flow
import React from 'react'

type Props = {
  +children?: any,
};

export default class Main extends React.Component<void, Props, void> {
  render() {
    return <main className="Main">
      {this.props.children}
    </main>
  }
}
