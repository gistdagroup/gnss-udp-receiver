'use strict'

import * as parser from '~/app/utils/gnss-parser'
import Gnss from '~/app/models/gnss'
import logger from '~/config/logger'
import ua from 'universal-analytics'
const visitor = ua('UA-97830439-1')

export const onReceive = (message) => {
  let messages = message.toString('UTF-8')
  messages = messages.split('$')
  let datas = []
  for (let m of messages) {
    if (m) {
      let data = parser.parse(m)
      if (data) {
        logger.debug `push  ${data}`
        if (data.imei) {
          visitor.pageview('/udp' + data.imei).send()
        }
        datas.push(data)
      }
    }
  }
  return datas
}

export const save = async (datas) => {
  let promises = []
  for (let data of datas) {
    promises.push(new Gnss(data).save())
  }
  await Promise.all(promises)
}
