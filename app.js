// Import modules
const   express         = require('express'),
        app             = express(),
        mongoose        = require('mongoose'),
        bodyParser      = require('body-parser');

// Routes config
const dataRoutes = require('./routes/data');

// Database config
mongoose.connect('mongodb+srv://login:pass@database?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to DB!');
    }).catch(err => {
        console.log('ERROR: ', err.message);
});

// -------------------
// Serve public folder and parse the json responses
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set default view engine to ejs
app.set("view engine", "ejs");

// Use dataRoutes
app.use('/', dataRoutes);

// Start app on HTTP port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 80");
});