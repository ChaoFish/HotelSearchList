import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	chosenPriority: "距离优先",
	chosenAllocation: '',
	chosenPriceLevel: '价格排序',
  lowPrice: 0,
  highPrice: 0,
	chosenLocation: "位置区域", 
	chosenService: '综合筛选',
	arrowDirection1: "arrowDown",
  arrowDirection2: "arrowDown",
  arrowDirection3: "arrowDown",
  arrowDirection4: "arrowDown",
  currentPosition: { latitude: 0, longitude: 0},
}
const getters = {
  getChosenPriority: state => {
    return state.chosenPriority;
  },
  getChosenPriceLevel: state => {
    return state.chosenPriceLevel;
  },
  getChosenService: state => {
    return state.chosenService;
  }
}
const mutations = {
	change(state, string) {
	  if (string == "/priority") {
        state.arrowDirection2 = state.arrowDirection3 = state.arrowDirection4 = "arrowDown";
        state.arrowDirection1 = (state.arrowDirection1 == "arrowDown") ? "arrowUp" : "arrowDown";
      }
      if (string == "/allocation") {
        state.arrowDirection1 = state.arrowDirection3 = state.arrowDirection4 = "arrowDown";
        state.arrowDirection2 = (state.arrowDirection2 == "arrowDown") ? "arrowUp" : "arrowDown";
      }
      if (string == "/priceLevel") {
        state.arrowDirection1 = state.arrowDirection2 = state.arrowDirection4 = "arrowDown";
        state.arrowDirection3 = (state.arrowDirection3 == "arrowDown") ? "arrowUp" : "arrowDown";
      }
      if (string == "/general") {
        state.arrowDirection1 = state.arrowDirection2 = state.arrowDirection3 = "arrowDown";
        state.arrowDirection4 = (state.arrowDirection4 == "arrowDown") ? "arrowUp" : "arrowDown";
      }
	}
}

export default new Vuex.Store({
	state, getters, mutations
})