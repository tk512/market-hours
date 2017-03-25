<template>
  <div class="container">

    <div class="jumbotron">
      <h1 class="display-5">About Market Hours</h1>
      <p class="lead">
        Shows which stock exchanges are currently open and closed
      </p>
      <ul class="list-unstyled">
        <li class="about-item">
        <span class="badge badge-pill badge-primary">
          <i class="fa fa-info" aria-hidden="true"></i>
        </span> Currently supports {{ marketCount }} stock and future exchanges worldwide.
        </li>
        <li class="about-item">
        <span class="badge badge-pill badge-primary">
          <i class="fa fa-info" aria-hidden="true"></i>
        </span> Open/Closed updates happen in real-time - bank holidays included
        </li>
        <li class="about-item">
        <span class="badge badge-pill badge-primary">
          <i class="fa fa-info" aria-hidden="true"></i>
        </span> Expanding a market shows a countdown to opening/closing bells
        </li>
        <li class="about-item">
        <span class="badge badge-pill badge-primary">
          <i class="fa fa-info" aria-hidden="true"></i>
        </span> Web app is open source (MIT license) and can be found on its <a
          href="https://github.com/tk512/market-hours">GitHub
          repository.</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import marketData from '../../static/markets.json'
  export default {
    data () {
      return {
        marketCount: marketData.length
      }
    }
  }

</script>

<style scoped>
  .about-item {
    margin-bottom: 4px;
  }
</style>
