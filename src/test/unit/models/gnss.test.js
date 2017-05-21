/* eslint-env mocha */

'use strict'

import mongoose from 'mongoose'
import {Mockgoose} from 'mockgoose'
const mockgoose = new Mockgoose(mongoose)

import assert from 'assert'
import config from '~/config/config'
import Gnss from '~/app/models/gnss'

mongoose.Promise = global.Promise

describe('Gnss Model', () => {
  before(async () => {
    await mockgoose.prepareStorage()
    await mongoose.connect(config.db)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  afterEach(async () => {
    await mockgoose.helper.reset()
  })

  it('should save gnss success', async () => {
    let model = await new Gnss({imei: 1,
      date: new Date(),
      coord: {lng: 1.0, lat: 1.0}
    }).save()
    assert.equal(model.imei, 1)
  })
})
