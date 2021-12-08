<template>
  <b-container id='dashboard' fluid>
    <EuasLogo location='tl' />
    <div id='logout-wrapper' @click='doLogout()'>
      <span>Logout</span>
      <img id='logout-icon'
           src='/assets/ico-logout.png'
           alt='LOGOUT_LOGO'
      />
    </div>
    <b-row align-v='center' class='unwrapper'>
      <b-col md='3' sm='6' class='mt-3'>
        <div id='profile' class='box-shadow'>
          <b-avatar variant='light' size='100px'></b-avatar>
          <div class='profile-field'>
            <span class='key'>ID</span><br>
            <span class='val'>{{ $store.state.auth.consumer.id.toString().padStart(10, '0') }}</span><br>
          </div>
          <div class='profile-field'>
            <span class='key'>FULLNAME</span><br>
            <span class='val'>{{ $store.state.auth.consumer.fullName }}</span><br>
          </div>
          <div class='profile-field'>
            <span class='key'>EMAIL</span><br>
            <span class='val'>{{ $store.state.auth.consumer.email }}</span><br>
          </div>
          <div class='profile-field'>
            <span class='key'>PHONE</span><br>
            <span class='val'>{{ $store.state.auth.consumer.phone }}</span><br>
          </div>
          <div class='profile-field'>
            <span class='key last-key'>ADDRESS</span><br>
            <span class='val'>
              {{ `${$store.state.auth.consumer.address.street}, ` }}
              {{ `${$store.state.auth.consumer.address.additionalInfo}, ` }}
              {{ `${$store.state.auth.consumer.address.postalCode}, ` }}
              {{ `${$store.state.auth.consumer.address.city}, ` }}
              {{ `${$store.state.auth.consumer.address.state}, ` }}
              {{ `${$store.state.auth.consumer.address.country}, ` }}
            </span><br>
          </div>
        </div>
      </b-col>
      <b-col md='9' sm='6'>
        <b-overlay v-if='!billsLoaded || !consumptionsLoaded'
                   show
                   no-wrap
                   :variant='light'
                   :opacity='opacity'
                   :blur='blur'
                   rounded='sm'
        ></b-overlay>
        <div id='report-wrapper'>
          <div id='daily-consumptions' class='report box-shadow' @click='forwardTo("consumptions")'>
            <consumptions-chart
              v-if='consumptionsLoaded && consumptions.datasets[0].data.length > 0'
              :chart-data='consumptions'
            ></consumptions-chart>

            <span v-else class='no-data-caption'>You have no consumption history.<br><br></span>
            <span class='report-caption'>CLICK FOR MORE DETAILS ></span>
          </div>
          <div id='bills' class='report box-shadow' @click='forwardTo("bills")'>
            <div v-if='billsLoaded' id='bill-report-wrapper'>
              <span><img id='bill-report-icon' src='/assets/ico-receipt.png' /></span>
              <div>
                <div v-if='bills' id='bill-details'>
                  <span id='bills-details-title'>Bill Report ({{ bills.month_str }})</span><br>
                  <span class='bills-details-field-key'>Total amount:</span> <span
                  class='bills-details-field-val'>₺{{ bills.amount }}</span><br>
                  <span class='bills-details-field-key'>Due date:</span> <span
                  class='bills-details-field-val'>{{ bills.due_date }}</span>
                </div>
                <span v-else class='no-data-caption'>You have no active bills.<br><br></span>
                <span class='report-caption'>CLICK TO SHOW DETAILED VIEW ></span>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import consumptionsChart from '~/components/consumptionsChart'

export default {
  name: 'Dashboard',
  components: { consumptionsChart },
  middleware({ store, redirect }) {
    if (typeof store.state.auth.consumer === 'undefined') {
      return redirect('/login')
    }
  },
  transition: 'tweakOpacity',
  data() {
    return {
      consumptions: null,
      consumptionsLoaded: false,
      bills: null,
      billsLoaded: false,
      consumptionsRaw: null,
      billsRaw: null
    }
  },
  computed: {
    consumptionsLabelsAndData() {
      const labels = []
      const data = []
      this.consumptionsRaw.forEach(record => {
        labels.push(record.created_at)
        data.push(record.power)
      })
      return {
        'labels': labels.reverse(),
        'data': data.reverse()
      }
    }
  },
  async mounted() {
    this.consumptionsLoaded = false
    this.billsLoaded = false

    // Hook consumptions API
    this.consumptionsRaw = await this.fetchLastFiveConsumptions()
    if (this.consumptionsRaw === undefined) {
      this.$toast.error('Couldn\'t fetch the consumption history! Please refresh the page.')
    } else {
      this.consumptions = {
        labels: this.consumptionsLabelsAndData.labels,
        datasets: [
          {
            label: 'Power (kw/h)',
            backgroundColor: 'rgba(248,121,121,0)',
            data: this.consumptionsLabelsAndData.data,
            borderColor: 'rgb(206,29,29)'
          }
        ]
      }
      this.consumptionsLoaded = true
    }

    // Hook bills API
    const billRaw = await this.fetchLastBillRecord()

    if (billRaw === undefined) {
      this.$toast.error('Couldn\'t fetch the bills history! Please refresh the page.')
    } else {
      if (billRaw.length > 0) {
        this.bills = {
          'amount': billRaw[0].bill,
          'due_date': billRaw[0].due_date,
          'month_str': billRaw[0].month_str
        }
      }
      this.billsLoaded = true
    }
  },
  methods: {
    async forwardTo(path) {
      if (this.billsLoaded && this.consumptionsLoaded)
        await this.$nuxt.$options.router.push({ path: `/dashboard/${path}` })
    },
    async doLogout() {
      await this.$store.commit('auth/logout')
      this.$toast.info('Logout is successful, returning to the landing page..!', {
        timeout: 2000
      })
      await this.$nuxt.$options.router.push({ path: '/' })
    },
    async fetchLastFiveConsumptions() {
      try {
        const res = await this.$axios.post('/consumptions', {
          'id': this.$store.state.auth.consumer.id,
          'token': this.$store.state.auth.consumer.token
        }, {
          params: {
            'limit': 5,
            'offset': 0
          }
        })
        if (res.status === 200 && res.data) {
          return res.data
        } else throw new Error(' ')
      } catch (e) {
        console.log(e)
        return undefined
      }
    },
    async fetchLastBillRecord() {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      try {
        const res = await this.$axios.post('/bills', {
          'id': this.$store.state.auth.consumer.id,
          'token': this.$store.state.auth.consumer.token
        }, {
          params: {
            'year': today.getFullYear(),
            'month': today.getMonth()
          }
        })
        if (res.status === 200 && res.data) {
          console.log(res.data)
          return res.data
        } else throw new Error(' ')
      } catch (e) {
        console.log(e)
        return undefined
      }
    }
  }
}
</script>

<style scoped>
#logout-wrapper {
  position: fixed;
  top: 20px;
  right: 30px;
  z-index: 5;
  font-weight: bolder;
}

#logout-icon {
  width: 50px;
  height: auto;
}

#logout-wrapper:hover {
  cursor: pointer;
  transform: scale(1.15);
}

.unwrapper {
  flex-wrap: nowrap;
}

#dashboard {
  text-align: center;
}

/*#dashboard-title-fixed {*/
/*  position: fixed;*/
/*  top: 20px;*/
/*  right: 10vw;*/
/*  color: white;*/
/*  font-weight: bold;*/
/*  font-size: 5vmin;*/
/*  -webkit-text-stroke: 2px black;*/
/*}*/
#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: crimson;
  min-height: 800px;
  border-radius: 15px;
  color: white;
  font-size: large;
  border: 7px solid white;
  margin-top: 50px;
  margin-left: 50px;
  padding-bottom: 20px;
}

span.key {
  font-weight: bold;
}

#report-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 70px auto 0;
}

.report {
  min-height: 200px;
  min-width: 500px;
  margin: 20px 15px;
  display: inline-block;
  font-size: 2vmin;
  font-weight: bolder;
  background-color: white;
  color: crimson;
  border-radius: 20px;
  border: 5px solid white;
  width: 50vw;
}

.report:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.report-caption {
  font-size: 1.5vmin;
}

#daily-consumptions {
  margin-top: 10px;
  margin-bottom: 50px;
}

#bills {
  margin-top: 50px;
}

#bill-report-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  text-align: left;
}

#bill-report-icon {
  margin: 50% auto;
}

#bills-details-title {
  color: black;
  font-size: 1.5vmin;
  font-weight: bold;
}

.bills-details-field-key {
  color: rgb(105, 105, 105);
  font-size: 2vmin;
  font-weight: normal;
}

.bills-details-field-val {
  font-size: 1.5vmin;
  font-weight: bold;
}

.no-data-caption {
  padding-top: 25px;
  font-size: 2.25vmin;
}

.box-shadow {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
  /*box-shadow:*/
  /*  0 2.8px 2.2px rgba(0, 0, 0, 0.034),*/
  /*  0 6.7px 5.3px rgba(0, 0, 0, 0.048),*/
  /*  0 12.5px 10px rgba(0, 0, 0, 0.06),*/
  /*  0 22.3px 17.9px rgba(0, 0, 0, 0.072),*/
  /*  0 41.8px 33.4px rgba(0, 0, 0, 0.086),*/
  /*  0 100px 80px rgba(0, 0, 0, 0.12);*/
}
</style>
