// @flow
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import GlobalHeader from '../GlobalHeader'
import GlobalFooter from '../GlobalFooter'
import Content from '../Content'
import {SITE_TITLE, SITE_URL} from '../../constants'
import styleSheet from '../../styles/index.scss'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  const ua = navigator.userAgent

  if (ua.match(/Mac OS X/)) {
    document.documentElement.dataset.os = 'Mac OS'
  } else if (ua.match(/iPhone OS/) || ua.match(/iPad; CPU OS/)) {
    document.documentElement.dataset.os = 'iOS'
  }
}

NProgress.configure({showSpinner: false})
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

console.log('Code: https://github.com/yuheiy/flashback')

type DefaultProps = {
  description: string,
};

type Props = {
  +title?: string,
  +description: string,
  +image?: string,
  +pathname: string,
  +children?: any,
};

const getFullUrl = (pathOrUrl: string) => {
  return /^https?:\/\//.test(pathOrUrl)
    ? pathOrUrl
    : `${SITE_URL}${pathOrUrl}`
}

export default class Layout extends React.Component<DefaultProps, Props, void> {
  static defaultProps = {
    description: '',
  }

  render() {
    const {title, description, image, pathname, children} = this.props
    const documentTitle = title ? `${title} - ${SITE_TITLE}` : SITE_TITLE
    const isHome = pathname === '/'

    return <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <title>{documentTitle}</title>
        <link rel="canonical" href={pathname} />
        <link rel="alternate" href="/atom.xml" type="application/atom+xml" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/hannari.css" />
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        {image && <meta name="twitter:card" content="summary_large_image" />}
        <meta property="og:title" content={title || SITE_TITLE} />
        <meta property="og:type" content={isHome ? 'website' : 'article'} />
        {image && <meta property="og:image" content={getFullUrl(image)} />}
        <meta property="og:url" content={getFullUrl(pathname)} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:locale" content="ja_JP" />
      </Head>

      <GlobalHeader isHome={isHome} />
      <Content>
        {this.props.children}
      </Content>
      <GlobalFooter />
    </div>
  }
}
