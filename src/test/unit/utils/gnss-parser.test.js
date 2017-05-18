/* eslint-env mocha */

'use strict'

import * as parser from '~/app/utils/gnss-parser.js'
import assert from 'assert'

const message = '358901049754804|170411063349.80|1A|1|0.052|0.98|1340.75488|10031.61590|15|G27,G16,S40,G23,G26,G09,G03,S41,G08,G07,B07,B02,B14,B10,B05'
const message2 = '520030500494099|190317042421.00|2|0BC7|291A110|31'
const message3 = 'f0ddaf005b460c1|170411063349.80|3|1|0.050|1.00|13.77836544|100.54443871|||'

describe('gnss-parser', () => {
  describe('parse imei', () => {
    it('should get imie from message 1', () => {
      let expected = '358901049754804'

      let data = parser.parse(message)
      let actual = data.imei

      assert.equal(actual, expected)
    })

    it('should get imie from message 2', () => {
      let expected = '520030500494099'

      let data = parser.parse(message2)
      let actual = data.imei

      assert.equal(actual, expected)
    })

    it('should get imie from message 3', () => {
      let expected = 'f0ddaf005b460c1'

      let data = parser.parse(message3)
      let actual = data.imei

      assert.equal(actual, expected)
    })
  })

  describe('parse date', () => {
    it('should get date from message 1', () => {
      let expected = new Date(Date.UTC(2011, 4, 17, 6, 33, 49, 80))

      let data = parser.parse(message)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })

    it('should get date from message 2', () => {
      let expected = new Date(Date.UTC(2017, 3, 19, 4, 24, 21, 0))

      let data = parser.parse(message2)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })

    it('should get date from message 3', () => {
      let expected = new Date(Date.UTC(2011, 4, 17, 6, 33, 49, 80))

      let data = parser.parse(message3)
      let actual = data.date

      assert.equal(actual.getTime(), expected.getTime())
    })
  })

  describe('parse type', () => {
    it('should get 1A type from message 1', () => {
      let expected = '1A'

      let data = parser.parse(message)
      let actual = data.type

      assert.equal(actual, expected)
    })

    it('should get type 2 from message 2', () => {
      let expected = '2'

      let data = parser.parse(message2)
      let actual = data.type

      assert.equal(actual, expected)
    })

    it('should parse type 3 from message 3', () => {
      let expected = '3'

      let data = parser.parse(message3)
      let actual = data.type

      assert.equal(actual, expected)
    })
  })

  describe('parse anger', () => {
    it('should get anger from message 1', () => {
      let expected = 1

      let data = parser.parse(message)
      let actual = data.angle

      assert.equal(actual, expected)
    })

    it('should get anger from message 2', () => {
      let expected = null

      let data = parser.parse(message2)
      let actual = data.angle

      assert.equal(actual, expected)
    })

    it('should get anger from message 3', () => {
      let expected = 1

      let data = parser.parse(message3)
      let actual = data.angle

      assert.equal(actual, expected)
    })
  })

  describe('parse speed', () => {
    it('should get speed from message 1', () => {
      let expected = 0.052

      let data = parser.parse(message)
      let actual = data.speed

      assert.equal(actual, expected)
    })

    it('should not get speed from message 2', () => {
      let expected = null

      let data = parser.parse(message2)
      let actual = data.speed

      assert.equal(actual, expected)
    })

    it('should get speed from message 3', () => {
      let expected = 0.050

      let data = parser.parse(message3)
      let actual = data.speed

      assert.equal(actual, expected)
    })
  })

  describe('parse hdop', () => {
    it('should get hdop from message 1', () => {
      let expected = 0.98

      let data = parser.parse(message)
      let actual = data.hdop

      assert.equal(actual, expected)
    })

    it('should not get hdop from message 2', () => {
      let expected = null

      let data = parser.parse(message2)
      let actual = data.hdop

      assert.equal(actual, expected)
    })

    it('should get hdop from message 3', () => {
      let expected = 1

      let data = parser.parse(message3)
      let actual = data.hdop

      assert.equal(actual, expected)
    })
  })

  describe('parse coord', () => {
    it('should get coord from message 1', () => {
      let expected = { lng: 100.526931666666667, lat: 13.679248 }

      let data = parser.parse(message)
      let actual = data.coord

      assert.equal(parseFloat(actual.lng).toFixed(5), parseFloat(expected.lng).toFixed(5))
      assert.equal(parseFloat(actual.lat).toFixed(5), parseFloat(expected.lat).toFixed(5))
    })

    it('should get coord from message 2', () => {
      let expected = null

      let data = parser.parse(message2)
      let actual = data.coord

      assert.equal(actual, expected)
    })

    it('should get coord from message 3', () => {
      let expected = { lng: 100.54443871, lat: 13.77836544 }

      let data = parser.parse(message3)
      let actual = data.coord

      assert.equal(parseFloat(actual.lng).toFixed(5), parseFloat(expected.lng).toFixed(5))
      assert.equal(parseFloat(actual.lat).toFixed(5), parseFloat(expected.lat).toFixed(5))
    })
  })

  describe('parse sats', () => {
    it('should get sats from message 1', () => {
      let expected = 15

      let data = parser.parse(message)
      let actual = data.sats

      assert.equal(actual, expected)
    })

    it('should not get sats from message 2', () => {
      let expected = null

      let data = parser.parse(message2)
      let actual = data.sats

      assert.equal(actual, expected)
    })

    it('should get sats from message 3', () => {
      let expected = null

      let data = parser.parse(message3)
      let actual = data.sats

      assert.equal(actual, expected)
    })
  })

  describe('parse sat prn', () => {
    it('should parse sat prn', () => {
      let expected = 'G27,G16,S40,G23,G26,G09,G03,S41,G08,G07,B07,B02,B14,B10,B05'

      let data = parser.parse(message)
      let actual = data.satprn

      assert.equal(actual, expected)
    })
  })

  describe('parse area', () => {
    it('should null when parse area from message 1', () => {
      let expected = null

      let data = parser.parse(message)
      let actual = data.area

      assert.equal(actual, expected)
    })

    it('should parse area from message 2', () => {
      let expected = '0BC7'

      let data = parser.parse(message2)
      let actual = data.area

      assert.equal(actual, expected)
    })

    it('should null when parse area from message 3', () => {
      let expected = null

      let data = parser.parse(message3)
      let actual = data.area

      assert.equal(actual, expected)
    })
  })

  describe('parse cellId', () => {
    it('should null when parse cellId from message 1', () => {
      let expected = null

      let data = parser.parse(message)
      let actual = data.cellId

      assert.equal(actual, expected)
    })

    it('should parse cellId from message 2', () => {
      let expected = '291A110'

      let data = parser.parse(message2)
      let actual = data.cellId

      assert.equal(actual, expected)
    })

    it('should null when parse cellId from message 3', () => {
      let expected = null

      let data = parser.parse(message3)
      let actual = data.cellId

      assert.equal(actual, expected)
    })
  })

  describe('parse gsmSignel', () => {
    it('should null when parse gsmSignel from message 1', () => {
      let expected = null

      let data = parser.parse(message)
      let actual = data.gsmSignel

      assert.equal(actual, expected)
    })

    it('should parse gsmSignel from message 2', () => {
      let expected = '31'

      let data = parser.parse(message2)
      let actual = data.gsmSignel

      assert.equal(actual, expected)
    })

    it('should null when parse gsmSignel from message 3', () => {
      let expected = null

      let data = parser.parse(message3)
      let actual = data.gsmSignel

      assert.equal(actual, expected)
    })
  })

  describe('parse Date', () => {
    it('should parse date', () => {
      let expected = new Date(Date.UTC(2011, 4, 17, 6, 33, 49, 80))

      let actual = parser.parseDate('170411063349.80')

      assert.equal(actual.getTime(), expected.getTime())
    })
  })
})
