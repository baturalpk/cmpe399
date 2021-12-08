<template>
  <div id='bills'>
    <GoTo path='/dashboard' />
    <EuasLogo location='tr' />
    <div content-class='mt-3' class='bills-tabs-container'>
      <span style='text-align: left;'>
        <b>Pick another date to list the bill report:</b>
      </span><br>
      <b-form-datepicker id='bills-datepicker'
                         v-model='current_date'
                         class='mb-5 box-shadow'
                         selected-variant='dark'
                         button-variant='danger'
                         today-variant='danger'
                         nav-button-variant='danger'
                         size='lg'
                         :min='min' :max='max'
      ></b-form-datepicker>
      <div class='bills report box-shadow grow'>
        <div id='bill-report-wrapper'>
          <div class='bill-details-overlay'>
            <div v-if='billDataExist' id='bill-details'>
              <span id='bills-details-title'>{{ billData.month_str }}</span><br>

              <span class='bills-details-field-val-x'>{{ billData.bill }} ₺</span><br>

              <br>

              <span class='bills-details-field-key'>Created at:</span>
              <span class='bills-details-field-val'>{{ billData.created_at }}</span><br>
              <span class='bills-details-field-key'>Due date:</span>
              <span class='bills-details-field-val'>{{ billData.due_date }}</span>
            </div>
            <span v-else class='no-data-caption'>No bill record found for the chosen month!<br></span>
          </div>
          <span><img id='bill-report-icon' src='/assets/ico-receipt.png' /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Bills',
  middleware({ store, redirect }) {
    if (typeof store.state.auth.consumer === 'undefined') {
      return redirect('/login')
    }
  },
  transition: 'tweakOpacity',
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const minDate = new Date(today)
    minDate.setFullYear(2021, 0, 1)

    const maxDate = new Date(today)
    maxDate.setFullYear(2021, 11, 31)

    return {
      current_date: '',
      billData: null,
      billDataExist: false,
      min: minDate,
      max: maxDate
    }
  },
  watch: {
    current_date: {
      async handler(value) {
        const chosenDate = new Date(this.current_date.replace('-', ' '))
        await this.fetchBill(chosenDate)
      }
    }
  },
  mounted() {
    const now = new Date()
    this.current_date = `${now.getFullYear()}-0${now.getMonth() + 1}-01`
  },
  methods: {
    async fetchBill(chosenDate) {
      try {
        const res = await this.$axios.post('/bills', {
          'id': this.$store.state.auth.consumer.id,
          'token': this.$store.state.auth.consumer.token
          // eslint-disable-next-line
        }, {
          params: {
            'year': chosenDate.getFullYear(),
            'month': chosenDate.getMonth()
          }
        })

        if (res.status === 200 && res.data) {
          const data = res.data

          if (data.length >= 1) {
            this.billData = data[0]
            this.billDataExist = true
          } else {
            this.billDataExist = false
          }
        } else throw new Error('Unsupported status code')
      } catch (e) {
        console.log(e) // todo: handle and print the error onto the webpage
      }
    }
  }
}
</script>

<style scoped>
@import "assets/shared.css";

.bills-tabs-container {
  margin: 200px 300px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  justify-content: space-around;
  align-items: center;
}

/*#bill-details-card {*/
/*  min-width: 35rem;*/
/*  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);*/
/*  border-radius: 15px;*/
/*  padding: 20px 30px;*/
/*}*/

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

.bills {
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
  font-size: 2vmin;
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

.bills-details-field-val-x {
  font-size: 3vmin;
  font-weight: bold;
}

.no-data-caption {
  padding-top: 25px;
  padding-left: 10px;
  font-size: 18px;
}

.box-shadow {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.3);
}
</style>
