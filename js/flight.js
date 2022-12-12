import { getIATA, initQueryToTravelAdvisor, queryToTravelAdvisor } from './api.js'

var flightComponent = Vue.component('comp-flight', {
    data: function() {
        return {
            show: false,
            flights_rest: [],
            flightKey: 0,
        }
    },
    props: {
        flight: {},
        airports: {},
    },
    template:
	`<v-card class="mt-4" elevation="6" shaped outlined :key="flightKey" >
		<!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" ></v-img> -->

		<v-card-title>{{ flight.l[0].pr.dp }}</v-card-title>

        <div v-if="flight.f[0].l.length > 1">
            <v-card-subtitle >FROM {{ findAirport(flight.f[0].l[0].da) }} on {{ new Date(flight.f[0].l[0].dd).toLocaleTimeString() }}</v-card-subtitle>
            <v-card-subtitle>TO {{ findAirport(flight.f[0].l[flight.f[0].l.length - 1].aa) }} on {{ new Date(flight.f[0].l[flight.f[0].l.length - 1].ad).toLocaleTimeString() }}</v-card-subtitle>
        </div>

        <div v-if="flight.f[0].l.length == 1">
            <v-card-subtitle >FROM {{ findAirport(flight.f[0].l[0].da) }} on {{ new Date(flight.f[0].l[0].dd).toLocaleTimeString() }}</v-card-subtitle>
            <v-card-subtitle>TO {{ findAirport(flight.f[0].l[0].aa) }} on {{ new Date(flight.f[0].l[0].ad).toLocaleTimeString() }}</v-card-subtitle>
        </div>

		<v-card-actions>
			<v-btn color="orange lighten-2" @click="show = !show" text >Подробнее</v-btn>

			<v-spacer></v-spacer>

			<v-btn color="green lighten-2" text >Купить билет</v-btn>
		</v-card-actions>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

                <v-card-text>
                    <div class="font-weight-bold ml-8 mb-2">
                        Полёт
                    </div>

                    <v-timeline align-top dense >
                        <v-timeline-item v-show="getFlights_rest(flight.f[0].l, flight.f[0].lo).length == 1"
                            :key="getFlights_rest(flight.f[0].l, flight.f[0].lo)[0].id"
                            :color="getFlights_rest(flight.f[0].l, flight.f[0].lo)[0].color"
                            small
                            >
                            <div>
                                <div class="font-weight-normal">
                                    <strong>{{ findAirport(getFlights_rest(flight.f[0].l, flight.f[0].lo)[0].da) }}</strong>
                                </div>
                                <div>Время взлёта: {{ new Date(getFlights_rest(flight.f[0].l, flight.f[0].lo)[0].dd).toLocaleString() }}</div>
                            </div>
                        </v-timeline-item>
                        <v-timeline-item
                            v-for="item in getFlights_rest(flight.f[0].l, flight.f[0].lo)"
                            :key="item.id"
                            :color="item.color"
                            small
                            >
                            <div v-show="item.flight">
                                <div v-show="item.position != 'first'">Время прибытия: {{ new Date(item.ad).toLocaleString() }}</div>
                                <div v-show="item.position == 'first'" class="font-weight-normal">
                                    <strong>{{ findAirport(item.da) }}</strong>
                                </div>
                                <div v-show="item.position != 'first'" class="font-weight-normal">
                                    <strong>{{ findAirport(item.aa) }}</strong>
                                </div>
                                <div v-show="item.position != 'last'">Время взлёта: {{ new Date(item.dd).toLocaleString() }}</div>
                            </div>
                            <div v-show="!item.flight">
                                <div class="font-weight-normal">
                                    <div >Время прибытия: {{ new Date(item.ad).toLocaleString() }}</div>
                                    <strong>{{ findAirport(item.aa) }}</strong>
                                    <strong>{{ timeOfRest(item.t) }}</strong>
                                    <div >Время взлёта: {{ new Date(item.dd).toLocaleString() }}</div>
                                </div>
                            </div>
                        </v-timeline-item>
                    </v-timeline>
                </v-card-text>
			</div>
		</v-expand-transition>
    </v-card>`,
    methods: {
        findAirport(iata) {
            var str = "";
            this.airports.forEach(airport => {
                if(airport.c == iata) str = airport.d;
            });
            return str;
        },
        getFlights_rest(flight, rest) {
            var arr = [];
            var j = 0;
            var k = 0;
            var length = flight.length + rest.length;
            console.log(length);
            for(var i = 0; i < length; i++) {
                if((i % 2) == 0) {
                    arr.push(JSON.parse(JSON.stringify(flight[j])));
                    console.log(arr);
                    console.log(JSON.parse(JSON.stringify(flight)));
                    //flight = [flight.shift()];
                    j++;
                    console.log(flight);
                    arr[i].color = 'deep-purple lighten-1';
                    arr[i].flight = true;
                    if(i == 0) arr[i].position = 'first';
                    if(i == length - 1) arr[i].position = 'last';
                }
                else {
                    arr.push(JSON.parse(JSON.stringify(rest[k])));
                    //rest = [rest.shift()];
                    k++;
                    arr[i].color = 'green';
                    arr[i].flight = false;
                    arr[i].position = 'middle';
                    arr[i].aa = arr[i - 1].aa;
                    arr[i].ad = arr[i - 1].ad;
                    arr[i].dd = flight[j].dd;
                }
            }
            console.log(arr);
            return arr;
        },
        timeOfRest(time) {
            return String(time).replace('<b>', '').replace('</b>', '');
        },
        forceRerender() {
            this.flightKey += 1;
        },
    },
});

var errorComponent = Vue.component('comp-error', {
    data: function() {
        return {
            show: false,
            errorKey: 0,
        }
    },
    props: {
        error: "",
    },
    template:
	`<v-card class="mt-4" elevation="6" shaped outlined :key="errorKey">
        <v-card-subtitle ><strong>{{ error }}</strong></v-card-subtitle>
    </v-card>`,
    methods: {
        forceRerender() {
            this.errorKey += 1;
        },
    },
});

var vm = new Vue({
    el: '#app',
	vuetify: new Vuetify({
		theme: {
			themes: {
				light: {
					primary: '#004D40',
        			secondary: '#dee6fb',
		  		},
			},
	  	},
	}),
    data: {
		textFrom: "",
		textTo: "",
		iataFrom: "",
		iataTo: "",
        flights: [],
        airports: [],
		error: "",
        date: `${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getDate()}`,
		dateFormatted: "",
		menuDate: false,
    },
    methods: {
		allowedDates: val => new Date(val) >= Date.parse(`${new Date().getFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getDate()}`)/**/,
		formatDate(date) {
			if (!date) return null
			const [year, month, day] = date.split('-')
			return `${month}/${day}/${year}`
		},
		parseDate(date) {
			if (!date) return null
			const [month, day, year] = date.split('/')
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		},

        checkIATA(res) {
            if(res === "No IATA") {
                this.error = "IATA не был создан";
                return false;
            }
            return true;
        },
        checkSID(res) {
            if(res === "No sid") {
                this.error = "SID не был создан";
                return false;
            }
            if(!res.hasOwnProperty('itineraries')) {
                this.error = "Билетов нет";
                return false;
            }
            return true;
        },
		async getIATA() {
            let json = await getIATA(this.textFrom, this.textTo);
            return json;
		},
        setIATA(response) {
            this.iataFrom = response.origin.iata;
			this.iataTo = response.destination.iata;
        },
		async getFlights() {
			let json = await initQueryToTravelAdvisor(this.iataFrom, this.iataTo, this.date);
            let res = await queryToTravelAdvisor(json);
            return res;
		},
		setFlights(response) {
			this.flights = response.itineraries;//data.itineraries;
            this.airports = response.airports;//data.airports;
			//console.log(response)
			console.log(this.flights);
            console.log(this.airports);
		},
        async foo() {
            this.error = "";
            var res = await this.getIATA();
            if(this.checkIATA(res)) {
                this.setIATA(res);
                res = await this.getFlights();
                if(this.checkSID(res))
                    this.setFlights(res);
            }
        },
    },
    computed: {
		computedDateFormatted() {
			return this.formatDate(this.date)
		},
		setDateFormatted() {
			return vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
		},
        getTextFrom() {
            return this.textFrom;
        },
        getTextTo() {
            return this.textTo;
        },
    },
	watch: {
		date(val) {
		  this.dateFormatted = this.formatDate(this.date)
		},
        error() {
            errorComponent.forceRerender();
        }
	},
	onCreate() {
		this.dateFormatted = setDateFormatted();
	}
});
