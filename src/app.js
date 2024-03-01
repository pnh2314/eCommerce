import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// ------ init middleware ------ //
app.use(morgan('dev')) // :method :url :status :response-time ms - :res[content-length]
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) // disable cors policy

// ------ init database ------ //
import Database from './v1/databases/init.mongodb.js'
new Database()

// ------ init routes ------ //
import router from './v1/routes/index.js'
app.use(router)

// 404 Not Found Middleware
app.use((req, res, next) => {
  const error = new Error('404 Not Found')
  error.status = 404
  next(error)
})

// ------ handle error ----- //
app.use((error, req, res, next) => {
  const code = error.statusCode || 500
  return res.status(code).json({
    code: code,
    message: error.message || 'Internal Server Error',
    stack: error.stack,
  })
})

export default app
