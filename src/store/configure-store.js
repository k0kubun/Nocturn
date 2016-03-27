if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configure-store.production');
} else {
  module.exports = require('./configure-store.development');
}
