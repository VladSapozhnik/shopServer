export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  cookie_domain: process.env.COOKIE_DOMAIN,
  is_dev: process.env.NODE_ENV,
});
