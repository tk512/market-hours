<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-10">
        <p class="lead">Real-time overview of opening and closing times for stock markets worldwide.</p>
      </div>

      <div class="col-sm-2">

        <div class="btn-group btn-sm" data-toggle="buttons">
          <button type="button" class="btn btn-success btn-sm"
                  v-on:click="showOpenMarkets = !showOpenMarkets">
            <i class="fa"
               v-bind:class="{ 'fa-eye': showOpenMarkets, 'fa-eye-slash': !showOpenMarkets }"
               aria-hidden="true"></i>
            Open
          </button>
          <button type="button" class="btn btn-danger btn-sm"
                  v-on:click="showClosedMarkets = !showClosedMarkets">
            <i class="fa"
               v-bind:class="{ 'fa-eye': showClosedMarkets, 'fa-eye-slash': !showClosedMarkets }"
               aria-hidden="true"></i>
            Closed
          </button>
        </div>

      </div>
    </div>

    <table class="table table-striped table-inverse table-sm">
      <thead>
      <tr>
        <th>Name</th>
        <th>Code</th>
        <th>Location</th>
        <th>Open</th>
        <th>Close</th>
        <th>Lunch</th>
      </tr>
      </thead>
      <tbody>
      <market-item v-for="m in markets"
                   v-bind:market="m"
                   v-bind:show-open-markets="showOpenMarkets"
                   v-bind:show-closed-markets="showClosedMarkets"
                   :key="m.id"></market-item>
      </tbody>
    </table>

  </div>

</template>

<script>

  import MarketItem from './MarketItem.vue'
  import marketData from '../../static/markets.json'

  // By using a hidden field we encourage vuejs to refresh the DOM
  function refreshMarkets (markets) {
    markets.map(m => {
      m.hidden = '' + new Date().getTime()
      return m
    })
  }

  refreshMarkets(marketData)

  export default {
    name: 'markets',
    components: {
      MarketItem
    },
    mounted () {
      var vm = this
      setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000)
        if (new Date().getSeconds() === 0) {
          refreshMarkets(vm.markets)
        }
      }, 1000)
    },
    methods: {},
    data () {
      return {
        markets: marketData,
        showOpenMarkets: true,
        showClosedMarkets: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .container {
    padding-top: 10px;
  }
</style>
