const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
var request = new XMLHttpRequest();
request.open('GET', 'https://api.overwatchleague.com/v2/teams/', true);
var roster = [];
var rosterHS = [];

function makeUL(array) {
	var list = document.createElement('ul');
	for (var i = 0; i < array.length; i++) {
		var playerName = document.createElement('li');
		var playerHSList = document.createElement('li');
		var playerHS = document.createElement('img');
		playerHS.src = rosterHS[i];
		playerHS.width = "100";
		playerHS.length = "200";
		playerHSList.appendChild(playerHS);
		playerName.appendChild(document.createTextNode(array[i]));
		list.appendChild(playerHSList);
		list.appendChild(playerName);
	}
	return list;
}

request.onload = function() {
	var info = JSON.parse(this.response);
	if (request.status >= 200 && request.status < 400) {
		info.data.forEach(teams => {
			var playernum = 0;
			function rosterAdd() {
				teams.players.forEach(player => {
					roster.push(player.name);
					rosterHS.push(player.headshot);
					playernum++;
				})
			}

			const card = document.createElement('div');
			card.setAttribute('class', 'card');
			const h1 = document.createElement('h1');
			h1.textContent = teams.name + ' ' + teams.id;
			const h3 = document.createElement('h3');
			const p = document.createElement('p');
			rosterAdd();
			p.textContent = playernum;
			h3.textContent = teams.location;
			container.appendChild(card);
			card.appendChild(h1);
			card.appendChild(h3);
			card.appendChild(makeUL(roster));
			card.appendChild(p)
			roster = [];
			rosterHS = [];
			playernum = 0;
		})
	} else {
		console.log('err');
	}
}
request.send();
