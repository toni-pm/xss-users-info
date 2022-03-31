const router = require('express').Router()
const request = require('request')
const middleware = require('../middleware/info.middleware')
const images = require('../assets/images')
const path = require('path')

router.get('/',
  middleware,
  async (req, res) => {
    const url = images[Math.floor(Math.random() * images.length)]
    return sendFile(url, req, res)
  })

router.get('/:position',
  middleware,
  async (req, res) => {
    const { position } = req.params
    if (position >= images.length) {
      return res.sendFile('default.gif', { root: path.join(__dirname, '../assets') })
    }
    const url = images[position]
    return sendFile(url, req, res)
  })

const sendFile = (url, req, res) => {
  request({
    url: url,
    encoding: null
  },
  (err, resp) => {
    res.set('Content-Type', 'image/jpeg')
    if (!err && resp.statusCode === 200) {
      return res.send(resp.body)
    } else {
      return res.sendFile('default.gif', { root: path.join(__dirname, '../assets') })
    }
  })
}

module.exports = app => {
  app.use(router)
}
