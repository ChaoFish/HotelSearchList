<template>
  <div id="router">
    <div id="allocations">
      <div v-for="allocation in allocations">
        <router-link :to=allocation.path>
      	  <div class="allocationItem" @click="changeColor($event)">
            {{allocation.name}}
          </div>
        </router-link>
      </div>
    </div>
    <div id="childrenRouterView"><router-view id='childrenRouter'/></div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'Allocation',
  data() {
  	return {
      allocations: [
        {name: "罗湖区", path: "/allocation/luohu"}, 
        {name: "福田区", path: "/allocation/futian"}, 
        {name: "南山区", path: "/allocation/nanshan"}, 
        {name: "宝安区", path: "/allocation/baoan"},
        {name: "龙岗区", path: "/allocation/longgang"},
        {name: "盐田区", path: "/allocation/yantian"},
        {name: "龙华区", path: "/allocation/longhua"}, 
        {name: "坪山区", path: "/allocation/pingshan"}
      ]
  	}
  },
  methods: {
    changeColor(event) {
      let chosenNode = document.getElementById('chosen');
      let target = event.target;
      if (chosenNode) {
        chosenNode.id = '';
      }
      target.setAttribute("id", "chosen");
    }
  },
  store
}
</script>

<style>
.allocationItem {
  padding: 10px;
}
.allocationItem#chosen {
  background-color: white;
}
#allocations {
  width: 25%;
  position: absolute;
  left: 0;
  height: 270px;
  overflow: scroll;
  background-color: #eee;
}
#childrenRouter {
  margin: 0;
}
#childrenRouterView {
  position: absolute;
  right: 0;
  width: 76%;
  background-color: white;
  text-align: left;
  height: 270px;
  overflow: scroll;
  z-index: 99;
}
</style>