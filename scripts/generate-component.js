#!/usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const names = process.argv.slice(2)

names.forEach(name => {
  const dirName = path.join(__dirname, '../components', name)

  if (fs.existsSync(dirName)) {
    console.log(`\u001b[31m${name} is already exists !\u001b[0m`)
    return
  }

  mkdirp.sync(dirName)

  ;[
    [
      path.join(dirName, `${name}.js`),
      `// @flow
import React from 'react'

type Props = {};

export default class ${name} extends React.Component<void, Props, void> {
  render() {
    return <div className="${name}">${name}</div>
  }
}
`,
    ], [
      path.join(dirName, `${name}.scss`),
      `.${name} {
}
`,
    ], [
      path.join(dirName, 'index.js'),
      `// @flow
import ${name} from './${name}'

export default ${name}
`
    ]
  ].forEach(([file, data]) => {
    fs.writeFileSync(file, data)
  })

  console.log(`\u001b[32m${name} was generated !\u001b[0m`);
})
