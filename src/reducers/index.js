import auth from './auth/auth.reducer';
import app from './app/app.reducer';
import create from './create/create.reducer';

export const API_URL = 'http://phototype.me/api';
export const BUCKET_URL = 'https://s3-ap-southeast-1.amazonaws.com/phototype/';

const reducers = {
  auth,
  app,
  create
};

export default reducers;
