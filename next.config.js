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
  // experimental: {
  //   esmExternals: false,
  //   jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  // },
  compiler: {
    styledComponents: true
  },
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
  //     fs: false
  //   }

  //   return config
  // }
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
}
