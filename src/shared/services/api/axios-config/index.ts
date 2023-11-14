import axios, {AxiosResponse, AxiosError } from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: 'http://localhost:3333'
});

Api.interceptors.response.use(
  (response: AxiosResponse) => responseInterceptor(response),
  (error: AxiosError) => errorInterceptor(error)
);