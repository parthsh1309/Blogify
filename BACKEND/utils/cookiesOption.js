export const options = {
  accessToken: {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 86400000),
  },
  refreshToken: {
    httpOnly: true,
    secure: true,
    expires:new Date(Date.now() + (10 * 24 * 60 * 60 * 1000))
  }
};


