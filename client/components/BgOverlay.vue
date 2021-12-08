<template>
  <div id='overlay'>
    <div class='wrapper'>
      <img class='bg' v-bind:src='img_src' v-bind:class='img_fx[apply_fx]'/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgOverlay',
  data () {
    return {
      'img_fx': {
        "yellowish": "filter-1",
        "mild": "filter-2",
        "natural": ""
      }
    }
  },
  props: {
    'img_src': String(''),
    'apply_fx': String('natural')
  }
}
</script>

<style scoped>
/*#overlay {*/
/*  z-index: -1;*/
/*  height: 100%;*/
/*  width: 100%;*/
/*  position: fixed;*/
/*  overflow: auto;*/
/*  top: 0px;*/
/*  left: 0px;*/
/*  background: rgba(0, 0, 0, 0.7);*/
/*}*/
img.bg {
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -2;
}

.filter-1 {
  filter: sepia(100%) saturate(200%) brightness(70%) hue-rotate(330deg);
}

.filter-2 {
  filter: sepia(50%) saturate(100%) brightness(70%);
}

@media screen and (max-width: 1024px) { /* Specific to this particular image */
  img.bg {
    left: 50%;
    margin-left: -512px;   /* 50% */
  }
}
</style>
