<template>
  <div class="row">
    <div class="col market-overview">
      <dl class="row overview-row">
        <dt class="col-4 col-sm-4">Symbol</dt>
        <dd class="col-8 col-sm-offset-0">{{market.id}}</dd>
      </dl>
      <dl class="row overview-row">
        <dt class="col-4 col-sm-4">Location</dt>
        <dd class="col-8 col-sm-offset-0">{{market.city}}, {{market.country}}
          ({{ timeZone }}{{ shared.timeDifference(market.tz) }})
        </dd>
      </dl>
      <dl class="row overview-row">
        <dt class="col-4 col-sm-4">Opens</dt>
        <dd class="col-8 col-sm-offset-0">{{market.open}}</dd>
      </dl>
      <dl class="row overview-row">
        <dt class="col-4 col-sm-4">Closes</dt>
        <dd class="col-8 col-sm-offset-0">{{market.close}}</dd>
      </dl>
    </div>
    <div class="card">
      <div class="card-header bell-countdown-header">
        {{bellType}} Bell Countdown
      </div>
      <div class="card-block clock" :id="market.id">
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment-timezone'
  import shared from '../shared'

  function addDaysIfWeekend (isoWeekday) {
    return isoWeekday === 6 ? 2 : isoWeekday === 7 ? 1 : 0
  }

  function countdownToOpeningBell (market) {
    const place = moment.tz(market.tz)
    const opensTime = moment(market.open, 'HH:mm')

    let addedDays = addDaysIfWeekend(place.isoWeekday())
    // If it only opens the day after, we add a day
    if (opensTime.hour() < place.hour()) {
      addedDays += 1
    }

    const opensInSeconds = (place.clone()
        .day(place.day() + addedDays)
        .hour(opensTime.hour())
        .minute(opensTime.minute())
        .second(0) - place) / 1000

    window.$('.clock#' + market.id).FlipClock(opensInSeconds, {
      clockFace: 'HourlyCounter', countdown: true
    })
  }

  function countdownToClosingBell (market) {
    const place = moment.tz(market.tz)
    const closingTime = moment(market.close, 'HH:mm')

    const closesInSeconds = (place.clone()
        .hour(closingTime.hour())
        .minute(closingTime.minute())
        .second(0) - place) / 1000

    window.$('.clock#' + market.id).FlipClock(closesInSeconds, {
      clockFace: 'HourlyCounter', countdown: true
    })
  }

  export default {
    props: ['market'],
    mounted () {
      if (shared.isMarkedOpen(this.market)) {
        this.bellType = 'Closing'
        countdownToClosingBell(this.market)
      } else {
        this.bellType = 'Opening'
        countdownToOpeningBell(this.market)
      }
    },
    data () {
      return {
        shared: shared,
        timeZone: moment.tz(shared.clientTz).zoneAbbr(),
        bellType: null
      }
    }
  }
</script>

<style scoped>
  .market-overview {
    margin-top: 8px;
  }

  .overview-row {
    margin-bottom: -5px;
  }

  .bell-countdown-header {
    padding: 0px 0px 0px 5px;
    font-size: 13px;
    background: #dadada;
  }

  .clock {
    padding: 8px;
  }
</style>
