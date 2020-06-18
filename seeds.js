// Seed the database with random data

const fs = require('fs');
const axios = require('axios');

const range = {
    iterations: 100,
    daysBehind: 1,
    pm1: {
        min: 0.651332,
        max: 81.7296
    },
    pm25: {
        min: 0.45778,
        max: 160.597
    },
    pm4: {
        min: 0.45778,
        max: 160.597
    },
    pm10: {
        min: 1.62833,
        max: 204.324
    },
    so2: {
        min: 0.20644,
        max: 48.0843
    },
    hcho: {
        min: 0,
        max: 60
    },
    lat: {
        degrees: {
            min: 52,
            max: 52
        },
        minutes: {
            min: 22,
            max: 25
        },
        seconds: {
            min: 0000,
            max: 9999
        },
        orientation: 'N'
    },
    lng: {
        degrees: {
            min: 16,
            max: 16
        },
        minutes: {
            min: 50,
            max: 58
        },
        seconds: {
            min: 0000,
            max: 9999
        },
        orientation: 'E'
    }
}

function getRandom(min, max, int) {
    if(int === true) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.random() * (max - min + 1) + min;
    }
}

var timesExecuted = 0;
var intervalID = setInterval(function generateRandomData() {

    // Generate random date
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - range.daysBehind);
    const dateEnd = new Date();
    const diff = dateEnd.getTime() - dateStart.getTime();
    const diff2 = diff * Math.random();
    const dateRandom = new Date(dateStart.getTime() + diff2);

    let date = {
        year: dateRandom.getUTCFullYear().toString().slice(2),
        month: (dateRandom.getUTCMonth()+1).toString(),
        days: dateRandom.getUTCDate().toString(),
        hours: dateRandom.getUTCHours().toString(),
        minutes: dateRandom.getUTCMinutes().toString(),
        seconds: dateRandom.getUTCSeconds().toString()
    };

    date.month.length == 1 ? date.month = '0' + date.month : false;
    date.days.length == 1 ? date.days = '0' + date.days : false;
    date.hours.length == 1 ? date.hours = '0' + date.hours : false;
    date.minutes.length == 1 ? date.minutes = '0' + date.minutes : false;
    date.seconds.length == 1 ? date.seconds = '0' + date.seconds : false;

    const dateStr = date.days + date.month + date.year;

    // Generate random coordinates
    const coords = {
        lat: {
            degrees: getRandom(range.lat.degrees.min, range.lat.degrees.max, true),
            minutes: getRandom(range.lat.minutes.min, range.lat.minutes.max, true),
            // seconds: (getRandom(range.lat.seconds.min, range.lat.seconds.max, false)/60).toString().split('.')[1].substr(0,4)
            seconds: getRandom(range.lat.seconds.min, range.lat.seconds.max, false)
        },
        lng: {
            degrees: getRandom(range.lng.degrees.min, range.lng.degrees.max, true),
            minutes: getRandom(range.lng.minutes.min, range.lng.minutes.max, true),
            // seconds: (getRandom(range.lng.seconds.min, range.lng.seconds.max, false)/60).toString().split('.')[1].substr(0,4)
            seconds: getRandom(range.lng.seconds.min, range.lng.seconds.max, false)
        }
    }
    
    const latStr = `${coords.lat.degrees}${coords.lat.minutes}.${coords.lat.seconds},${range.lat.orientation}`
    const lngStr = `${coords.lng.degrees}${coords.lng.minutes}.${coords.lng.seconds},${range.lng.orientation}`

    // Generate NMEA data frame
    const gps = `$GNRMC,${date.hours}${date.minutes}${date.seconds}.000,A,${latStr},${lngStr},2.895,96.40,${dateStr},,,A*7A`;

    //Generate sensors data
    const   pm1 = getRandom(range.pm1.min, range.pm1.max, false).toFixed(2),
            pm25 = getRandom(range.pm25.min, range.pm25.max, false).toFixed(2),
            pm4 = getRandom(range.pm4.min, range.pm4.max, false).toFixed(2),
            pm10 = getRandom(range.pm10.min, range.pm10.max, false).toFixed(2),
            so2 = getRandom(range.so2.min, range.so2.max, false).toFixed(2),
            hcho = getRandom(range.hcho.min, range.hcho.max, false).toFixed(2);
            
    //Send the data to the server
    axios.post('https://tomaszjankowski.me/', {
            "gps": `${gps}`,
            "pm1": `${pm1}`,
            "pm25": `${pm25}`,
            "pm4": `${pm4}`,
            "pm10": `${pm10}`,
            "so2": `${so2}`,
            "hcho": `${hcho}`
        })
        .then((res) => {
            // console.log(`statusCode: ${res.statusCode}`)
            console.log(`Times executed: ${timesExecuted}`);
        })
        .catch((error) => {
            // console.error(error)
        });
    
    if(++timesExecuted == range.iterations) {
        clearInterval(intervalID);
    }
    
}, 500);