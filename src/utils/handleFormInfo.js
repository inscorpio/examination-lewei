export default function(oldInfo, newInfo) {
	for (let key in oldInfo) {
		oldInfo[key] = newInfo[key]
	}
}