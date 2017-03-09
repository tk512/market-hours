<template>
  <div id="app">
    <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
              data-target="#navbar" aria-controls="navbar" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">
        <i class="fa fa-line-chart" aria-hidden="true"></i>

        MarketHours</a>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">API</a>
          </li>
        </ul>

        <button class="btn btn-secondary btn-sm"><i class="fa fa-globe"></i>
          {{ timeZone }}
          {{ now}}
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import shared from './shared'
  export default {
    name: 'app',
    data () {
      return {
        timeZone: shared.clientTz,
        now: null
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
</style>
