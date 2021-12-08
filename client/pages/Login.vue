<template>
  <div class='login'>
    <BgOverlay img_src='/assets/tesd_1.jpeg' apply_fx='yellowish' />
    <EuasLogo location='tl' />
    <div class='login-form' @keyup.enter='submitLoginForm'>
      <input id='email' v-model.trim='email' type='email' name='email' placeholder='Email' />
      <input v-model='password' type='password' name='password' placeholder='Password' />
      <button @click='submitLoginForm'>LOGIN</button>
      <br>
      <NuxtLink id='register-link' to='/register'>Don't have an account, yet? Create one here.></NuxtLink>
    </div>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail'

export default {
  name: 'Login',
  middleware({ store, redirect }) {
    if (store.state.auth.consumer) {
      return redirect('/dashboard')
    }
  },
  transition: 'tweakOpacity',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    validateLoginModels() {
      const email = this.email
      const password = this.password

      // --> Do validations
      // #1 Email
      const isEmailValid = isEmail(email)
      // #2 Password
      const isPasswordValid = (password.length !== 0)

      // Create the data that will be sent
      const params = new URLSearchParams()
      params.append('email', email)
      params.append('password', password)

      return [isEmailValid && isPasswordValid, params]
    },
    async submitLoginForm() {
      try {
        const [areValid, dataToSend] = this.validateLoginModels()

        if (!areValid) {
          this.$toast.warning('Email and/or password are not valid!')
          return
        }
        const res = await this.$axios.post('/login', dataToSend, {
          headers: { 'content-type': 'application/x-www-form-urlencoded' }
        })

        if (res.status === 200 && res.data) {
          const consumer = res.data;
          this.$store.commit('auth/login', consumer);
          this.$toast.success("Login is successful, getting into the dashboard..!", {
            timeout: 2000
          });
          await this.$nuxt.$options.router.push('/dashboard');
        } else this.$toast.error('An error occurred!')
      } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
          this.$toast.error('Wrong email and/or password!')
        } else if (err.response.status === 404) {
          this.$toast.error('No account exists with this email!')
        } else {
          this.$toast.error('An error occurred!')
        }
      }
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
}

.login-form {
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  min-height: 25vh;
  max-width: 35vw;
  text-align: center;
  padding: 20px 50px;
  justify-content: space-around;
  background: black;
  border-radius: 15px;
}

.login-form > input {
  min-height: 3vh;
  background-color: whitesmoke;
  border: none;
  font-weight: bold;
  color: black;
  padding: 10px 15px;
  margin-top: 5px;
}

.login-form > button {
  border-radius: 5px;
  border: 1px solid crimson;
  background-color: crimson;
  color: white;
  font-size: 15px;
  font-weight: bold;
  min-height: 3vh;
  margin-top: 10px;
}

.login-form > button:active {
  transform: scale(0.95);
}

#register-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

#register-link:hover {
  transform: scale(0.9);
}
</style>
