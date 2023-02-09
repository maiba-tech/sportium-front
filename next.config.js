const path = require('path')

module.exports = {
  compiler:{
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.dicebear.com',
        port: '',
        pathname: '/**',
      },
    ]
  },
  trailingSlash: true,
  reactStrictMode: false,

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
      fs: false
    }

    return config
  }
}
