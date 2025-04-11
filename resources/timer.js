// Make sure to set the timezone!
// "-07:00" for daylight savings (March - November)
// "-08:00" for no daylight savings (Nov, Dec, Jan, Feb, Mar)
const contestTime = new Date("2025-04-26T09:30:00.000-07:00");
const signupsEnded = new Date("2025-04-23T23:59:59.000-07:00");

// Formal text for contest time
const contestTimeString = "April 26, 2025, 9:30AM";

// What the website displays when:
// 0: After contestTime timestamp
// 1: After signupsEnded timestamp
// 2: Default
const splashTexts = [
	"Thanks for joining SCPE Spring 2025! Check back for the next SCPE!",
	"Signups have ended! See you at the contest!",
	"Register using the link below!"
];

// Link to actual contest: make sure to put the "https://"
const contestLink = "https://www.hackerrank.com/scpe-spring-2025";

// Link to signup form: make sure to put the "https://"
const registrationLink = "https://docs.google.com/forms/d/e/1FAIpQLSct-OP7bhTZZJuFeMd0SBku19mPey89b2azSybGEvnopcHPtQ/viewform";
new Vue({
	el: '#timer',
	data: {
		contestTime:[],
		registrationActive:2,
		timerOutput:"",
		interval:null,
		seconds:9999,
		splashTexts:splashTexts,
		contestTimeString:contestTimeString,


		endpoint:"https://canis.jasonfeng365.top/api/contests/88912342/signups/",
		registered:0,
		capacity:60,
		seatsRemaining:"",
	},
	methods: {
		setSignupsEnded(){
			this.registrationActive = 1
		},
		setContestEnded(){
			this.registrationActive = 0
			clearInterval(this.interval)
		},
		countDownTimer() {
			this.updateTimer()
			return setInterval(this.updateTimer, 1000)
		},
		parsePluralTime(time, name) {
			if (time == 1) return time + " " + name
			else return time + " " + name + "s"
		},
		addLeadingZero(time) {
			if (time>9) return time
			return "0"+time
		},
		updateTimer() {
			let curTime = Date.now()
			this.seconds = Math.floor((contestTime - curTime)/1000)

			if (contestTime - curTime < 0) {
				this.setContestEnded()
				return false
			}
			let seconds = this.seconds%60
			let minutes = Math.floor(this.seconds/60)%60
			let hours = Math.floor(this.seconds/3600)%24
			let days = Math.floor(this.seconds/86400)
			this.timerOutput = this.parsePluralTime(days, "day") + ", " + this.addLeadingZero(hours) + ":" + this.addLeadingZero(minutes) + ":" + this.addLeadingZero(seconds)
			
			if (curTime > signupsEnded) {
				this.registrationActive = 1
			}

			return true
		},



		sendRequest() {
			fetch(this.endpoint, {
				method: "GET",
				headers: new Headers({
					"ngrok-skip-browser-warning": true
				})
			})
			.then(success => {
				success.json().then(json => {
					this.registered = 0
					console.log(json)
					console.log(json.teamSizeMap[1])
					console.log(json.teamSizeMap[2])
					console.log(json.teamSizeMap[3])

					for (let i=1; i<4; i++) 
						this.registered += json.teamSizeMap[i] * i

					this.setText()
				})
			})

		},
		setText() {
			this.seatsRemaining = Math.max(0, this.capacity - this.registered)
			this.seatsRemaining += " spots left!"
			console.log(this.registered)
		},
	},
	mounted: function() {
		this.sendRequest()

		this.interval = this.countDownTimer()

		this.$refs.contestLink.setAttribute("href", contestLink);
		this.$refs.registrationLink.setAttribute("href", registrationLink);
	}
});
