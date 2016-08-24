module.exports = {
  // See http://brunch.io for documentation.
  files: {
    javascripts: {joinTo: 'app.js'},
    stylesheets: {joinTo: 'app.css'},
    templates: {joinTo: 'app.js'}
  },
  plugins: {
    babel: {
        presets: ['es2015', 'es2016', 'react'],
        ignore: [/web\/static\/vendor/],
        pattern: /\.(es6|jsx|js)$/
    },
    autoReload: {enabled: false}
  }
}
