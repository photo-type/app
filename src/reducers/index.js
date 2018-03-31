import auth from './auth/auth.reducer';
import app from './app/app.reducer';

export const API_URL = 'http://phototype.me/api';
export const BUCKET_URL = 'https://s3.ap-south-1.amazonaws.com/phototype';

const reducers = {
  auth,
  app,
};

export default reducers;
