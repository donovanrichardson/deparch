<template>
<div>
    <p v-for="time in times" :key="time">
        {{time}}
    </p>
</div>
</template>

<script>
import axios from 'axios'
import {
    DateTime
} from 'luxon'

function twelveHour(theHour){
    return DateTime.utc().startOf('day').plus({hour:theHour}).toFormat('ha')
}

export default {
    // import FlexDisplay from '../components/FlexDisplay'
    name: "Timetable",
    created: async function () {
        const dquery = this.$route.query
        // { "agency": "boston", "date": "20201206", "route": "1", "origin": "64", "dest": "110" } 
        const url = `http://localhost:3001/timetable?agency=${dquery.agency}&date=${dquery.date}&route=${dquery.route}&origin=${dquery.origin}&dest=${dquery.dest}`
        const {
            data
        } = await axios.get(url)
        this.timetable = data
        this.times = this.timetable.map(t => {
            return t.departure_time.split(':').slice(0, 2)
            // return DateTime.fromFormat(t.departure_time, "hh:mm:ss", {zone:"UTC"}).toString()
        })
    },
    data() {
        return {
            timetable: null,
            times: [],
            min:null,
            max:null,
            hr12:false,
        }
    },
    computed: {
        // times(){
        //     if(this.timetable){
        //         return this.timetable.map(t=>{
        //             return t.departure_time.split(':').slice(0,2)
        //             // return DateTime.fromFormat(t.departure_time, "hh:mm:ss", {zone:"UTC"}).toString()
        //         })
        //     }
        // }
    }
}
</script>

<style>

</style>
