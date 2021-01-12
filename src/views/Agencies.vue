<template>
<div>
  hey guys
  <Flex-Display :cards="agencyData"/>
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'

export default {
  name: 'Home',
  components:{
    FlexDisplay
  },
  created: async function(){
      const {data} = await axios.get('http://localhost:3001/agencies')
      for(const agency in data){
        this.agencyData.items.push({
          query:{agency:agency},
          name:data[agency].name
        })
        console.log(agency, data[agency]);
      }
  },
  data: function(){
    return {
      agencyData:{
        route:'/date',
        items:[
        ]
      }
    }
  },
  methods:{
  }
}
</script>

<style>
  b-row{
    /* color:red; */
    margin:1em;
  }
</style>