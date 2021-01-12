<template>
<div>
    {{$route.query}}
    <b-container>
        <b-row class='justify-content-center'>
            <b-calendar v-model="calendarDate"/>
            <!-- <input type="date" name="" id="" :value="startDate"> -->
        </b-row>
        <b-row class='justify-content-center'>
            <router-link :to='{ path: "/routes", query: {...this.$route.query, date:chosenDate}}'>hi</router-link> 
        </b-row>
    </b-container>
</div>
</template>

<script>
import {DateTime} from 'luxon'
import axios from 'axios'
export default {
    name: 'DateScreen',
    created: async function(){
        const dquery = this.$route.query
        const {data} = await axios.get(`http://localhost:3001/timezone?agency=${dquery.agency}`)
        this.calendarDate = DateTime.fromObject({zone:data[0].agecny_timezone}).toFormat("yyyy-MM-dd")
    },
    data: function(){
        return{
            calendarDate: null
        }
    },
    computed:{
        chosenDate(){
            if(this.calendarDate){
                return this.calendarDate.replace(/-/g,'')
            }
        }
    }
}
</script>

<style>
</style>
