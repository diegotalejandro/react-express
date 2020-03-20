let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
var createError = require('http-errors');
var sassMiddleware = require("node-sass-middleware");
var path = require("path");

// Express Route
const studentRoute = require('../backend/routes/student.route')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/students', studentRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.use(
  sassMiddleware({
    /* Options */
    src: __dirname,
    dest: path.join(__dirname, "public"),
    debug: true,
    outputStyle: "compressed",
    prefix: "/prefix" // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);
// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use("/public", express.static(path.join(__dirname, "public")));