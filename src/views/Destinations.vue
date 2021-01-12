<template>
    <Flex-Display :cards="destData"/>
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
        return { query:{...dquery, dest:d.stop_id}, name:d.stop_name}
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