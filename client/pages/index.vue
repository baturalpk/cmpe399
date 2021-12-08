<template>
  <div class="Index">
    <div id='preloader'></div>
    <div id='bg-wrapper'></div>
    <div class="content">
      <div class="header">
        <EuasLogo location='tl' />
        <div class="links">
          <button id="login"    class="link" @click="forwardTo('login')">LOGIN<span><img class='link-ico' src="/assets/ico-login.png" /></span></button>
          <button id="register" class="link" @click="forwardTo('register')">REGISTER<span><img class='link-ico' src="/assets/ico-register.png" /></span></button>
        </div>
      </div>
      <b-carousel
        id="slides"
        v-model="slide"
        :interval="3000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 2px 2px 2px #333;"
      >
        <b-carousel-slide
          caption="SHOW YOUR DAILY POWER CONSUMPTIONS"
          text="-"
          img-src="/assets/hes_2.jpg"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="CHECK YOUR MONTHLY ELECTRICITY BILLS"
          text="-"
          img-src="/assets/hes_1.jpg"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="JOIN IN MILLIONS OF CONSUMERS"
          text="WITH JUST A FEW CLICKS"
          img-src="/assets/hes_3.jpg"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="footer">
      <span id='footer-title'>
        CONTACT
      </span>
      <span>
        <b>Headquarter:</b> <br>Dumlupınar Bulvarı 7. Km. No: 166<br>
        Postal Code: 06510<br>
        Cankaya / ANKARA / TURKEY<br>
        Tel: +90 (312) 295 50 00<br>
      </span>
      <span>
        <b>Secondary building:</b> <br>Nasuh Akar Mh. Türkocağı Cad. No: 2/KLMN Blok<br>
        Cankaya / ANKARA / TURKEY<br>
        Tel: +90 (312) 212 69 00<br>
        Fax: +90 (312) 213 01 03<br>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  mounted() {
    this.$nextTick(function () {
      document.getElementById("preloader").style.display = "none";
    });
  },
  methods: {
    async forwardTo(path) {
      await this.$nuxt.$options.router.push({path: `/${path}`});
    }
  },
  transition: 'tweakOpacity'
}
</script>

<style scoped>
#preloader {
  position: fixed;
  z-index: 1000;
  display: table;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  background: url(/assets/pinwheel.gif) no-repeat center #fff;
  left: 0;
  top: 0;
  cursor: default;
}
#bg-wrapper {
  position: fixed;
  z-index: -3;
  display: table;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  background: black;
  left: 0;
  top: 0;
}
.header {
  max-width: 100vw;
}
.links {
  display: flex;
  flex-direction: row;
  text-align: right;
  justify-content: flex-end;
  background: black;
}
.link {
  margin: 20px 15px;
  display: inline-block;
  font-size: 3vmin;
  font-weight: bolder;
  color: white;
  background-color: crimson;
  border-radius: 10px;
  border: none;
}
.link:hover {
  transform: scale(0.9);
}

.link-ico {
  width: 3.5vmin;
  height: auto;
  padding-left: 5px;
}
.footer {
  background: black;
  min-height: 26vh;
  min-width: 100vw;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-style: italic;
}
#footer-title {
  color: red;
  font-size: 4vmin;
  font-weight: bold;
  font-style: normal;
}

@media screen and (max-width: 900px) {
  .footer {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer > span {
    margin-bottom: 10px;
  }
}
</style>
