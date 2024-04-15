import bcrypt from "bcrypt"
export const cryptPassword = (password) =>
  bcrypt.genSalt(10)
    .then((salt => bcrypt.hash(password, salt)))
    .then(hash => hash)

export const comparePassword = (password, hashPassword) =>
  bcrypt.compare(password, hashPassword)
    .then(resp => resp)