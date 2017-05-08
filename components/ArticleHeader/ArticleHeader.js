// @flow
import React from 'react'
import debounce from 'lodash.debounce'

type Props = {
  +title: string,
  +published: string,
  +cover: {
    +image: string,
    +width: number,
    +height: number,
    +alternateText: string,
    +caption?: string,
  },
};

type State = {
  isFirefox: boolean,
};

const isBrowser = typeof window !== 'undefined'
const isFirefox = isBrowser && navigator.userAgent.includes('Firefox')

const convertDateToDisplayTime = (date) => {
  const splits = date.split('-').map(str => {
    return str
    .replace(/^0*/, '')
    .replace(/[0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xfee0))
  })
  return `${splits[0]}年${splits[1]}月${splits[2]}日`
}

export default class ArticleHeader extends React.Component<void, Props, State> {
  textGroup: HTMLDivElement;
  image: HTMLImageElement;
  debouncedSetMaxHeight: () => void;

  state = {
    isFirefox: false,
  }

  setMaxHeight = () => {
    if (isFirefox) {
      return
    }

    if (!this.image) {
      return
    }

    const {cover} = this.props

    if (!cover.caption) {
      this.textGroup.style.maxHeight = ''
      return
    }

    let imageHeight: number = 0

    if (this.image.complete) {
      imageHeight = this.image.offsetHeight
    } else {
      const ratio = cover.height / cover.width
      imageHeight = Math.ceil(this.image.offsetWidth * ratio)
    }

    this.textGroup.style.maxHeight = `${imageHeight}px`
  }

  componentDidMount() {
    this.debouncedSetMaxHeight = debounce(this.setMaxHeight, 300)
    window.addEventListener('resize', this.debouncedSetMaxHeight)
    this.setMaxHeight()

    if (isFirefox) {
      this.setState({isFirefox})
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.debouncedSetMaxHeight()
    }
  }

  componentWillUnmount() {
    this.debouncedSetMaxHeight.cancel()
    window.removeEventListener('resize', this.debouncedSetMaxHeight)
  }

  render() {
    const {title, published, cover} = this.props
    const textGroupStyle = this.state.isFirefox ? {
      writingMode: 'horizontal-tb',
    } : {}

    return <div className="ArticleHeader">
      <div
        ref={c => this.textGroup = c}
        className="ArticleHeader_TextGroup"
        style={textGroupStyle}>
        <h1>{title}</h1>
        <footer>
          <time dateTime={published}>{convertDateToDisplayTime(published)}</time>
        </footer>
      </div>
      <figure className="ArticleHeader_Cover">
        <img
          ref={c => this.image = c}
          src={cover.image}
          width={cover.width}
          height={cover.height}
          alt={cover.alternateText} />
        {cover.caption && <figcaption>{cover.caption}</figcaption>}
      </figure>
    </div>
  }
}
