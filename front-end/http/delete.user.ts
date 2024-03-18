import { http } from '@/models/http.interface';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { axiosInstace } from './axios';

export const deleteUser = async (userId: string) => {
  try {
    const userDeleted = await axiosInstace.delete<http<string[]>>(
      `/admin/user/disapprove/${userId}`,
    );
    return userDeleted.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      await newTokensProvider();
      await deleteUser(userId);
    }
  }
};
