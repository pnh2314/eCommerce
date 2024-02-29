import app from './src/app.js'

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log('\nServer closed!'))
  process.exit(0)
})
