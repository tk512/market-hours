<template>
  <tr v-bind:class="[ isMarketOpenWrapper(market) ? 'bg-success' : 'bg-danger', '']" v-show="show">
    <td scope="row" :colspan="colspanValue">
      <a v-on:click="test=!test;colspanValue=(test?1:6)" style="color:white;cursor:pointer">
        <strong>{{ market.name }}</strong>
        <i class="fa fa-caret-down" aria-hidden="true"></i></a>
      <span class="hidden">{{ market.hidden }}</span>

      <market-summary class="market-summary row"
                      v-bind:market="market"
                      v-if="test === false"></market-summary>
    </td>

    <td v-if="test" class="hidden-md-down">{{market.id}}</td>
    <td v-if="test">{{market.city}}, {{market.country}}
      ({{ timeZone }}{{ shared.timeDifference(market.tz) }})
    </td>
    <td v-if="test">{{market.open}}</td>
    <td v-if="test">{{market.close}}</td>
    <td v-if="test">{{market.lunch}}</td>
  </tr>
</template>

<script>
  import moment from 'moment-timezone'
  import MarketSummary from './MarketSummary.vue'
  import shared from '../shared'
  export default {
    components: {
      MarketSummary
    },
    props: ['market', 'showOpenMarkets', 'showClosedMarkets'],
    data () {
      return {
        shared: shared,
        colspanValue: 1,
        test: true,
        show: true,
        timeZone: moment.tz(shared.clientTz).zoneAbbr()
      }
    },
    methods: {
      /**
       * @param market
       * @returns True if market is open and false if it is closed
       */
      isMarketOpenWrapper: function (market) {
        const isOpen = shared.isMarkedOpen(market)

        // TODO
        // Public holiday check per exchange

        if (isOpen) {
          this.show = this.showOpenMarkets
        } else {
          this.show = this.showClosedMarkets
        }
        return isOpen
      }
    }
  }
</script>

<style scoped>
  .hidden {
    display: none;
  }

  .market-summary {
    width: 100%;
    background-color: white;
    color: black;
    padding: 5px;
    border-radius: 5px;
    margin-left: 0px;
  }
</style>
