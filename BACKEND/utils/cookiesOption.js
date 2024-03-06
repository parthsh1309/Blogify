export const options = {
  accessToken: {
    httpOnly: false,
    secure: true,
    expires: new Date(Date.now() + 86400000),
    sameSite:'none'
  },
  refreshToken: {
    httpOnly: false,
    secure: true,
    expires:new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)),
    sameSite:'none'
  }
};


