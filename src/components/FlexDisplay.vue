<template>
  <b-container>
      <b-row>
          <b-col v-for="item in cards.items" :key="item.name" lg=2 md=3 sm=6 xs=12>
              <router-link :to="{ path: cards.route, query: item.query}">
                  {{item.name}}
              </router-link>
          </b-col>
      </b-row>
  </b-container>

</template>

<script>
export default {
name:'FlexDisplay',
props:['cards']
}
</script>

<style>

</style>