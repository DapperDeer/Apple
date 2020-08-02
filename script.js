const fs = require('fs')
const http = require('http')

	const stream = fs.createReadStream('stats/match_map_stats.csv')
	stream.pipe(res)