const withPWA = require('next-pwa');
 
module.exports = withPWA({
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap.js');
    }

    return config;
  },
  pwa: {
    dest: 'public'
  }
});