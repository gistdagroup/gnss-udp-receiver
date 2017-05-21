/* eslint-env mocha */

'use strict'

import * as controller from '~/app/controllers/gps'
import assert from 'assert'

import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)
import config from '~/config/config'

import Location from '~/app/models/location'
import Gnss from '~/app/models/gnss'

const messages = '$358901049754804|170411112334.20|1A|NULL|0.052|1.20|1340.75417|10031.61855|15|G01,G17,S41,S40,G28,G30,G11,G19,B07,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.40|1A|NULL|0.091|1.43|1340.75417|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.60|1A|NULL|0.037|1.43|1340.75417|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112334.80|1A|NULL|0.206|1.43|1340.75418|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n$358901049754804|170411112335.00|1A|NULL|0.085|1.43|1340.75418|10031.61855|14|G01,G17,S41,S40,G28,G30,G11,G19,B13,B05,B08,B11,B10,B02\n'

describe('gps-parser', () => {

  before(async() => {
    await mockgoose.prepareStorage()
    await mongoose.connect(config.db)
  })

  after(async() => {
    await mongoose.connection.close()
  })

  afterEach(async() => {
    await mockgoose.helper.reset()
  })

  describe('on receive message', () => {
    it('should parse messages', () => {
      let datas = controller.onReceive(messages)

      assert.equal(datas[0].imei, 358901049754804)
      assert.equal(datas[0].speed, 0.052)
      assert.equal(datas[1].speed, 0.091)
    })
  })

  describe('save', () => {
    it('should save gprmc success', async() => {
      let datas = [{
        imei: '358901049754804',
        date: new Date(),
        type: '1A',
        angle: null,
        speed: 0.052,
        hdop: 1.2,
        coord: {lng: 100.52697583333332, lat: 13.679236166666666},
        sats: 15,
        satprn: 'G01,G17,S41,S40,G28,G30,G11,G19,B07,B13,B05,B08,B11,B10,B02'
      }]

      await controller.save(datas)

      let gnsss = await Gnss.find({})
      assert.equal(gnsss.length, 1)
    })
  })
})
