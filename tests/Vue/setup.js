// setup JSDOM
require('jsdom-global')()

// make expect available globally
global.expect = require('expect')

// @see https://github.com/vuejs/vue-cli/issues/2128
window.Date = Date
