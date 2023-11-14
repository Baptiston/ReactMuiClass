import axios, {AxiosResponse, AxiosError } from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';

const Api = axios.create({
  baseURL: Environment.BASE_URL
});

Api.interceptors.response.use(
  (response: AxiosResponse) => responseInterceptor(response),
  (error: AxiosError) => errorInterceptor(error)
);