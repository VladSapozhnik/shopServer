export default () => ({
  app: {
    is_dev: process.env.NODE_ENV,
    cookie_domain: process.env.COOKIE_DOMAIN,
    port: process.env.PORT,
  },
  database: {
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_token: process.env.JWT_ACCESS_TOKEN,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
  },
});
