import dayjs from "dayjs"
import 'dotenv/config'

export default {
  product: 'Low Racing API',
  jwtSecret: process.env.SECRET_KEY,
  expiresIn: dayjs().add(30, 'days').unix,
  baseURL: process.env.BASE_URL,
}