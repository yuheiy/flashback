// @flow
import React from 'react'

type Props = {
  +children?: any,
};

export default class Content extends React.Component<void, Props, void> {
  render() {
    return <main className="Content">
      {this.props.children}
    </main>
  }
}
