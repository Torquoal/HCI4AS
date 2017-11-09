var express = require('express');
var session = require('cookie-session'); // Loads the piece of middleware for sessions
var bodyParser = require('body-parser'); // Loads the piece of middleware for managing the settings
var urlencodedParser = bodyParser.urlencoded({ extended: false }); 
var path = require('path');

var app = express();
app.set('views', __dirname + '/public'); //Serves resources from views folder
app.use('/public', express.static(path.join(__dirname + '/public')));
/* Using sessions */



var timelist = []
/* Check if any of the pills are due to take, if so, send an alert */
function checkTime() {
    //console.log("here")
    var now = new Date();
    for (var i = 0; i < timelist.length; i++) {
        var current = timelist[i]
        //console.log(current)
        var alarm = current[1]
        
        
       if (now.getUTCHours() >= alarm.slice(0,2) && now.getUTCMinutes() >= alarm.slice(3,5)) {
        console.log("Time to take your " + current[0]);
        }
    }    
    setTimeout(checkTime, 1000*60);
  }

checkTime(timelist); //find the best place to call this ?

app.use(session({secret: 'todotopsecret'}))



/* If there is no to do list in the session, 
we create an empty one in the form of an array before continuing */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* The to do list and the form are displayed */
.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: req.session.todolist});
    timelist = req.session.todolist
     
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    
    if (req.body.pillname != '') {
        req.session.todolist.push([(req.body.pillname),(req.body.pilltime)]);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

// Listen for requests

.listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');