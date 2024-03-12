export const tokens = JSON.parse(localStorage.getItem('tokens') || '') as {
  accessToken: string;
  refreshToken: string;
};
