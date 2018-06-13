module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-discard-comments'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    require('postcss-nesting'),
    require('autoprefixer')({
      browsers: '> 5%',
    }),
    require('postcss-reporter'),
  ],
  'local-plugins': true,
}
