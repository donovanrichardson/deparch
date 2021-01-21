<template>
<div>
        <div id="nav">
      <router-link to="/">Agencies</router-link> |
      <router-link :to="{path:'/date', query:$route.query}">Choose Date</router-link>
    </div>
    <h1>Choose Route</h1>
  <Flex-Display :cards="routeData"/>
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'
export default {
name:'Routes',
components:{
    FlexDisplay
},
created: async function(){
    const dquery = this.$route.query
    const url = `http://localhost:3001/routes?agency=${escape(dquery.agency)}&date=${dquery.date}`;
    const {data} = await axios.get(url)
    this.routeData.items = data.map(r =>{
        return { query:{...dquery, route:r.route_id}, name:r.name, color:r.route_text_color, bgcolor:r.route_color, id:r.route_id }
    })
    console.log(url);

      
},
data: function(){
    return{
        routeData:{
            route:'origins',
            items:[]
        }
    }
}
}
</script>

<style>

</style>