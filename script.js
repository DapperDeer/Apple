var request = new XMLHttpRequest()
request.open('GET', 'https://api.overwatchleague.com/v2/teams/', true)
request.onload = function() {
	var data = JSON.parse(this.response)
	if (request.status >= 200 && request.status < 400) {
		data.forEach(teams => {
			console.log(teams.name)
		})
	} else {
		console.log('err');
	}
}
request.send()
