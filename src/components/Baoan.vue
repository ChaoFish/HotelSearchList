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
  name: 'Baoan',
  data() {
  	return {
      locations: ["宝安机场", "宝安中心区/前海", "沙井/松岗", "深圳北站地区", "观澜", "光明新区", "石岩", "深圳北站", "大学城/西丽动物园", "坂田", "科技园"],
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
  width: 100%;
}
.text {
  display: inline-block;
}
.checkbox {
  width: 15px;
  height: 15px;
  border-width: 1.5px;
  display: inline-block;
  border-style: solid;
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