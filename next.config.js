const withPWA = require('next-pwa');
 
module.exports = withPWA({
  poweredByHead: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap.js');
    }
    return config;
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    swSrc: 'service-worker.js'
  },
  future: { webpack5: true }
});