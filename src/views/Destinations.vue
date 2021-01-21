<template>
<div>
    <div id="nav">
        <router-link to="/">Agencies</router-link> |
        <router-link :to="{path:'/date', query:$route.query}"> Date</router-link> |
        <router-link :to="{path:'/routes', query:$route.query}">Route</router-link> |
        <router-link :to="{path:'/origins', query:$route.query}">Origin</router-link>
    </div>
    <h1>Choose Destination</h1>
    <Flex-Display :cards="destData"/>
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'
export default {
name:'Destinations',
components:{
    FlexDisplay
},
created: async function(){
    const dquery = this.$route.query
    console.log(dquery);
    const url = `http://localhost:3001/dests?agency=${dquery.agency}&date=${dquery.date}&route=${dquery.route}&origin=${dquery.origin}`;
    const {data} = await axios.get(url)
    this.destData.items = data.map(d =>{
        return { query:{...dquery, dest:d.stop_name}, name:d.stop_name, id:d.stop_name}
    })
    console.log(url);

      
},
data: function(){
    return{
        destData:{
            route:'timetable',
            items:[]
        }
    }
}
}
</script>

<style>

</style>