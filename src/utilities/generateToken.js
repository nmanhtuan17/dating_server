import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign({
      id: user._id
    },
    process.env.JWT_ACCESS_KEY,
    {expiresIn: '2d'}
  )
}
export const generateRefreshToken = (user) => {
  return jwt.sign({
      id: user._id
    },
    process.env.JWT_REFRESH_KEY,
    {expiresIn: '365d'}
  )
}
