/**
 * Created by yuhogyun on 2017. 2. 3..
 */
const CONFIG = {
  BCRYPT_SALT_ROUNDS: 10,
  FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
  FACEBOOK_REDIRECT_URL: process.env.FACEBOOK_REDIRECT_URL || 'http://localhost:3000/auth/success',
  SESSION_SECRET_KEY: 'sdnfsdjfpdsfijdp!@#',
  MAILGUN_API_KEY: 'key-5071c2d41b08df0671c75464deda33f3',
  MAILGUN_DOMAIN: 'sandbox9c41f305e6c04852a25aa8d705b3a4c7.mailgun.org',
  NAVER_API_PROFILE: 'https://openapi.naver.com/v1/nid/me',
  NAVER_API_CLIENT_ID: 'nfRec7uCc36x_KoxxTzC',
  NAVER_API_CLIENT_SECRET: 'dPDGbaB_3V',
  NAVER_API_CLIENT_NAME: 'Roler'
};

export default CONFIG;
