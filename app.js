const express = require('express');
const app = express();
const cors = require('cors');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes 
const postsRoute = require ('./routes/posts');
const { JsonWebTokenError } = require('jsonwebtoken');
app.use('/posts',postsRoute);

//ROUTES
app.get('/',(req,res)=> {
    res.send('We are on home');
});

app.post('/login',(req,res) => {
    //Mock user
    const user = {
        id: 1,
        username: "brad",
        email: "brad@gmail.com"
    }
    jwt.sign({user},process.env.JWT_KEY, (err,token)=> {
        res.json({
            token
        })
    });
})
//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser : true },
    () => { console.log('connected to DB!');
});

//LISTEN
app.listen(3000);
