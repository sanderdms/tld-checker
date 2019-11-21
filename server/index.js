const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get("/lookup/:name", (req, res) =>  {
    
    const url= process.env.NAME_COM_ENDPOINT || "https://api.dev.name.com/v4/domains:search";
    const username=process.env.NAME_COM_API_USER;
    const password=process.env.NAME_COM_API_TOKEN;
    const headerstr = 'Basic ' + Buffer.from(username + ":" + password).toString('base64');

    const payload = {"keyword":req.params.name};


    const data =  JSON.stringify( payload );
    const options = {
        method: "POST",
        headers: {
            Authorization: headerstr
        },
        body:data
    }

    fetch(url, options)
    .then(response => response.json())
    .then(json=> {
        res.json(json);
    })


});

function notFound(req, res, next){
    res.status(404);
    const error = new Error('not found');
    next(error);   
}

function errorHandler(error, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message:error.message
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
   console.log('Listening on port', port);
   
});