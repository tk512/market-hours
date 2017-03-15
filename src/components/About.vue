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
        </span> Supports {{ marketCount }} (and counting!) stock and future exchanges worldwide.
        </li>
        <li class="about-item">
        <span class="badge badge-pill badge-primary">
          <i class="fa fa-info" aria-hidden="true"></i>
        </span> Updates in real-time - no need to refresh your browser
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
