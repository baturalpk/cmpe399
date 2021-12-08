<template>
  <NuxtLink v-bind:to='path'>
    <img id="goto-ico" src="/assets/ico-arrowback+dashboard.png" alt='ico-ARROW_BACKWARD+DASHBOARD' />
  </NuxtLink>
</template>

<script>
export default {
  name: 'GoTo',
  props: {
    path: String('')
  }
}
</script>

<style scoped>
#goto-ico {
  position: fixed;
  top: 20px;
  left: 40px;
  width: 100px;
  height: auto;
  z-index: 100;
}
#goto-ico:hover {
  transform: scale(0.8);
}
</style>
