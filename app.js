var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require('path');

var app = express();
app.set('views', __dirname + '/public'); 
app.use('/public', express.static(path.join(__dirname + '/public')));




var timelist = []
/* Check if any of the pills are due to take, if so, cmd line alert */
function checkTime() {
    var now = new Date();
    for (var i = 0; i < timelist.length; i++) {
        var current = timelist[i]
        var alarm = current[1]
        
        if (now.getUTCHours() >= alarm.slice(0, 2) && now.getUTCMinutes() >= alarm.slice(3, 5)) {
            console.log("Time to take your " + current[0]);
        }
    }
    setTimeout(checkTime, 1000 * 60);
}

checkTime(timelist); 

app.use(session({ secret: 'pillstopsecret' }))


    .use(function (req, res, next) {
        if (typeof (req.session.pillslist) == 'undefined') {
            req.session.pillslist = [];
        }
        next();
    })

    /* The pill list and the form are displayed */
    .get('/pills', function (req, res) {
        res.render('pills.ejs', { pillslist: req.session.pillslist });
        timelist = req.session.pillslist

    })

    /* Adding an pill to the list */
    .post('/pills/add/', urlencodedParser, function (req, res) {

        if (req.body.pillname != '') {
            req.session.pillslist.push([(req.body.pillname), (req.body.pilltime),
            (req.body.water), (req.body.quantity), (req.body.total)]);
        }
        res.redirect('/pills');
    })

    /* Deletes an pill from the list */
    .get('/pills/delete/:id', function (req, res) {
        if (req.params.id != '') {
            req.session.pillslist.splice(req.params.id, 1);
        }
        res.redirect('/pills');
    })

    .use(function (req, res, next) {
        res.redirect('/pills');
    })

    .listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');