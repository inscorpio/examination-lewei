export function getSession(key) {
	return JSON.parse(sessionStorage.getItem(key))
}

export function setSession(key, value) {
	return sessionStorage.setItem(key, JSON.stringify(value))
}

export function removeSession(key) {
	return sessionStorage.removeItem(key)
}
