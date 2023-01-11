import moment from "moment";

export function getFormattedDate(date) {
  let oddDay;
  let currentDay = date.getDate();
  const countDay = String(Math.abs(currentDay)).length;
  if (countDay === 1) {
    oddDay = '0' + currentDay;
  } else {
    oddDay = currentDay;
  }
  let oddMonth;
  let currentMonth = date.getMonth() + 1;
  const count = String(Math.abs(currentMonth)).length;
  if (count === 1) {
    oddMonth = '0' + currentMonth;
  } else {
    oddMonth = currentMonth;
  }
  return `${date.getFullYear()}-${oddMonth}-${oddDay}`;
}
export function tomorrowDate(date) {
  let oddMonth;
  let currentMonth = date.getMonth() + 1;
  const count = String(Math.abs(currentMonth)).length;
  if (count === 1) {
    oddMonth = '0' + currentMonth;
  } else {
    oddMonth = currentMonth;
  }
  return `${date.getFullYear()}-${oddMonth}-${date.getDate() + 1}`;
}
export function yesterdayDate(date) {
  let oddMonth;
  let currentMonth = date.getMonth() + 1;
  const count = String(Math.abs(currentMonth)).length;
  if (count === 1) {
    oddMonth = '0' + currentMonth;
  } else {
    oddMonth = currentMonth;
  }
  return `${date.getFullYear()}-${oddMonth}-${date.getDate() - 1}`;
}
export const dateHelper = (howManyDay) => {
  let dateOffset = 24 * 60 * 60 * 1000 * `${howManyDay}`;
  let myDate = new Date();
  myDate.setTime(myDate.getTime() - dateOffset);
  let beforeThirtyDays = myDate.toISOString().slice(0, 10);
  return beforeThirtyDays;
};

export const timeForNow =(date) => {
  const withPmAm = date.toLocaleTimeString("en-GB", {
    // en-US can be set to 'default' to use user's browser settings
    hour: "2-digit",
    minute: "2-digit",
  });
  return withPmAm; // 10:00 AM
}
// export const calculateHours = (timeIn, timeOut) => {
//   let fromHours = `${timeIn}`.slice(0, 2); //10
//   let fromMunites = `${timeIn}`.slice(3, 5) / 60;
//   let finalFromInHours = parseFloat(fromHours) + parseFloat(fromMunites);
//   let toHours = `${timeOut}`.slice(0, 2);
//   let toMunites = `${timeOut}`.slice(3, 5) / 60;
//   let finalToInHours = parseFloat(toHours) + parseFloat(toMunites);
//   return (finalToInHours - finalFromInHours).toFixed(2);
// };

export const calculateHours =(timeIn, timeOut) =>{
  try {
    let totalHours = moment(timeOut, "HH:mm").diff(
      moment(timeIn, "HH:mm"),
      "hours",
      true
    );
    console.log({
      timeIn,
      timeOut,
      totalHours
    })
    //format hours using moment
    let totalHoursFormatted =formatTime(totalHours);
    return totalHoursFormatted;
  }
  catch (e) {
    console.log(e);
  }
};
export const formatTotalSpentBreakTimes = (time) =>{
  try {
    if (time < 60) {
      return `00:${time}`;
      // if the time is less than 60 , then it is minutes
    } else {
      let hours = Math.floor(time / 60);
      if (hours.toString().length == 1) {
        hours = `0${hours}`;
      }
      let minutes = time % 60;
      if (minutes.toString().length == 1) {
        minutes = `0${minutes}`;
      }
      return `${hours}:${minutes}`;
    }
  } catch (e) {
    console.log(e);
  }
};

export const setRepetitionForCronJob = (previous, current) => {
  try {
    // this function will take two parameters as time formatted in (hours:mins) and it will take the two time and sum them and return the total waiting time
    //03:20 , 04:00:
    console.log(previous, "previous");
    let time1Hours = previous.split(":")[0];
    let time1Mins = previous.split(":")[1];
    let time2Hours = current.split(":")[0];
    let time2Mins = current.split(":")[1];
    time1Hours.length == 2 &&
    time1Hours[0] == 0 &&
    (time1Hours = time1Hours[1]);
    time2Hours.length == 2 &&
    time2Hours[0] == 0 &&
    (time2Hours = time2Hours[1]);
    time1Mins.length == 2 &&
    time1Mins[0] == 0 &&
    (time1Mins = time1Mins[1]);
    time2Mins.length == 2 &&
    time2Mins[0] == 0 &&
    (time2Mins = time2Mins[1]);
    console.log(time1Mins, time2Mins, "time2Mins");
    let sumHours = parseInt(time2Hours) + parseInt(time1Hours);
    let sumMints = parseInt(time2Mins) + parseInt(time1Mins);
    if (sumMints > 60) {
      sumHours = sumHours + 1;
      sumMints = sumMints - 60;
    }
    if (sumHours.toString().length === 1) sumHours = "0" + sumHours;
    if (sumMints.toString().length === 1) sumMints = "0" + sumMints;
    return `${sumHours}:${sumMints}`;
  } catch (error) {
    throw new Error(error);
  }
};


export  const checkBetweenTime = (timeNow, max) => {
  try {
    let hNow = timeNow.split(":")[0];
    let hMax = max.split(":")[0];
    let mNow = timeNow.split(":")[1];
    let mMax = max.split(":")[1];
    hNow.length == 2 && hNow[0] == 0 && (hNow = hNow[1]);
    hMax.length == 2 && hMax[0] == 0 && (hMax = hMax[1]);
    mNow.length == 2 && mNow[0] == 0 && (mNow = mNow[1]);
    mMax.length == 2 && mMax[0] == 0 && (mMax = mMax[1]);
    return hNow < hMax || (hNow == hMax && mNow <= mMax);
  } catch (e) {
    console.log(e);
  }
};
const formatTime = (time) => {
  let hours = Math.floor(time);
  let minutes = Math.round((time - hours) * 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  } else {
    minutes = minutes;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  return `${hours}:${minutes}`;
};

