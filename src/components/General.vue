<template>
  <div>
    <div id="generalItems">
      <div v-for="generalItem in generalItems">
        <router-link :to=generalItem.path>
          <div class="generalItem" @click="changeColor">
            {{generalItem.name}}
          </div>
        </router-link>
      </div>
    </div>
    <div id="View"><router-view id='childrenRouter'/></div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'General',
  data() {
  	return {
      generalItems: [
        {name: "酒店类型", path: "/general/hoteltype"}, 
        {name: "品牌", path: "/general/brand"}, 
        {name: "设施服务", path: "/general/facility"}, 
        {name: "床型", path: "/general/bed"},
        {name: "早餐", path: "/general/breakfast"},
        {name: "评分", path: "/general/comment"},
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
.generalItem {
  padding: 10px 0;
  width: 100%;
  text-align: center;
}
#generalItems {
  width: 25%;
  position: absolute;
  left: 0;
  height: 230px;
  overflow: scroll;
  background-color: #eee;
}
.generalItem#chosen {
  background-color: white;
}
#childrenRouter {
  margin: 0;
}
#View {
  position: absolute;
  right: 0;
  width: 75.1%;
  background-color: white;
  text-align: left;
  height: 230px;
  overflow: scroll;
  z-index: 99;
}
</style>