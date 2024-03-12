import { postRefreshToken } from '@/app/http/post.refreshToken';

export const newTokensProvider = async () => {
  try {
    const tokens = JSON.parse(localStorage.getItem('tokens') || '') as {
      accessToken: string;
      refreshToken: string;
    };

    const refreshToken = tokens?.refreshToken;

    if (!refreshToken) return;

    const newTokens = await postRefreshToken({ refreshToken });
    localStorage.setItem('tokens', JSON.stringify(newTokens.data));
  } catch (error) {
    localStorage.removeItem('tokens');
  }
};
