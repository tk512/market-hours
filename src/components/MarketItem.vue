<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <tr v-bind:class="[ isMarketOpen(market) ? 'bg-success' : 'bg-danger', '']" v-show="show">
    <th scope="row">{{ market.name }} <span class="hidden">{{ market.hidden }}</span></th>
    <td class="hidden-md-down">{{market.id}}</td>
    <td>{{market.city}}, {{market.country}} ({{ timeZone }}{{timeDifference(market.tz)}})</td>
    <td>{{market.open}}</td>
    <td>{{market.close}}</td>
    <td>{{market.lunch}}</td>
  </tr>
</template>

<script>
  import moment from 'moment-timezone'
  import shared from '../shared'
  export default {
    props: ['market', 'showOpenMarkets', 'showClosedMarkets'],
    data () {
      return {
        show: true,
        timeZone: moment.tz(shared.clientTz).zoneAbbr()
      }
    },
    methods: {
      /**
       * @param market
       * @returns True if market is open and false if it is closed
       */
      isMarketOpen: function (market) {
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

        // Public holiday check per exchange

        if (isOpen) {
          this.show = this.showOpenMarkets
        } else {
          this.show = this.showClosedMarkets
        }
        return isOpen
      },

      timeDifference: function (otherTz) {
        const there = moment.tz(otherTz)
        const here = moment.tz(shared.clientTz)
        const diff = (there.utcOffset() - here.utcOffset()) / 60
        return (diff > 0 ? '+' : '') + (diff === 0 ? '+0' : diff)
      }
    }
  }
</script>

<style scoped>
  .hidden {
    display: none;
  }
</style>
