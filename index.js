//Import the express framework
const express = require('express');

//Initialize the application using the express constructor
const app = express();

//Import the bodyparse module
const bodyParser = require('body-parser');

//Simulated user database
const data = {
    "users":[{
        "user":"admin",
        "pass":"password",
        "id":1
    },{
        "user":"admin1",
        "pass":"password2",
        "id":2
    }]
};

//Bodyparser package to capture the value passed to the service
app.use( bodyParser.urlencoded( {extended:false}));
app.use( bodyParser.json());

// Define the starting page
app.use( express.static(__dirname+'/public'));


// Define the routes
app.get('/users', function( req, res ){
    
    // See all users
    res.json(data);
});

app.post('/users', function( req, res ){
    // Create add user
    req.body.id = data.users.length+1;
    data.users.push(req.body);
    console.log( req.body );
    console.log( data );
    res.send();
});

app.get('/users/:id', function( req, res ){
    //get user info by ID
    res.send( getRow( req.params.id ) );
});

app.post('/users/:id', function( req, res ){
    //update user
    console.log(req.params);
    res.send('PUT Sent ' + req.params.id );
});

 
//Port for the application to listen on.
app.listen(3000);


function getRow( id ){
    for( let item of data.users ){
        if( item.id == id )return item;
    }
    return false;
}