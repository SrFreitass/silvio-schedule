import { http } from '@/models/http.interface';
import { newTokensProvider } from '@/providers/newTokens';
import { AxiosError } from 'axios';
import { axiosInstace } from './axios';

export const patchUpdateRoleUser = async (userId: string) => {
  try {
    const userApproved = await axiosInstace.patch<http<string[]>>(
      `/admin/user/approve/${userId}`,
    );
    return userApproved.data;
  } catch (error) {
    console.error(error);
    if (!(error instanceof AxiosError)) return;

    const messageError = error.response?.data?.message;

    if (messageError === 'jwt expired') {
      await newTokensProvider();
      await patchUpdateRoleUser(userId);
    }
  }
};
