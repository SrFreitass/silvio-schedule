import { tokens } from '@/providers/TokensSession';
import axios from 'axios';

export const axiosInstace = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`,
  headers: { 'access-token': tokens.accessToken },
});
