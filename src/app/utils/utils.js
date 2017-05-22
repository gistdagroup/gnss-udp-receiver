'use strict'

import moment from 'moment'

export const createLocationHash = (data) => {
  return data.imei + '-' + moment(data.date).format();
}