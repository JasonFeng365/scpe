const events = []

// 2024
events.push({
	title:"SCPE Spring 2024",
	shortName:"2024",
	length:12,
	captions:[],
	hackerrankURL:"https://www.hackerrank.com/contests/scpe-spring-2024/challenges",
	overallDesc:"SCPE Spring 2024, or as I like to call it: SCPE 2 was our first sponsored event, with coffee from Dunkin' Donuts for breakfast and sandwiches from Chick-Fil-A for lunch! Brave contestants took on ten more original problems. We made a few adjustments to the schedule, giving us room for a 2 hour and 30 minute contest. Prior to this contest, I set up Kirby Lore Bot to automatically send notifications for practice problem submissions, so I could help people with their submissions as soon as possible.\nWith a larger and more organized officer team, we were able to divide work between multiple team members. Everyone's teamwork was critical to getting our second contest running smoothly. Even with a minor mishap of donuts not showing up, SCPE 2 overall went great, and all contestants went home with new experience, free food, and a cool SCPE badge!\nWell done to our victors, representing Rocklin High School and Code Ninjas!",
})

// 2023
events.push({
	title:"SCPE Fall 2023",
	shortName:"2023",
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
	// let res = '<div class="carousel-item active"><img src="'+shortName+'/0.jpg" class="d-block" style="width:100%"><div class="carousel-caption"><div class="captionbox"><h3>'+captions[0]+'</h3></div></div></div>\n'
	let res = '<div class="carousel-item active"><img src="'+shortName+'/0.jpg" class="d-block" style="width:100%"><div class="carousel-caption"></div></div>\n'
	for (let i=1; i<count; i++) {
		// let caption = null
		// if (captions[i].length == 0) caption = ""
		// else caption = '<div class="captionbox"><h3>'+captions[i]+'</h3></div>'
		let caption = ""
		res += '<div class="carousel-item"><img src="'+shortName+'/'+i+'.jpg" class="d-block" style="width:100%"><div class="carousel-caption">'+caption+'</div></div>\n'
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