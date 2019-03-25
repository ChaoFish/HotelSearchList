<template>
  <div>
    <div v-for="location in locations">
      <router-link to='/'>
      	<div class="locationItem" @click="chooseLocation" :value="location">
          <div class="text">{{location}}</div>
          <div class="checkbox"><div class="icon"></div></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'Yantian',
  data() {
  	return {
      locations: ["罗湖口岸/火车站", "万象城/京基100", "东门商业区", "田贝/水贝珠宝城", "罗湖体育馆/梧桐山风景区", "笋岗/八卦岭", "莲花山/梅林", "华强北商业区", "布吉/深圳东站"]
  	}
  },
  methods: {
    chooseLocation(event) {
      event.preventDefault();
      setTimeout(()=>{this.$router.push('/');}, 200);
      let target = event.target;
      if (target.className != "locationItem") {
        target = event.target.parentNode;
      }
      this.$store.state.chosenLocation = target.getAttribute("value");
      this.$store.state.arrowDirection2 = "arrowDown";
      let chosenIcon = target.childNodes[2].childNodes[0];
      let icon = document.getElementById('icon');
      if (icon) {
        icon.id = '';
      }
      chosenIcon.setAttribute("id", "icon");
    }
  },
  store
}
</script>

<style>
.locationItem {
  padding: 10px 8%;
  cursor: pointer;
}
.text {
  display: inline-block;
}
.checkbox {
  width: 15px;
  height: 15px;
  border-style: solid;
  border-width: 1.5px;
  display: inline-block;
  position: absolute;
  right: 10%;
}
#icon{
  width:6px;
  height: 12px;
  margin: auto;
  border-bottom: 1px solid red;
  border-right: 1px solid red;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>