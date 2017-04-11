'use strict'

export const parse = (message) => {
  message = message.replace('\n', '')
  if (message === '') return null
  let result = {}
  let imei = message.substring(0, 15)
  let data = message.substring(16, message.length)
  let fields = data.split('|')

  result.imei = imei
  result.date = parseDate(fields[0])
  result.type = fields[1]
  result.angle = parseDouble(fields[2])
  result.speed = parseDouble(fields[3])
  result.hdop = parseDouble(fields[4])
  result.lat = parseDouble(fields[5])
  result.long = parseDouble(fields[6])
  result.sats = parseDouble(fields[7])
  result.coord = {lng: parseDouble(fields[6]), lat: parseDouble(fields[5])}
  result.satprn = fields[8].replace(/\\?\\n/g, '')

  return result
}

export const parseDate = (string) => {
  if (string.length === 15) {
    let DD = parseInt(string.substring(0, 2))
    let MM = parseInt(string.substring(2, 4))
    let YYYY = 2000 + parseInt(string.substring(4, 6))
    let HH = parseInt(string.substring(6, 8))
    let mm = parseInt(string.substring(8, 10))
    let ss = parseInt(string.substring(10, 12))
    let SS = parseInt(string.substring(13, 15))
    return new Date(Date.UTC(YYYY, MM, DD, HH, mm, ss, SS))
  } else {
    return null
  }
}
export const parseDouble = (string) => {
  let data = parseFloat(string)
  if (!isNaN(data)) {
    return data
  } else {
    return null
  }
}
