'use strict'

import fs from 'fs'
import path from 'path'
import dgram from 'dgram'
import config from '~/config/config'
import mongoose from 'mongoose'
import mockgoose from 'mockgoose'
import logger from '~/config/logger'
import * as controller from '~/app/controllers/gps'
import ua from 'universal-analytics'
const join = path.join
const models = join(__dirname, 'app/models')
const server = dgram.createSocket('udp4')
const port = process.env.PORT || 3000
logger.level = config.logger.level || 'debug'
const visitor = ua('UA-97830439-1')

mongoose.Promise = global.Promise

fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)))

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose)
    .then(() => mongoose.connect(config.db))
  listen()
} else {
  connect()
    .on('error', logger.error)
    .on('disconnected', connect)
    .once('open', listen)
}

function listen () {
  server.bind(3000)
  logger.info('Express app started on port ' + port)
}

function connect () {
  return mongoose.connect(config.db.uri, config.db.options).connection
}

server.on('error', (err) => {
  logger.error(`server error:\n${err.stack}`)
  server.close()
})

server.on('message', (msg, rinfo) => {
  logger.info(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)

  let datas = controller.onReceive(msg)
  controller.save(datas)

  visitor.pageview('/gnss').send()
})

server.on('listening', () => {
  var address = server.address()
  logger.info(`server listening ${address.address}:${address.port}`)
})
