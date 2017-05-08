// @flow
import React from 'react'

export default class GlobalFooter extends React.Component {
  render() {
    return <footer className="GlobalFooter">
      <address>
        <dl>
          <dt>書き手</dt>
          <dd>
            <ruby>
              <rb>兵庫</rb>
              <rp>（</rp>
              <rt>ひょうご</rt>
              <rp>）</rp>
            </ruby>
            {' '}
            <ruby>
              <rb>達人</rb>
              <rp>（</rp>
              <rt>たつと</rt>
              <rp>）</rp>
            </ruby>
          </dd>
        </dl>
      </address>
    </footer>
  }
}
