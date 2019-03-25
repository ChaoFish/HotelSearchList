<template>
  <div id="app">
    <div id="input">
    <div id="date">
      <input type="date" name="startTime" v-model="start" required="true" size="20" maxlength="20">
      <input type="date" name="endTime" v-model="end" required="true" size="20" maxlength="20">
    </div>
    <div id="days">{{days}}天</div>
    <input id="search" type="search" name="chosenHotel" placeholder="请输入酒店名/关键字" required="true" size="30" maxlength="20" v-model='searchVal'>
    </div>

    <div id="select">
      <ul>
        <router-link to="/priority"><li @click="checkRouter('/priority'); change('/priority')"><div class="text">{{$store.state.chosenPriority}}</div>&nbsp;<span :class=arrowDirection1></span></li></router-link>
        <router-link to="/allocation"><li @click="checkRouter('/allocation'); change('/allocation')"><div class="text">{{$store.state.chosenLocation}}</div>&nbsp;<span :class=arrowDirection2></span></li></router-link>
        <router-link to="/priceLevel"><li @click="checkRouter('/priceLevel'); change('/priceLevel')"><div class="text">{{$store.state.chosenPriceLevel}}</div>&nbsp;<span :class=arrowDirection3></span></li></router-link>
        <router-link to="/general"><li @click="checkRouter('/general'); change('/general')"><div class="text">{{$store.state.chosenService}}</div>&nbsp;<span :class=arrowDirection4></span></li></router-link>
      </ul>
    </div>

    <router-view id="defaultRouter"/>
    <Data :message="searchVal"></Data>
  </div>
</template>

<script>
import store from './vuex/store'
import { mapState, mapMutations } from 'vuex'
import Data from './components/Data'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      start: '',
      end: '',
      searchVal: ''
    }
  },
  computed: {
    ...mapState(['arrowDirection1', 'arrowDirection2', 'arrowDirection3', 'arrowDirection4']),
    days() {
      let startDate = new Date(this.start);
      let endDate = new Date(this.end);
      let period = endDate.getDate() - startDate.getDate()
      return period;
    }
  },
  methods: {
    ...mapMutations(['change']),
    checkRouter(string) {
      let routerPath = this.$route.path;
      if (routerPath.indexOf(string) >= 0) {
        event.preventDefault();
        this.$router.push('/');
      }
    }
  },
  mounted: function() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let leaveDay = day + 1;
    if (month < 10) {
      month = "0" + month;
    }
    if(day < 10) {
      day = "0" + day;
    }
    this.start = year + "-" + month + "-" + day;
    this.end = year + "-" + month + "-" + leaveDay;
  },
  store,
  components: { Data }
} 
</script>

<style>
body,
html {
  background-color: #ddd;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#input {
  width: 100%;
}
#date,
#days,
#search {
  display: inline-block;
  vertical-align: middle;
  margin: 0 10px;
}
#days {
  font-size: 0.9em;
  background-color: white;
  border-radius: 15px;
  width: 25px;
  height: 35px;
  line-height: 35px;
}
#search {
  appearance: none;
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  border: 0 solid #c8cccf;
  border-radius: 20px;
  text-align: center;
  margin: 10px;
  height: 25px;
  font-size: 1em;
  height: 40px;
}
#date input {
  appearance: none;
  -web-kit-appearance: none;
  -moz-appearance: none;
  border: 0 solid #c8cccf;
  outline: 0;
  border-radius: 15px;
  display: block;
  text-align: center;
  margin: 10px;
  height: 30px;
  font-size: 1.2em;
}
#select {
  width: 100%;
  background-color: white;
  border-radius: 5px;
}
ul {
  padding: 0px;
  margin: 0px;
  width: 100%;
  margin: auto;
}
#select li {
  list-style-type: none;
  display: inline-block;
  width: 20%;
  margin: 0 1%;
  padding: 0;
  cursor: pointer;
}
#select div.text {
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
  padding: 10px 0;
  width: 70px;
}
#select span {
  vertical-align: middle;
}
a {
  text-decoration: none;
  color: black;
  outline: none;
}
.arrowDown,
.arrowUp {
  position: relative;
}
.arrowDown:after,
.arrowDown:before {
  border: 6px solid transparent;
  border-top: 6px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  bottom: 0px;
  content: '';
}
.arrowDown:before {
  border-top-color: #aaa;
  bottom: -1px;
}
.arrowUp:after,
.arrowUp:before {
  border: 6px solid transparent;
  border-bottom: 6px solid #fff;
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  top: -1px;
  content: '';
}
.arrowUp:before {
  border-bottom-color: #aaa;
  top: -2px;
}
#defaultRouter {
  width: 100%;
  position: absolute;
  left: 0;
  margin-top: 1px;
  z-index: 99;
}
</style>
