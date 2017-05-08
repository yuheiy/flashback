// @flow
import React from 'react'
import {findDOMNode} from 'react-dom'
import debounce from 'lodash.debounce'

type Props = {
  +children?: any,
};

const isBrowser = typeof window !== 'undefined'
const isFirefox = isBrowser && navigator.userAgent.includes('Firefox')

export default class ArticleBody extends React.Component<void, Props, void> {
  debouncedAdjustSize: () => void;

  adjustSize = () => {
    const el = findDOMNode(this)

    // bug fix
    if (isFirefox) {
      el.style.height = 'auto'

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!el) {
            return
          }

          el.style.height = ''
          el.style.paddingBottom = ''
          const fullHeight = el.scrollHeight
          const defaultHeight = Number(getComputedStyle(el).height.replace('px', ''))
          el.style.paddingBottom = `${fullHeight - defaultHeight}px`
        })
      })

      return
    }

    el.style.paddingBottom = ''
    const fullHeight = el.scrollHeight
    const defaultHeight = Number(getComputedStyle(el).height.replace('px', ''))
    el.style.paddingBottom = `${fullHeight - defaultHeight}px`
  }

  componentDidMount() {
    this.debouncedAdjustSize = debounce(this.adjustSize, 300)
    window.addEventListener('resize', this.debouncedAdjustSize)
    this.adjustSize()
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.children !== prevProps.children) {
      this.debouncedAdjustSize()
    }
  }

  componentWillUnmount() {
    this.debouncedAdjustSize.cancel()
    window.removeEventListener('resize', this.debouncedAdjustSize)
  }

  render() {
    return <div
      className="ArticleBody"
      dangerouslySetInnerHTML={{__html: this.props.children}} />
  }
}
