import { postRefreshToken } from '@/app/http/post.refreshToken';
import { tokens } from './TokensSession';

export const newTokensProvider = async () => {
  try {
    const { accessToken, refreshToken, userId } = tokens;
    const newTokens = await postRefreshToken({ refreshToken, userId });

    localStorage.setItem('tokens', JSON.stringify(newTokens));
  } catch (error) {
    console.log(error);
  }
};
