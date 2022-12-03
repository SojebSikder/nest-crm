export default () => ({
  app: {
    name: process.env.APP_NAME,
    key: process.env.APP_KEY,
    url: process.env.APP_URL,
    client_app_url: process.env.CLIENT_APP_URL,
    port: parseInt(process.env.PORT, 10) || 3000,
  },

  database: {
    url: process.env.DATABASE_URL,
  },

  security: {
    salt: 10,
  },

  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    user: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM_NAME,
  },

  auth: {
    facebook: {
      app_id: process.env.FACEBOOK_APP_ID,
      app_secret: process.env.FACEBOOK_APP_SECRET,
      callback: process.env.FACEBOOK_CALLBACK_URL,
    },
  },
});
