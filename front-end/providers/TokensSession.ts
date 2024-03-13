import { jwtDecode } from 'jwt-decode';

const getTokens = () => {
  try {
    const { accessToken, refreshToken } = JSON.parse(
      localStorage.getItem('tokens') || '{}',
    ) as {
      accessToken: string;
      refreshToken: string;
    };

    const { userId } = jwtDecode(accessToken) as {
      userId: string;
    };

    return {
      userId,
      accessToken,
      refreshToken,
    };
  } catch (err) {
    return {
      userId: '',
      accessToken: '',
      refreshToken: '',
    };
  }
};

export const tokens = getTokens();
