import auth from './auth/auth.reducer';
import app from './app/app.reducer';

export const API_URL = 'http://ec2-13-250-2-39.ap-southeast-1.compute.amazonaws.com/api';
export const BUCKET_URL = 'https://s3.ap-south-1.amazonaws.com/phototype';

const reducers = {
  auth,
  app,
};

export default reducers;
