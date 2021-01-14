<template>
<div>
    <p v-for="hour in timetable" :key="hour[0]">
        {{hour}}
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

let timetable = []


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
        const times = data.map(t => {
            return t.departure_time.split(':').slice(0, 2)
            // return DateTime.fromFormat(t.departure_time, "hh:mm:ss", {zone:"UTC"}).toString()
        })

        for(let num = Math.min(...times.map(t=>t[0])); num < Math.max(...times.map(t=>t[0])); num++){
    this.timetable.push([num, times.filter(trips => trips[0] == num).map(t2=>t2[1])])
}
    },
    data() {
        return {
            timetable: [],
            times: [],
            min:null,
            max:null,
            hr12:false,
        }
    },
    computed: {
        // times(){
        //     if(data){
        //         return data.map(t=>{
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
