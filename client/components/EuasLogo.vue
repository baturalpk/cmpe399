<template>
  <NuxtLink to='/'>
      <img id="logo"
           v-bind:class="loc[location]"
           src="/assets/euas.png" alt='EUAS_LOGO'
      />
  </NuxtLink>
</template>

<script>
export default {
  name: 'EuasLogo',
  data () {
    return {
      'loc': {
        'tl': 'topLeft',
        'tr': 'topRight'
      }
    }
  },
  props: {
    location: String('tl')
  }
}
</script>

<style scoped>
#logo:hover {
  transform: scale(1.15);
}

.topLeft {
  position: fixed;
  top: 20px;
  left: 30px;
  width: 100px;
  height: auto;
  z-index: 100;
}

.topRight {
  position: fixed;
  top: 10px;
  right: 20px;
  width: 100px;
  height: auto;
  z-index: 100;
}
</style>
