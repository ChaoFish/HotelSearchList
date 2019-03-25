<template>
  <div>
    <div v-for="service in services">
      <router-link to='/'>
      	<div class="serviceItem" @click="chooseService" :value="service">
          <div class="text">{{service}}</div>
          <div class="checkbox"><div class="icon"></div></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'Bed',
  data() {
  	return {
      services: ["大床", "双床", "单人床", "多张床"]
  	}
  },
  methods: {
    chooseService(event) {
      event.preventDefault();
      setTimeout(()=>{this.$router.push('/');}, 200);
      let target = event.target;
      if (target.className != "serviceItem") {
        target = event.target.parentNode;
      }
      this.$store.state.chosenService = target.getAttribute("value");
      this.$store.state.arrowDirection4 = "arrowDown";
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
.serviceItem {
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
  border-style: solid;
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