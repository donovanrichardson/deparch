<template>
<div>
    <div id="nav">
        <router-link to="/">Agencies</router-link> |
        <router-link :to="{path:'/date', query:$route.query}"> Date</router-link> |
        <router-link :to="{path:'/routes', query:$route.query}">Route</router-link>
    </div>
    <h1>Choose Origin</h1>
    <Flex-Display :cards="originData" />
</div>
</template>

<script>
import FlexDisplay from '../components/FlexDisplay'
import axios from 'axios'
export default {
    name: 'Origins',
    components: {
        FlexDisplay
    },
    created: async function () {
        const dquery = this.$route.query
        const url = `http://localhost:3001/origins?agency=${dquery.agency}&date=${dquery.date}&route=${dquery.route}`;
        const {
            data
        } = await axios.get(url)
        this.originData.items = data.map(o => {
            return {
                query: {
                    ...dquery,
                    origin: o.stop_id
                },
                name: o.stop_name,
                id: o.stop_id
            }
        })
        console.log(url);

    },
    data: function () {
        return {
            originData: {
                route: 'destinations',
                items: []
            }
        }
    }
}
</script>

<style>

</style>
