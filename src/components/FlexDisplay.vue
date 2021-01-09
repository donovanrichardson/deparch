<template>
  <b-container>
      hi mom
      <b-row>
          <b-col v-for="item in items" :key="item" lg=2 md=3 sm=6 xs=12>
              {{item}}
          </b-col>
      </b-row>
  </b-container>

</template>

<script>
export default {
name:'FlexDisplay',
props:['items']
}
</script>

<style>

</style>