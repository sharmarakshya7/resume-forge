import dotenv from 'dotenv';
dotenv.config();

const config = {
  port:      process.env.PORT       || 5000,
  nodeEnv:   process.env.NODE_ENV   || 'development',
  mongoUri:  process.env.MONGO_URI,
  jwt: {
    secret:     process.env.JWT_SECRET    || 'dev_secret_change_in_production',
    expiresIn:  process.env.JWT_EXPIRES_IN || '7d',
  },
  email: {
    host:  process.env.EMAIL_HOST,
    port:  Number(process.env.EMAIL_PORT) || 587,
    user:  process.env.EMAIL_USER,
    pass:  process.env.EMAIL_PASS,
    from:  process.env.EMAIL_FROM,
  },
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
};

export default config;
