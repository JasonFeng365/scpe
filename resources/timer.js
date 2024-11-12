// Daylight savings active during SCPE Spring 2024
const contestTime = new Date("2024-04-06T09:30:00.000-07:00");
const signupsEnded = new Date("2024-04-03T23:59:59.000-07:00");

// Formal text for contest time
const contestTimeString = "April 6, 2024, 9:30AM";

// What the website displays when:
// 0: After contestTime timestamp
// 1: After signupsEnded timestamp
// 2: Default
const splashTexts = [
	"Thanks for joining SCPE Spring 2024! Check back for the next SCPE!",
	"Signups have ended! See you at the contest!",
	"Register using the link below!"
];

// Link to actual contest
const contestLink = "https://www.hackerrank.com/scpe-spring-2024";

// Link to signup form
const registrationLink = "https://forms.gle/DWxcM4bUyhs7qCW1A";
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
		}
	},
	mounted: function() {
		this.interval = this.countDownTimer()

		this.$refs.contestLink.setAttribute("href", contestLink);
		this.$refs.registrationLink.setAttribute("href", registrationLink);
	}
});