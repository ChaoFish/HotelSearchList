<template>
	<div>
		<h3>搜索结果</h3>
		<div v-for="sortDataItem in sortedData" :key="sortDataItem.id" id="hotelInformation" class="clearfix">
			<img :src="sortDataItem.hotelLogo" id='hotelLogo'>
			<div id="text">
				<div id="hotelName">{{sortDataItem.hotelName}}</div>
				<div id="price">&yen;{{sortDataItem.price}} 起</div>
				<div id="hotelLevel">{{sortDataItem.hotelLevel}}&nbsp;&nbsp;<span id="commentCount">{{sortDataItem.commentCount}} 评论</span></div>
				<div id="locationArea"><i class="icon iconfont iconaddress"></i>{{sortDataItem.locationArea}}</div>
				<div id="label">{{sortDataItem.label}}</div>
				<div id="distance">距离你 {{sortDataItem.distance}}m</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
export default {
	name: 'Data',
	data() {
		return {
			originData: {},
			count: 0,
			sortedData: {}
		}
	},
	props: ['message'],
	created() {
		let url = this.HOME + '/app/index.php?i=2%20&c=entry&a=bzapp&do=JdList&m=zh_jdgjb';
		this.$axios.get(url)
		.then(response => {
			let data = response.data;
			this.getLocation();
			this.parseHotelLocation(data);
		})
		.catch(error => {
			console.log(error);
		});
	},
	computed: {
		...mapState(['lowPrice', 'highPrice', 'chosenService', 'currentPosition']),
		...mapGetters(['getChosenPriority', 'getChosenPriceLevel', 'getChosenService'])
	},
	watch: {
		getChosenPriority: function(newVal) {
			let _this = this;
			if (newVal == '距离优先') {
				_this.sortedData = _this.sortData(_this.originData, "distance");
			}
			if (newVal == '低价优先') {
				_this.sortedData = _this.sortData(_this.originData, "price");
			}
			if (newVal == '高价优先') {
				_this.sortedData = _this.sortData(_this.originData, "price");
				_this.sortedData.reverse();
			}
			if (newVal == '好评优先') {
				_this.sortedData = _this.sortData(_this.originData, "commentCount");
				_this.sortedData.reverse();
			}
			this.$forceUpdate();
		},
		getChosenPriceLevel: function() {
			let _this = this;
			let data = _this.originData.filter(function(item, index) {
				let hotelPrice = item.price;
				return _this.lowPrice <= hotelPrice && hotelPrice <= _this.highPrice;
			});
			_this.sortedData = data;
		},
		getChosenService: function(newVal) {
			let _this = this;
			let data = _this.originData.filter(function(item, index) {
				let score = item.score;
				return score > parseFloat(newVal);
			});
			_this.sortedData = data;
		},
		message: function(newVal) {
			let _this = this;
			let data = _this.originData.filter(function(item, index) {
				let name = item.hotelName;
				return name.indexOf(newVal) >= 0;
			})
			_this.sortedData = data;
		}
	},
	methods: {
		getLocation() {
			let _this = this;
			navigator.geolocation.getCurrentPosition(function(position) {
				_this.currentPosition.latitude = position.coords.latitude;
				_this.currentPosition.longitude = position.coords.longitude;
			})
		},
		parseHotelLocation(data) {
			let _this = this;
			var myGeo = new BMap.Geocoder();
			let length = data.length;
			for (let i=0; i<length; i++) {
				myGeo.getPoint(data[i].locationArea, function(point) {
					data[i].latitude = point.lat;
					data[i].longitude = point.lng;
					_this.count++;
					if (_this.count >= 10) {
						_this.getDistance(data);
						_this.originData = data;
						_this.sortedData = _this.sortData(_this.originData, "distance");
					}
				});
			}
		},
		computeDistance(latitude1, longitude1, latitude2, longitude2) {
			var r = 6371;
			let x1 = parseFloat(latitude1);
			let x2 = parseFloat(latitude2);
			let y1 = parseFloat(longitude1);
			let y2 = parseFloat(longitude2);

        	var deltaLatitude = (x2 - x1)/180*Math.PI;
        	var deltaLongitude = (y2 - y1)/180*Math.PI;
        	latitude1 = x1/180*Math.PI;
        	latitude2 = x2/180*Math.PI;
        	var a = Math.sin(deltaLatitude/2)*Math.sin(deltaLatitude/2) + Math.cos(latitude1)*Math.cos(latitude2)*Math.sin(deltaLongitude/2)*Math.sin(deltaLongitude/2);
        	var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        	var d = r*c;
        	return d;
		},
		sortData(data, attr) {
			let length = data.length;
			let temp;
			for (let i=0; i<length; i++) {
				for (let j=0; j<length-i-1; j++) {
					if ((data[j][attr] - data[j+1][attr]) > 0 ) {
						temp = data[j+1];
						data[j+1] = data[j];
						data[j] = temp;
					}
				}
			}
			return data;
		},
		getDistance(data) {
			let _this = this;
			let length = data.length;
			for (let i=0; i<length; i++) {
				let x1 = _this.currentPosition.latitude;
				let y1 = _this.currentPosition.longitude;
				let x2 = data[i].latitude;
				let y2 = data[i].longitude;
				let distance = _this.computeDistance(x1, x2, y1, y2);
				data[i].distance = Math.round(distance);
			}
		}
	}
}	
</script>

<style>
#hotelInformation {
	width: 90%;
	border-radius: 10px;
	margin: 10px auto;
	background-color: white;
	overflow: hidden;
	display: table;
	height: 30%;
}
#hotelLogo {
	width: 40%;
	margin: 2% 0 2% 3%;
	display: inline-block;
	border-radius: 10px;
	vertical-align: middle;
}
#text {
	width: 50%;
	margin: 2% 3% 2% 0;
	display: inline-block;
	text-align: left;
	vertical-align: middle;
	margin-left: 2%;
	height: 90%;
}
#hotelName {
	font-size: 1.1em;
	font-weight: bold;
	display: inline-block;
	width: 60%;
	margin: 3% 0 0 0;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	vertical-align: middle;
}
#price {
	display: inline-block;
	text-align: right;
	width: 35%;
	color: red;
	opacity: 0.8;
	font-weight: bold;
	vertical-align: middle;
}
#commentCount {
	font-size: 0.8em;
}
#locationArea {
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 70%;
	overflow: hidden;
	font-size: 0.8em;
}
#distance {
	font-size: 0.8em;
}
#hotelLevel,
#commentCount,
#locationArea,
#label,
#distance {
	margin: 3% 0;
	color: #888;
	opacity: 0.9;
}
#hotelLevel {
	width: 60%;
	white-space: nowrap;
	font-size: 0.8em;
}
#label {
	font-size: 0.9em;
	color: #a00;
}
.icon {
	font-size: 1.5em;
	vertical-align: middle;
	margin-left: -5px;
}
</style>