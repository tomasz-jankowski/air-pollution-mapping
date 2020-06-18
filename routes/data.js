// Routes to handle data manipulation

const   express     = require('express'),
        router      = express.Router(),
        Data        = require('../models/data'),
        Log         = require('../models/log'),
        Coordinate  = require('coordinates-conversion');

// INDEX
router.get('/', (req, res) => {
    Data.find({}).sort({date: 'desc'}).exec((err, allData) => {
		if(err) {
			console.log(err);
		} else {
			res.render("home", {data: allData});
		}
	});
});

router.get('/latex', (req, res) => {
    Data.find({}).sort({dateReceived: 'desc'}).limit(100).exec((err, allData) => {
		if(err) {
			console.log(err);
		} else {
			res.render("latex", {data: allData});
		}
	});
});

router.post('/', (req, res) => {
    //const b64auth = ((req.headers.authorization || '').split(' ') || '')[1];
    //if(b64auth.toString()  == "ZHJvbmUwMTo4Yjc4MWE1ZA==") {
        //if(req.body.gps && req.body.pm1 && req.body.pm25 && req.body.pm4 && req.body.pm10 && req.body.so2 && req.body.hcho) {
            Log.create({ headers: req.rawHeaders, body: req.body});
            let gps = '';
            let date = new Date();
            let pm1 = 0, pm25 = 0, pm4 = 0, pm10 = 0, so2 = 0, hcho = 0;
            let gpsObj = {
                lat: 0,
                lng: 0
            };
        
            if(req.body.gps && typeof(req.body.gps) !== 'undefined') {
                gps = req.body.gps;
                const nmea = req.body.gps;
                let arr = nmea.split(',');

                // Date and time
                const dateObj = {
                    year: '20' + arr[9].substr(4,2),
                    month: arr[9].substr(2,2),
                    day: arr[9].substr(0,2),
                    hours: arr[1].substr(0,2),
                    minutes: arr[1].substr(2,2),
                    seconds: arr[1].substr(4,2)
                };
                const dateISO = `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
                date = new Date(dateISO);

                // LatLng convert dms to dd format
                const lat = {
                    degrees: arr[3].split('.')[0].length > 4 ? arr[3].substr(0,3) : arr[3].substr(0,2),
                    minutes: arr[3].split('.')[0].substr(-2),
                    seconds: ('0.' + arr[3].split('.')[1])*60,
                    orientation: arr[4]
                };
                const latStr = `${lat.degrees}°${lat.minutes}'${lat.seconds}"${lat.orientation}`;
                
                const lng = {
                    degrees: arr[5].split('.')[0].length > 4 ? arr[5].substr(0,3) : arr[5].substr(0,2),
                    minutes: arr[5].split('.')[0].substr(-2),
                    seconds: ('0.' + arr[5].split('.')[1])*60,
                    orientation: arr[6]
                };
                const lngStr = `${lng.degrees}°${lng.minutes}\'${lng.seconds}"${lng.orientation}`;
                const coords = new Coordinate(`${latStr} ${lngStr}`);

                gpsObj = {
                    lat: coords.toDd()[0],
                    lng: coords.toDd()[1]
                };
            }

            if(req.body.pm1 && typeof(req.body.pm1) !== 'undefined')
                pm1 = req.body.pm1;

            if(req.body.pm25 && typeof(req.body.pm25) !== 'undefined')
                pm25 = req.body.pm25;

            if(req.body.pm4 && typeof(req.body.pm4) !== 'undefined')
                pm4 = req.body.pm4;

            if(req.body.pm10 && typeof(req.body.pm10) !== 'undefined')
                pm10 = req.body.pm10;

            if(req.body.so2 && typeof(req.body.so2) !== 'undefined')
                so2 = req.body.so2;

            if(req.body.hcho && typeof(req.body.hcho) !== 'undefined')
                hcho = (req.body.hcho * 40.9).toFixed(2);

            const newData = {
                gps: {
                    lat: gpsObj.lat,
                    lng: gpsObj.lng
                },
                date: date,
                pm1: pm1,
                pm25: pm25,
                pm4: pm4,
                pm10: pm10,
                so2: so2,
                hcho: hcho
            };

            Data.create(newData, (err, createdData) => {
                if(err) {
                    console.log(err);
                } else {
                    if(createdData.date > createdData.dateReceived) {
                        const dataToUpdate = {
                            gps: {
                                lat: gpsObj.lat,
                                lng: gpsObj.lng
                            },
                            date: createdData.dateReceived,
                            pm1: pm1,
                            pm25: pm25,
                            pm4: pm4,
                            pm10: pm10,
                            so2: so2,
                            hcho: hcho
                        };
                        Data.findByIdAndUpdate(createdData._id, dataToUpdate, (err, updatedData) => {
                            if(err) {
                                console.log(err);
                                res.sendStatus(200);
                            } else {
                                console.log(updatedData);
                                res.sendStatus(200);
                            }
                        });
                    } else {
                        res.sendStatus(200);
                    }
                }
            });

            //res.sendStatus(200);
        //} else {
          //  res.sendStatus(400);
        //}
    //} else {
    //    res.sendStatus(403);
    //}
});

router.get('/debug', (req, res) => {
    Data.find({}).sort({dateReceived: 'desc'}).exec((err, allData) => {
		if(err) {
			console.log(err);
		} else {
			res.render("debug", {data: allData});
		}
	});
});

router.get('/logs', (req, res) => {
    Log.find({}).sort({dateReceived: 'desc'}).exec((err, allLogs) => {
		if(err) {
			console.log(err);
		} else {
			res.render("logs", {logs: allLogs});
		}
	});
});

module.exports = router;