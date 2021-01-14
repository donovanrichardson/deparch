<template>
<div>
    <h2>
        {{routeName}} {{fromTo}}
    </h2>
    <b-container>
        <b-row v-for="hour in timetable" :key="hour[0]" align-h="start">
            <b-col cols="2" class="hour">
                {{formatHour(hour[0], hr12)}}
            </b-col>
            <b-col v-for="minute in hour[1]" :key="`${hour[0]}:${minute}`" cols="1">
                {{minute}}
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
import axios from 'axios'
import {
    DateTime
} from 'luxon'



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
        this.data=data;
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
            hr12:true,
            data:null
        }
    },
    methods:{
        formatHour(theHour, twelve){
    if(twelve){
        return DateTime.utc().startOf('day').plus({hour:theHour}).toFormat('ha')
    }else{
        return theHour
    }

}
    },
    computed: {
        routeName(){
            return data[0].route_short_name || data[0].route_long_name
        },
        fromTo(){
            return `Departures From ${data[0].oriname} To ${data[0].destname}`
        }
    }
}
</script>

<style>
.hour{
    font-weight:bold;
}

</style>
