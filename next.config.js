const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
 
module.exports = withPWA({
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap.js');
    }
    return config;
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    swSrc: 'service-worker.js',
    runtimeCaching
  }
});