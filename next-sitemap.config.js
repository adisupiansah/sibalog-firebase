// next-sitemap.config.js
module.exports = {
    siteUrl: 'https://sibalog.vercel.app',
    generateRobotsTxt: true,
    exclude: ['/404'],
    additionalPaths: async (params) => {
      return [
        { loc: '/', changefreq: 'daily', priority: 0.9 },
        { loc: '/viewharwat', changefreq: 'weekly', priority: 0.8 },
      ];
    },
  };