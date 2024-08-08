const express = require('express');

const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const carsApiRouter = require('./routes/coreRoutes/carsApi');
const autoParksApiRouter = require('./routes/coreRoutes/autoParksApi');
const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');
const adminAuth = require('./controllers/coreControllers/adminAuth');

const errorHandlers = require('./handlers/errorHandlers');
const erpApiRouter = require('./routes/appRoutes/appApi');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
// create our Express server
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Дозволяє передавати куки
    allowedHeaders: ['Content-Type', 'Authorization'] // Дозволяє заголовки Content-Type і Authorization
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Дозволяє обробку preflight запитів

app.use(cookieParser());
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(fileUpload({}))
app.use(compression());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// // default options
// server.use(fileUpload());

// Here our API Routes

app.use('/api', coreAuthRouter);
app.use('/api/cars',  carsApiRouter);
app.use('/api/autoParks',  autoParksApiRouter);
app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
