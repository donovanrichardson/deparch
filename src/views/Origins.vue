<template>
    <Flex-Display :cards="originData"/>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'
export default {
name:'Origins',
components:{
    FlexDisplay
},
created: async function(){
    const dquery = this.$route.query
    const url = `http://localhost:3001/origins?agency=${dquery.agency}&date=${dquery.date}&route=${dquery.route}`;
    const {data} = await axios.get(url)
    this.originData.items = data.map(o =>{
        return { query:{...dquery, origin:o.stop_id}, name:o.stop_name}
    })
    console.log(url);

      
},
data: function(){
    return{
        originData:{
            route:'destinations',
            items:[]
        }
    }
}
}
</script>

<style>

</style>