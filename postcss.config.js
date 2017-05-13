module.exports = ({env}) => {
  const dev = env !== 'production'

  return {
    plugins: [
      require('autoprefixer')({
        browsers: [
          '>5% in JP',
          'last 1 version',

          'not ie 11',
          'not ie_mob 11',
        ],
        cascade: false,
      }),
      ...(dev ? [] : [
        require('csswring')(),
      ]),
    ],
  }
}
