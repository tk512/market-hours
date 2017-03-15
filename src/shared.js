import moment from 'moment-timezone'

export default {
  clientTz: null,

  timeDifference: function (otherTz) {
    const there = moment.tz(otherTz)
    const here = moment.tz(this.clientTz)
    const diff = (there.utcOffset() - here.utcOffset()) / 60
    return (diff > 0 ? '+' : '') + (diff === 0 ? '+0' : diff)
  },

  isMarkedOpen: function (market) {
    const place = moment.tz(market.tz)
    const opensTime = moment(market.open, 'HH:mm')
    const closesTime = moment(market.close, 'HH:mm')

    const o = place.clone().hour(opensTime.hour()).minute(opensTime.minute()).second(0)
    const c = place.clone().hour(closesTime.hour()).minute(closesTime.minute()).second(0)

    let isOpen

    // Lunch check
    if ('lunch' in market) {
      let lunchParts = market['lunch'].split('-')
      const lBeginTime = moment(lunchParts[0], 'HH:mm')
      const lEndTime = moment(lunchParts[1], 'HH:mm')
      isOpen = place.isBetween(o, c) && !place.isBetween(lBeginTime, lEndTime)
    } else {
      isOpen = place.isBetween(o, c)
    }

    // Weekends check
    if (place.isoWeekday() === 0 || place.isoWeekday() === 7) {
      isOpen = false
    }
    return isOpen
  }
}
