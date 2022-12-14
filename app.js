require('./models/db');
const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars')
const expressHandlebars=require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const taskController=require('./controller/taskController');
const app=express();
const PORT=3443;

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs',
    defaultLayout: 'mainPage',
    layoutsDir:__dirname+'/views/'
}))

app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
});

app.use('/', taskController);