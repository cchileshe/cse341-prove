const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
//const mongoConnect = require('./util/database').mongoConnect;

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://admin:admin@cse341.sm7ru.mongodb.net/cse341?retryWrites=true&w=majority';


// Added by Lau
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const PORT = process.env.PORT || 5000;
const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions'
  });

// End of lau's input

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

mongoose
  .connect(
    MONGODB_URL, options
  )
  .catch(err => {
    console.log(err);
  });


/*
mongoConnect(() => {
  
    app.listen(PORT,() => {
        console.log(`Server listening on ${PORT}`);
      });
    })
   
*/