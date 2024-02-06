'use strict'

function makeId(length = 4) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}