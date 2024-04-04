// Daylight savings active during SCPE Spring 2024
const contestTime = new Date("2024-04-06T09:30:00.000-07:00")
const signupsEnded = new Date("2024-04-03T23:59:59.000-07:00")

new Vue({
	el: '#timer',
	data: {
		contestTime:[],
		registrationActive:true,
		timerOutput:"",
		interval:null,
		seconds:9999
	},
	computed: {
		lowest(){
			return this.index==0
		},
		highest(){
			return this.index==this.mazes.length-1
		},
	},
	methods: {
		setSignupsEnded(){
			this.timerOutput = "Signups have ended! See you at the contest!"
			this.registrationActive = false
			clearInterval(this.interval)
		},
		setContestEnded(){
			this.timerOutput = "Thanks for joining SCPE Spring 2024! Check back for the next SCPE!"
			this.registrationActive = false
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
			// Days, hours, minutes, seconds
			
			let curTime = Date.now()
			this.seconds = Math.floor((contestTime - curTime)/1000)

			if (contestTime - curTime < 0) {
				this.setContestEnded()
				return false
			}
			if ((signupsEnded - curTime) < 0) {
				this.setSignupsEnded()
				return false
			}

			let seconds = this.seconds%60
			let minutes = Math.floor(this.seconds/60)%60
			let hours = Math.floor(this.seconds/3600)%24
			let days = Math.floor(this.seconds/86400)
			this.timerOutput = this.parsePluralTime(days, "day") + ", " + this.addLeadingZero(hours) + ":" + this.addLeadingZero(minutes) + ":" + this.addLeadingZero(seconds)

			return true
		}
	},
	mounted: function() {
		this.interval = this.countDownTimer()
	}
});
