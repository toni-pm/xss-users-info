const express = require('express')
const { handleError } = require('./config/error')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json({ limit: '5mb' }))

// Routes
require('./routes')(app)

// 404 Not found error
app.use((req, res, next) => {
  console.error('Not found error')
  return res.sendFile('default.gif', { root: path.join(__dirname, '/assets') })
})

// Error handling
process.on('uncaughtException', err => {
  console.fatal('----- Uncaught exception -----')
  console.fatal(err)
  console.fatal('----------------------------------')
})

process.on('unhandledRejection', err => {
  console.fatal('----- Unhandled Rejection -----')
  console.fatal(err)
  console.fatal('----------------------------------')
})

app.use((err, req, res, next) => {
  handleError(err, req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
