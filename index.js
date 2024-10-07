const logger = require("morgan");
require('dotenv').config();

const router = require('./backend/router/router');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración para los mensajes flash
app.use(session({
    secret: 'secreto', // Clave secreta para la sesión
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/api', router);

const path = require('path')
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/frontend/views'));

app.use(express.static('./frontend/public'));

app.listen(process.env.PORT)



const backup = require('./backend/config/backup');
const cron = require('node-cron');
cron.schedule('0 0 0 * * *', async () => {
    console.log('Realizando Backup de la Base de datos');
    backup.backupDatabase();
});
