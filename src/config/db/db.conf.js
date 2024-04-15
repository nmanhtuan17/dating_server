import mongoose from "mongoose"

const url = process.env.MONGO_URL

export const connect = () => {
  mongoose.connect(url)
    .then(() => console.log('connect db sucess'))
    .catch((err) => console.log('connect err', err))
}

