<template>
<div>
    <div id="nav">
        <router-link to="/">Agencies</router-link> |
        <router-link :to="{path:'/date', query:$route.query}"> Date</router-link> |
        <router-link :to="{path:'/routes', query:$route.query}">Route</router-link> |
        <router-link :to="{path:'/origins', query:$route.query}">Origin</router-link> |
        <router-link :to="{path:'/destinations', query:$route.query}">Destination</router-link>
    </div>
    <b-container>
        <h5>
            {{date}}
        </h5>
    <h4>
        {{routeName}}
    </h4>
    <h4>
        {{fromTo}}
    </h4>
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
import {api} from '../config'

let timetable = []

export default {
    // import FlexDisplay from '../components/FlexDisplay'
    name: "Timetable",
    created: async function () {
        const dquery = this.$route.query
        // { "agency": "boston", "date": "20201206", "route": "1", "origin": "64", "dest": "110" } 
        const url = `${api}/timetable?agency=${escape(dquery.agency)}&date=${dquery.date}&route=${escape(dquery.route)}&origin=${escape(dquery.origin)}&dest=${escape(dquery.dest)}`
        const {
            data
        } = await axios.get(url)
        this.data = data;
        const times = data.map(t => {
            return t.departure_time.split(':').slice(0, 2)
            // return DateTime.fromFormat(t.departure_time, "hh:mm:ss", {zone:"UTC"}).toString()
        })

        for (let num = Math.min(...times.map(t => t[0])); num < Math.max(...times.map(t => t[0])); num++) {
            this.timetable.push([num, times.filter(trips => trips[0] == num).map(t2 => t2[1])])
        }
        this.routeName = this.data[0].route_short_name || this.data[0].route_long_name
        this.fromTo = `Departures From ${this.data[0].oriname} To ${this.data[0].destname}`

    },
    data() {
        return {
            timetable: [],
            times: [],
            min: null,
            max: null,
            hr12: true,
            data: null,
            routeName: null,
            fromTo: null,
        }
    },
    methods: {
        formatHour(theHour, twelve) {
            if (twelve) {
                return DateTime.utc().startOf('day').plus({
                    hour: theHour
                }).toFormat('ha')
            } else {
                return theHour
            }

        }
    },
    computed: {
        //     routeName(){
        //         return this.data[0].route_short_name || this.data[0].route_long_name
        //     },
        //     fromTo(){
        //         return `Departures From ${this.data[0].oriname} To ${this.data[0].destname}`
        //     }
        date(){
            return DateTime.fromFormat(this.$route.query.date,'yyyyMMdd').toLocaleString(DateTime.DATE_HUGE)
        }
        }
    }
</script>

<style>
.hour {
    font-weight: bold;
    margin-right:.5em;
}
</style>
