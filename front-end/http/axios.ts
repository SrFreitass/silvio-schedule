import { tokens } from '@/providers/TokensSession';
import axios from 'axios';

export const axiosInstace = axios.create({
  baseURL: 'http://localhost:8081/api/v1',
  headers: { 'access-token': tokens.accessToken },
});
