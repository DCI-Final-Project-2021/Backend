const getDate = () => {

var objToday = new Date(),
	dayOfMonth = objToday.getUTCDate() < 10 ? '0' + objToday.getUTCDate() : objToday.getUTCDate(),
	Month = objToday.getUTCMonth() + 1,
	Year = objToday.getUTCFullYear(),
	Hour = objToday.getUTCHours() < 10 ? "0" + objToday.getUTCHours() : objToday.getUTCHours(),
	Minute = objToday.getUTCMinutes() < 10 ? "0" + objToday.getUTCMinutes() : objToday.getUTCMinutes();

var today = `${Hour}:${Minute} - ${dayOfMonth}/${Month}/${Year}`;

return today;
}

export default { getDate };
