import Vue from 'vue'
import Router from 'vue-router'
import Priority from '@/components/Priority'
import Allocation from '@/components/Allocation'
import Luohu from '@/components/Luohu'
import Futian from '@/components/Futian'
import Nanshan from '@/components/Nanshan'
import Baoan from '@/components/Baoan'
import Longgang from '@/components/Longgang'
import Yantian from '@/components/Yantian'
import Longhua from '@/components/Longhua'
import Pingshan from '@/components/Pingshan'
import PriceLevel from '@/components/PriceLevel'
import HotelType from '@/components/HotelType'
import Brand from '@/components/Brand'
import Facility from '@/components/Facility'
import Bed from '@/components/Bed'
import Breakfast from '@/components/Breakfast'
import Comment from '@/components/Comment'
import General from '@/components/General'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/priority',
      component: Priority
    },
    {
      path: '/allocation',
      component: Allocation,
      children: [
      	{path: 'luohu', component: Luohu},
      	{path: 'futian', component: Futian},
      	{path: 'nanshan', component: Nanshan},
      	{path: 'baoan', component: Baoan},
      	{path: 'longgang', component: Longgang},
      	{path: 'yantian', component: Yantian},
      	{path: 'longhua', component: Longhua},
      	{path: 'pingshan', component: Pingshan}
      ]
    },
    {
      path: '/priceLevel',
      component: PriceLevel
    },
    {
      path: '/general',
      component: General,
      children: [
      	{path: 'hoteltype', component: HotelType},
      	{path: 'brand', component: Brand},
      	{path: 'facility', component: Facility},
      	{path: 'bed', component: Bed},
      	{path: 'breakfast', component: Breakfast},
      	{path: 'comment', component: Comment},
      ]
    }
  ]
})
