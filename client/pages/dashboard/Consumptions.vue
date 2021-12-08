<template>
  <div id='consumption'>
    <GoTo path='/dashboard' />
    <EuasLogo location='tr' />
    <b-pagination
      v-model='currentPage'
      class='dashboard-details-table-nav'
      :total-rows='totalRows'
      :per-page='perPage'
      align='center'
      pills size='lg'
      aria-controls='consumption-table'
    ></b-pagination>
    <div class='overflow-auto dashboard-details-table-wrapper'>
      <b-table
        id='consumption-table'
        class='dashboard-details-table'
        :fields='headerFields'
        :items='items'
        :per-page='0'
        :current-page='currentPage'
        :head-variant='"dark"'
        :table-variant='"light"'
        responsive
        show-empty
        hover
        @row-clicked='(item, index, event) => showDetails(item, index, event)'
      >
      </b-table>
      <b-modal
        v-if='chosenDevice !== null'
        v-model='showDevice'
        title='Device Details'
        header-bg-variant='dark'
        header-text-variant='light'
        body-bg-variant='light'
        body-text-variant='dark'
        footer-bg-variant='light'
        footer-text-variant='dark'
        size='md'
      >
        <div id='device-details-content-wrapper'>
          <span>
            <span class='d-d-c-key'>Device Id: </span>
            <span class='d-d-c-val'>{{ chosenDevice.id }}</span>
          </span><br><br>
          <span>
            <span class='d-d-c-key'>Brand: </span>
            <span class='d-d-c-val'>{{ chosenDevice.brand }}</span>
          </span><br><br>
          <span>
            <span class='d-d-c-key'>Model: </span>
            <span class='d-d-c-val'>{{ chosenDevice.model }}</span>
          </span><br><br>
          <span>
            <span class='d-d-c-key'>Date of registration: </span>
            <span class='d-d-c-val'>{{ chosenDevice.date_of_registration }}</span>
          </span><br><br>
          <span>
            <span class='d-d-c-key'>Status: </span>
            <span class='d-d-c-val'>{{ (chosenDevice.is_active) ? 'Active' : 'Disabled' }}</span>
          </span><br><br>
          <span>
            <span class='d-d-c-key'>Address Info: </span>
            <span class='d-d-c-val'>
              {{`${chosenDevice.street}, ${chosenDevice.additional_info}, `}}
              {{`${chosenDevice.city}, ${chosenDevice.country}, ${chosenDevice.postal_code}`}}
            </span>
          </span>
        </div>

        <template #modal-footer>
          <div class='w-100'>
            <b-button
              variant='danger'
              size='sm'
              class='float-right'
              @click='showDevice = false'
            >
              Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Consumptions',
  middleware({ store, redirect }) {
    if (typeof store.state.auth.consumer === 'undefined') {
      return redirect('/login')
    }
  },
  transition: 'tweakOpacity',
  data() {
    return {
      chosenDevice: {},
      showDevice: false,
      perPage: 7,
      currentPage: 1,
      totalRows: 0,
      items: [],
      headerFields: [
        {
          key: 'id',
          label: 'Consumption ID',
          sortable: true,
          variant: 'dark',

        },
        {
          key: 'device_id',
          label: 'Device Identifier',
          sortable: true
        },
        {
          key: 'power',
          label: 'Consumed Electricity (kw/h)',
          sortable: true
        },
        {
          key: 'created_at',
          label: 'Date of Creation',
          sortable: true
        }
      ]
    }
  },
  watch: {
    currentPage: {
      handler(value) {
        this.fetchConsumptions()
      }
    }
  },
  mounted() {
    this.fetchConsumptions()
  },
  methods: {
    async fetchConsumptions() {
      try {
        const res = await this.$axios.post('/consumptions', {
          'id': this.$store.state.auth.consumer.id,
          'token': this.$store.state.auth.consumer.token
        }, {
          params: {
            'limit': this.perPage,
            'offset': (this.currentPage - 1) * this.perPage
            // todo#1 : use dateMin & dateMax for date filtering feature
          }
        })
        if (res.status === 200 && res.data) {
          this.items = res.data

          this.items.forEach((record) => {
            record.created_at = new Date(record.created_at.replace('-', ' '));
          });

          this.totalRows = res.data[0].total_rows
        } else throw new Error('Unsupported status code')
      } catch (e) {
        console.log(e) // todo: handle and print the error onto the webpage
      }
    },
    async showDetails(item, index, event) {
      try {
        const res = await this.$axios.post('/devices', {
          'id': this.$store.state.auth.consumer.id,
          'token': this.$store.state.auth.consumer.token
        }, {
          params: {
            'deviceID': item.device_id
          }
        });

        const device = res.data[0]

        if (res.status === 200 && device) {
          this.chosenDevice = device
          this.showDevice = true
        } else throw new Error(' ')
      } catch (e) {
        this.$toast.error('Couldn\'t fetch the device details!')
      }
    }
  }
}
</script>

<style scoped>
@import "assets/shared.css";

#device-details-content-wrapper {
  margin-left: 10px;
}

.d-d-c-key {
  font-size: 16px;
  color: #555252;
}

.d-d-c-val {
  font-size: 14px;
  color: crimson;
  font-weight: bold;
}
</style>
