/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
});

module.exports = {
  useFileSystemPublicRoutes: true,
  env: {
    HOST: 'localhost',
    PORT: 4100,
    NEXTAUTH_URL: 'http://account.harmonypay.test',
    API_SERVER_URL: 'http://api.harmonypay.test',
    GRAPHQL_ENDPOINT: 'https://graphql.harmonypay.one/v1/graphql',
    HASURA_SECRET: '5cc3ed37147dc100fa1da57fc37016579a667b657878e3e5764119806f17fb1a'
  },
  withBundleAnalyzer
}
