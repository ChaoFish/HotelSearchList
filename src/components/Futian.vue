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
  name: 'Futian',
  data() {
  	return {
      locations: ["皇岗口岸/福田口岸", "华强北商业区", "会展中心/CBD", "莲花山/梅林", "香蜜湖/车公庙", "海岸城/后海", "深圳湾口岸/蛇口"]
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