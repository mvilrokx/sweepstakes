module.exports = {
  use: [
    'postcss-import',
    'postcss-discard-comments',
    'postcss-custom-media',
    'postcss-custom-properties',
    'postcss-calc',
    'postcss-nesting',
    'autoprefixer',
    'postcss-reporter'
  ],
  input: 'src/stylesheets/input.css',
  output: 'public/stylesheets/style.css',
  'local-plugins': true,
  autoprefixer: {
    browsers: '> 5%'
  }
}
