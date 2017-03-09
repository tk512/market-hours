<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <tr v-bind:class="[ isMarketOpen(market) ? 'bg-success' : 'bg-danger', '']" v-show="show">
    <th scope="row">{{ market.name }} <span class="hidden">{{ market.hidden }}</span></th>
    <td>{{market.id}}</td>
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
      isMarketOpen: function (market) {
        const place = moment.tz(market.tz)
        const opensTime = moment(market.open, 'HH:mm')
        const closesTime = moment(market.close, 'HH:mm')

        const o = place.clone().hour(opensTime.hour()).minute(opensTime.minute()).second(0)
        const c = place.clone().hour(closesTime.hour()).minute(closesTime.minute()).second(0)

        let isOpen
        if ('lunch' in market) {
          let lunchParts = market['lunch'].split('-')
          const lBeginTime = moment(lunchParts[0], 'HH:mm')
          const lEndTime = moment(lunchParts[1], 'HH:mm')
          isOpen = place.isBetween(o, c) && !place.isBetween(lBeginTime, lEndTime)
        } else {
          isOpen = place.isBetween(o, c)
        }

        // If market is open
        if (isOpen) {
          this.show = this.showOpenMarkets
        } else {
          this.show = this.showClosedMarkets
        }
        return isOpen
      },

      timeDifference: function (otherTz) {
        const there = moment.tz(otherTz)
        const here = moment.tz('Africa/Johannesburg')
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
