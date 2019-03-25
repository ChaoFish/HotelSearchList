<template>
  <div>
	<div id="priority">
      <div v-for="priorityName in priorityNames">
    	<router-link to='/'>
      	  <div class="priorityItem" :value="priorityName" @click="choosePriority">
      		{{priorityName}}
      	  </div>
      	</router-link>
      </div>
	</div>
  </div>
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'Priority',
  data() {
  	return {
      priorityNames: ["距离优先", "低价优先", "高价优先", "好评优先", "推荐排序"]
  	}
  },
  methods: {
    choosePriority(event) {
      let target = event.target;
      this.$store.state.chosenPriority = target.getAttribute("value");
      this.$store.state.arrowDirection1 = "arrowDown";
    }
  },
  store
}
</script>

<style>
.priorityItem {
  padding: 10px 5%;
  margin: 1px 0;
  background-color: white;
  border-radius: 1px;
  text-align: left;
}
#priority {
  width: 100%;
  position: absolute;
  left: 0;
  background-color: #ddd;
}
</style>