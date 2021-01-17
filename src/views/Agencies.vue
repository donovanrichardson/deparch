<template>
<div>
  <h1>Choose Agency</h1>
  <Flex-Display :cards="agencyData"/>
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'
import {api} from '../config'

export default {
  name: 'Home',
  components:{
    FlexDisplay
  },
  created: async function(){
      const {data} = await axios.get(`${api}/agencies`)
      let idx = 0;
      // console.log(data);
      data.forEach(d=>{
        console.log("data", idx, d);
        this.agencyData.items.push({
          query:{agency:d.key},
          name:d.name,
          id:idx
        })
        idx ++
      })
      // for(const agency in data){
      //   this.agencyData.items.push({
      //     query:{agency:agency},
      //     name:data[agency].name,
      //     id:idx
      //   })
      //   console.log(agency, data[agency]);
      //   idx++;
      // }
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