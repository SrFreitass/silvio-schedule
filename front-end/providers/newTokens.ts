import { postRefreshToken } from '@/app/http/post.refreshToken';
import { tokens } from './TokensSession';

export const newTokensProvider = async () => {
  const { refreshToken, userId } = tokens;
  const newTokens = await postRefreshToken({ refreshToken, userId });

  localStorage.setItem('tokens', JSON.stringify(newTokens));
};
