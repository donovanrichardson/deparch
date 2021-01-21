<template>
<div>
        <div id="nav">
      <router-link to="/">Go Back To Agencies</router-link> 
    </div>
    <h1>Choose Date</h1>
    <b-container>
        <b-row class='justify-content-center'>
            <b-calendar v-model="calendarDate"/>
            <!-- <input type="date" name="" id="" :value="startDate"> -->
        </b-row>
        <b-row class='justify-content-center'>
            <router-link :to='{ path: "/routes", query: {...this.$route.query, date:chosenDate}}'>Submit</router-link> 
        </b-row>
    </b-container>
</div>
</template>

<script>
import {DateTime} from 'luxon'
import axios from 'axios'
import {api} from '../config'

export default {
    name: 'DateScreen',
    created: async function(){
        const dquery = this.$route.query
        const url = `${api}/timezone?agency=${escape(dquery.agency)}`
        console.log('why no work', url);
        const {data} = await axios.get(`${api}/timezone?agency=${dquery.agency}`)
        this.calendarDate = DateTime.fromObject({zone:data[0].agecny_timezone}).toFormat("yyyy-MM-dd")
        console.log(DateTime, this.calendarDate);
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
