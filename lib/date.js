const getDate = () => {

var objToday = new Date(),
	dayOfMonth = objToday.getDate() < 10 ? '0' + objToday.getDate() : objToday.getDate(),
	Month = objToday.getMonth() + 1,
	Year = objToday.getFullYear(),
	Hour = objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours(),
	Minute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes();

var today = `${Hour}:${Minute} - ${dayOfMonth}/${Month}/${Year}`;

return today;
}

export default { getDate };
