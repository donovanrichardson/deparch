<template>
<div>
  hey guys
  <Flex-Display :items="array"/>
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
export default {
  name: 'Home',
  components:{
    FlexDisplay
  },
  data: function(){
    return {
      array:{
        path:'/date',
        items:[
          {
            query:{
              a:1,
              b:2
            },
            name:"Item"
          }
        ]
      }
    }
  }
}
</script>

<style>
  b-row{
    /* color:red; */
    margin:1em;
  }
</style>