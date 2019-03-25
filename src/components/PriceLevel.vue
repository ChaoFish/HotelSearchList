<template>
  <div id="routerView">
  <div id="priceLevel">
    <div class="chosenPriceRange" @click="sliderPrice">价格 <span class="price">&yen;{{leftSliderValue}}-{{rightSliderValue}}</span></div>
    <input class="leftSlider" type="range" name="price" min="0" max="425" v-model="leftSliderValue">
    <input class="rightSlider" type="range" name="price" min="425" max="850" v-model="rightSliderValue"><br>
    <div class="priceRange" v-for="(priceRange, index) in priceRanges" @click="choosePriceLevel" :data-index="index">
      &yen;{{priceRange.start}}-{{priceRange.end}}
    </div>

    <div class="priceStars">星级</div>
    <div class="priceStar" v-for="priceStar in priceStars">
      {{priceStar}}
    </div>
  </div>
  </div> 
</template>

<script>
import store from '@/vuex/store'
export default {
  name: 'PriceLevel',
  data() {
    return {
      leftSliderValue: 0,
      rightSliderValue: 850,
      priceRanges: [
        {start: 0, end: 200},
        {start: 200, end: 300},
        {start: 300, end: 400},
        {start: 400, end: 600}
      ],
      priceStars: ["二星以下", "三星/舒适", "四星/高档", "五星/豪华"],
    }
  },
  methods: {
    choosePriceLevel(event) {
      let target = event.target;
      let index = target.getAttribute("data-index");
      let startPrice = this.priceRanges[index].start;
      let endPrice = this.priceRanges[index].end;
      this.leftSliderValue = startPrice;
      this.rightSliderValue = endPrice;
      this.$store.state.chosenPriceLevel = this.leftSliderValue + "-" + this.rightSliderValue;
      this.$store.state.lowPrice = this.leftSliderValue;
      this.$store.state.highPrice = this.rightSliderValue;
      this.$store.state.arrowDirection3 = "arrowDown";
      this.$router.push('/');
    },
    sliderPrice() {
      this.$router.push('/');
      this.$store.state.arrowDirection3 = "arrowDown";
      this.$store.state.chosenPriceLevel = this.leftSliderValue + "-" + this.rightSliderValue;
    }
  },
  store
}
</script>

<style>
#routerView {
  width: 100%;
  margin-top: 2px;
}
#priceLevel {
  position: absolute;
  left: 0;
  width: 100%;
  background-color: white;
}
.leftSlider,
.rightSlider {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 30%;
  height: 0.2rem;
  background: #f00;
  opacity: 0.3;
  cursor: pointer;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-box-shadow:0 0 2px 2px #aaa;
  width: 20px;
  height: 20px;
  border-radius: 10px; 
  box-shadow: 0 0 2px 2px #aaa;
  background: white;
  cursor: pointer;
}
.leftSlider {
  margin-right: -3px;
  cursor: pointer;
}
.rightSlider {
  margin-left: -3px;
  cursor: pointer;
}
.priceRange,
.priceStar {
  display: inline-block;
  padding: 10px;
  font-size: 0.9em;
  width: 70px;
  background-color: rgba(259, 69, 0, 0.4);
  color: white;
  cursor: pointer;
}
.priceRange {
  margin: 30px 1% 20px 1%;
  border-radius: 20px;
  height: 10px;
  line-height: 10px;
}
.priceStar {
  margin: 10px 1%;
  height: 6px;
  line-height: 6px;
  border-radius: 15px;
}
.chosenPriceRange,
.priceStars {
  font-size: 1em;
  transform: translate(-30%);
  font-weight: bold;
}
.chosenPriceRange {
  margin: 20px 0;
}
.priceStars {
  margin: 5px 0 10px 0;
}
span.price {
  color: #f00;
  opacity: 0.8;
}
</style>