const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
const mongoConnect = require('./util/database').mongoConnect;

const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const corsOptions = {
    origin: "https://cse341-proves.herokuapp.com/",
    optionsSuccessStatus: 200
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);
mongoConnect(() => {
    let PORT = process.env.PORT || 5000;
    app.listen(PORT,() => {
        console.log(`Server listening on ${PORT}`);
      });
    })
    //app.listen(process.env.PORT || 5000);
    
        //console.log(`Server listening on ${PORT}`);
      
