<template>
  <div class='register'>
    <BgOverlay img_src='/assets/wind_1.jpeg' apply_fx='mild' />
    <EuasLogo location='tl' />
    <div class='register-form' @keyup.enter='submitRegistrationForm'>
      <input
        type='email'
        v-model.trim='email'
        name='email'
        placeholder='Email'

      /><br>
      <input
        type='password'
        v-model='password'
        name='password'
        placeholder='Password'
      /><br>
      <input
        type='password'
        name='passwordConfirmation'
        v-model='passwordConfirmation'
        placeholder='Confirm your password'
      /><br>
      <input
        type='text'
        name='fullName'
        v-model='fullName'
        placeholder='Name Surname'
      /><br>
      <vue-tel-input id='vue-tel-input-custom' v-model='phone'></vue-tel-input>
      <br>
      <div class='address-container'>
        <span>Address</span>
        <input
          type='text'
          name='street'
          v-model='address.street'
          placeholder='Street'
        />
        <input
          type='text'
          name='Postal code'
          v-model='address.postalCode'
          placeholder='Postal code'
        />
        <input
          type='text'
          name='City'
          v-model='address.city'
          placeholder='City'
        />
        <input
          type='text'
          name='State'
          v-model='address.state'
          placeholder='State'
        />
        <input
          type='text'
          name='Country'
          v-model='address.country'
          placeholder='Country'
        /><br>
        <textarea
          v-model='address.additionalInfo'
          placeholder='Additional info (e.g. Building number)'
        ></textarea>
      </div>
      <button @click='submitRegistrationForm'>REGISTER</button>
      <NuxtLink id='login-link' to='/login'>Already have an account? Then, sign in here.></NuxtLink>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import isEmail from 'validator/lib/isEmail'

export default {
  name: 'Register',
  components: {
    VueTelInput
  },
  middleware({ store, redirect }) {
    if (store.state.auth.consumer) {
      alert("You've already registered!");
      return redirect('/dashboard');
    }
  },
  transition: 'tweakOpacity',
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      fullName: '',
      phone: '',
      address: {
        'street': '',
        'additionalInfo': '',
        'postalCode': '',
        'city': '',
        'state': '',
        'country': ''
      }
    }
  },
  methods: {
    validateRegistrationModels() {
      const consumer = {
        'email': this.email,
        'password': this.password,
        'fullName': this.fullName,
        'phone': this.phone,
        'address': this.address
      }

      // #1 Email
      const isEmailValid = isEmail(consumer.email)
      if (!isEmailValid)
        return [false, '"Email" is not valid!', {}]

      // #2 Password
      const isPassValid1 = (consumer.password === this.passwordConfirmation)
      const isPassValid2 = !(consumer.password.length <= 7) // TODO: Apply password strength test!

      const isPasswordValid = (isPassValid1 && isPassValid2)
      if (!isPassValid1)
        return [false, '"Passwords" do not match!', {}]
      if (!isPassValid2)
        return [false, '"Password is empty and/or not strength enough (at least 7 char required)!', {}]

      // #3 Full name
      const isFullnameValid = (consumer.fullName.length !== 0)
      if (!isFullnameValid)
        return [false, '"Name Surname" cannot be empty!', {}]

      // #4 Phone
      if (!consumer.phone)
        return [false, 'Improper "phone number" format!', {}]

      // #5 Address
      const _address = consumer.address
      for (const key in _address) {
        if (key !== 'additionalInfo' && key !== 'state') {
          const val = _address[key]
          if (val.length === 0) {
            return [false, `${key} field of address cannot be empty!`, {}]
          }
        }
      }

      if (isEmailValid && isPasswordValid && isFullnameValid)
        return [true, '', consumer]
    },
    async submitRegistrationForm() {
      try {
        const [areFieldsValid, errorMsg, dataToSend] = this.validateRegistrationModels()

        if (!areFieldsValid) {
          this.$toast.error(`${errorMsg}`)
          return
        }

        const res = await this.$axios.post('/register', dataToSend);

        if (res.status === 201) {
          this.$toast.success('Registration is successful, forwarding to the login screen...', {
            timeout: 3000
          })
          await this.$nuxt.$options.router.push({ path: '/login' })
        }

        this.$toast.error("An error occured!");
      } catch (err) {
        if (err.response.status === 401)
          this.$toast.error("The email's already registered, or there is an invalid field!");
        else this.$toast.error('An error occured!')
      }
    }
  }
}
</script>

<style scoped>
#vue-tel-input-custom {
  background-color: whitesmoke;
  color: black;
}

.register {
  text-align: center;
}

.register-form {
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  min-height: 30vh;
  max-width: 40vw;
  text-align: center;
  padding: 40px 50px;
  justify-content: space-around;
  background: black;
  border-radius: 15px;
}

.register-form > input {
  min-height: 3vh;
  background-color: whitesmoke;
  border: none;
  font-weight: bold;
  color: black;
  padding: 5px 15px;
}

.address-container {
  margin: 10px 0 30px 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  padding: 20px 25px;
  background: white;
  border-radius: 15px;
}

.address-container > span {
  font-weight: bolder;
  margin: -5px 0 5px 0;
}

.address-container > input {
  min-height: 2.5vh;
  background-color: whitesmoke;
  border: none;
  font-weight: bold;
  color: black;
  padding: 5px 15px;
}

.address-container > textarea {
  min-height: 7vh;
  background-color: whitesmoke;
  border: none;
  font-weight: bold;
  color: black;
  padding: 5px 15px;
  border-left: 3px solid;
}

.register-form > button {
  border-radius: 10px;
  border: 1px solid crimson;
  background-color: crimson;
  color: white;
  font-size: 15px;
  font-weight: bold;
  min-height: 4vh;
}

.register-form > button:active {
  transform: scale(1.05);
}

#login-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  margin-top: 15px;
}

#login-link:hover {
  transform: scale(0.9);
}
</style>
