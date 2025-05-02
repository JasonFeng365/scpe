const events = []

function link(text, url) {
	return '<a href="'+url+'">'+text+'</a>'
}

// Spring 2025
events.push({
	title:"SCPE Spring 2025",
	shortName:"s2025",
	length:5,
	captions:[],
	hackerrankURL:"https://www.hackerrank.com/contests/scpe-spring-2025/challenges",
	overallDesc:"SCPE Spring 2025 is another problemset written entirely by Jason. With many club officers busy with classes and transferring, I wrote a light problemset focused on bringing beginners up to speed and giving them more chances to succeed. Despite this, I added a high difficulty curve around the second half of the problemset, giving some of our regular contestants a run for their money, and exposing them to new approaches they may have been previously unfamiliar with.\nThis contest was the second beta test of the "+link("Contest Administration, Notifications, and Information System", "https://jasonfeng365.github.io/canis/")+". The first run was during UC Davis's Aggie Competitive Programming Contest, where I employed the system's live Codeforces integration to easily and automatically keep track of participants who solved problems, so the team could hand out balloons to participants. I activated CANIS's HackerRank integration at SCPE to enable a real-time dynamic interface displaying each team's solves and points.\nInterestingly enough, this SCPE welcomed many special guests from all around California to participate virtually. A UCLA CS graduate joined us in-person to represent SoCal. Multiple competitive programmers from UC Davis participated virtually, including one of my ICPC teammates who solved the whole problemset. Finally, we welcomed competitive programming legend "+link("Nick Wu", "https://codeforces.com/profile/xiaowuc1")+" to compete virtually, who finished the entire set in 20 minutes!",
})

// Fall 2024
events.push({
	title:"Pre-SCPE Fall 2024",
	shortName:"f2024",
	length:12,
	captions:[],
	hackerrankURL:"https://www.hackerrank.com/contests/pre-scpe-fall-24/challenges",
	overallDesc:"Pre-SCPE Fall 2024 was the first SCPE organized completely by Sierra College's computer science club. Previously, I (Jason) have worked alongside club officers to administer the contest, but the club managed every single aspect of the contest, including prizes, food, and (in my opinion, most importantly) the problemset! With a large team of dedicated officers, it went smoothly with minimal interruptions, and contestants enjoyed delicious breakfasts before the contest, and pizza afterwards.\nThis semester, the problemset was longer with many more problems focused on beginners. This allowed participants to finish multiple problems, rather than getting stuck on the second or third problem. Club officers sourced problems from HackerRank and other sites, with some quite interesting original problems as well, ensuring a stable problemset with a smooth difficulty slope.\nSCPE, after all, is meant to be a beginner-friendly contest, and a problemset that stumps participants on the second problem is not the way to learn competitive programming - no pain no gain, but there's also nothing to gain by getting stuck without ever succeeding. Thus, I am quite happy with the balance of this problemset, with no problem being impossible for the participants' level, and lots of beginner-level problems to build our contestants' enthusiasm for competitive programming.",
})

// Spring 2024
events.push({
	title:"SCPE Spring 2024",
	shortName:"s2024",
	length:12,
	captions:[],
	hackerrankURL:"https://www.hackerrank.com/contests/scpe-spring-2024/challenges",
	overallDesc:"SCPE Spring 2024, or as I like to call it: SCPE 2 was our first sponsored event, with coffee from Dunkin' Donuts for breakfast and sandwiches from Chick-Fil-A for lunch! Brave contestants took on ten more original problems. We made a few adjustments to the schedule, giving us room for a 2 hour and 30 minute contest. Prior to this contest, I set up Kirby Lore Bot to automatically send notifications for practice problem submissions, so I could help people with their submissions as soon as possible.\nWith a larger and more organized officer team, we were able to divide work between multiple team members. Everyone's teamwork was critical to getting our second contest running smoothly. Even with a minor mishap of donuts not showing up, SCPE 2 overall went great, and all contestants went home with new experience, free food, and a cool SCPE badge!\nWell done to our victors, representing Rocklin High School and Code Ninjas!",
})

// Fall 2023
events.push({
	title:"SCPE Fall 2023",
	shortName:"f2023",
	length:7,
	captions:["Awards ceremony!", "Post-contest picture", "Pre-contest introductions", "Lunch", "Breakfast", "Breakfast", ""],
	hackerrankURL:"https://www.hackerrank.com/contests/scpe-fall-2023/challenges",
	overallDesc:"Our first ever SCPE was a huge success! Over 30 participants took part in the contest, with 64 total problem submissions. This was a huge opportunity for contestants to practice their critical thinking and problem-solving skills, along with being a huge opportunity for Sierra’s Coding Club officers to practice leadership.\nThe first SCPE was a bit of an experiment, with some aspects that went well and many aspects that we’ll continue to improve on in future contests.",
})




function makeCarouselButtons(carouselName, count) {
	let res = '<button type="button" data-bs-target="#'+carouselName+'" data-bs-slide-to="0" class="active"></button>\n'
	for (let i=1; i<count; i++) {
		res += '<button type="button" data-bs-target="#'+carouselName+'" data-bs-slide-to="'+i+'"></button>\n'
	}
	return res
}

function makeCarouselImages(shortName, count, captions) {
	// let res = '<div class="carousel-item active"><img loading="lazy" src="'+shortName+'/0.jpg" class="d-block" style="width:100%"><div class="carousel-caption"><div class="captionbox"><h3>'+captions[0]+'</h3></div></div></div>\n'
	let res = '<div class="carousel-item active"><img loading="lazy" src="'+shortName+'/0.jpg" class="d-block" style="width:100%"><div class="carousel-caption"></div></div>\n'
	for (let i=1; i<count; i++) {
		// let caption = null
		// if (captions[i].length == 0) caption = ""
		// else caption = '<div class="captionbox"><h3>'+captions[i]+'</h3></div>'
		let caption = ""
		res += '<div class="carousel-item"><img loading="lazy" src="'+shortName+'/'+i+'.jpg" class="d-block" style="width:100%"><div class="carousel-caption">'+caption+'</div></div>\n'
	}
	return res
}

function makeHTML(e, show) {
	let carouselName = "scpe"+e.shortName
	return '<button type="button" class="btn btn-dark" data-bs-toggle="collapse" data-bs-target="#'+carouselName+'dropdown">'+e.title+'</button>\n'+
	'<div id="'+carouselName+'dropdown" class="collapse'+(show?" show":"")+'"><br>\n'+
	'<h3>'+e.title+'</h3>\n'+
	//Carousel
	'<div id="'+carouselName+'" class="carousel slide" data-bs-ride="carousel">'+

	//Indicators/dots
	'<div class="carousel-indicators">\n'+
	makeCarouselButtons(carouselName, e.length)+
	"</div>\n"+

	//The slideshow/carousel
	'<div class="carousel-inner">\n'+
	makeCarouselImages(e.shortName, e.length, e.captions)+
	"</div>\n"+

	//Left and right controls
	'<button class="carousel-control-prev" type="button" data-bs-target="#'+carouselName+'" data-bs-slide="prev"><span class="carousel-control-prev-icon"></span></button>\n'+
	'<button class="carousel-control-next" type="button" data-bs-target="#'+carouselName+'" data-bs-slide="next"><span class="carousel-control-next-icon"></span></button>'+

	"</div>\n"+

	"<br><p>\n"+
	e.overallDesc.replaceAll("\n", "<br><br>")+
	"\n</p>\n"+

	'<h4><a href="'+e.hackerrankURL+'">Try '+e.title+' on HackerRank!</a></h4>'+
	"</div>\n"
}

new Vue({
	el: '#past-events',
	data: {
		html:makeHTML(events[0], true),
	},
	mounted: function() {
		this.html = makeHTML(events[0], true)
		for (let i=1; i<events.length; i++)
			this.html += makeHTML(events[i], false)
	}
});