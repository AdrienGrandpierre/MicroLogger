//init use of express
const express = require('express')
const app = express()
require('dotenv').config()

//import database
const mongoose = require('mongoose');
const database = require('./server/database/db');

//import routes
const apiRouter = require('./server/routes');

const port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set up cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

//set up mongodb
mongoose.Promise = global.Promise;
mongoose
	.connect(process.env.DB_URL, database)
	.then(
		() => {
			console.log('Database connected sucessfully !')
		},
		error => {
			console.log('Database could not be connected : ' + error)
		}
	)

app.use('/', apiRouter)

app.listen(port, () => {
	console.log(`Api available http://localhost:${port}`)
})