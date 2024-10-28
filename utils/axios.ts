import axios from 'axios';
import {USER_URL} from '../constants/url.constants';

export const axiosInstance = axios.create({
  baseURL: USER_URL,
});
