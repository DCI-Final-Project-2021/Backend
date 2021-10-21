const getDate = () => {

// let objToday = new Date();

// let	dayOfMonth = objToday.getUTCDate() < 10 ? '0' + objToday.getUTCDate() : objToday.getUTCDate();
// let	Month = objToday.getUTCMonth() + 1;
// let Year = objToday.getUTCFullYear();
// let Hour = objToday.getUTCHours() < 10 ? "0" + objToday.getUTCHours() : objToday.getUTCHours();
// let Minute = objToday.getUTCMinutes() < 10 ? "0" + objToday.getUTCMinutes() : objToday.getUTCMinutes();

// let today = `${Hour}:${Minute} - ${dayOfMonth}/${Month}/${Year}`;

const date = new Date()

// console.log(date.toString())
// console.log(date.toISOString())


return date.toISOString();
}

export default { getDate };
