<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top dark-bg">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#navbar" aria-controls="navbar" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#/">
        <i class="fa fa-line-chart" aria-hidden="true"></i> Market Hours</a>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-bind:class="{'active': $route.path==='/'}">
            <a class="nav-link" href="#/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item" v-bind:class="{'active': $route.path==='/about'}">
            <a class="nav-link" href="#/about">About</a>
          </li>
        </ul>
        <span class="badge badge-pill badge-default" id="your-time">
        Your Time: {{ localTimeDisplayed }}
          <!-- <i class="fa fa-pencil" aria-hidden="true"></i> -->
        </span>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import shared from './shared'
  import moment from 'moment-timezone'
  export default {
    name: 'app',
    mounted () {
      this.initClockTimer()
    },
    methods: {
      initClockTimer: function () {
        let vm = this
        var updateTime = function () {
          let localTimeZone = moment.tz(shared.clientTz)
          let tzAbbr = localTimeZone.zoneAbbr()
          let curTime = localTimeZone.format('HH:mm:ss')
          vm.localTimeDisplayed = curTime + ' ' + tzAbbr
        }
        updateTime()
        setInterval(updateTime, 1000)
      }
    },
    data () {
      return {
        localTimeDisplayed: null
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  #app > nav {
    margin-bottom: 20px;
  }

  .dark-bg {
    background: url(/static/dark_bg.png);
  }

  #your-time {
    background-color: #585858;
    height: 25px;
    margin-top: 8px;
    padding-top: 8px;
  }
</style>
