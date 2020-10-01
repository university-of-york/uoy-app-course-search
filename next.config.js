const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Retrieve assets from the correct API Gateway Stage in AWS.
  assetPrefix: isProd ? '/v1' : '',
}
