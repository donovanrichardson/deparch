<template>
  <Flex-Display :items="array"/>
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
      array:[1,2,3,4,5,6,7,8,9,0]
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