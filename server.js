// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


/**********
 * ROUTES *
 **********/


/*
* HTML ENDPOINTS
*/
app.get('/testtwilio', function (req, res){
  client.sendMessage({
    to: '+14159945772',
    from: '+16504498443',
    body: 'Hello Wesley from twilio, heheheh'
  }, function (err, data){
    if (err)
      console.log('twilio test failed', err);
    else
      console.log('twilio success', data);
    });
});

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// REQUEST TO SECOND PAGE '/MESSAGE'
app.get('/messages', function inbox (req, res) {
  res.sendFile(__dirname + '/views/messages.html');
});

// '/INBOX PAGE'
app.get('/inbox', function inbox (req, res) {
  res.sendFile(__dirname + '/views/inbox.html');
});
//
// app.get('/api/messages', function (req, res) {
//   res.json({message: "Hello, World!"});
// });

/*
 * JSON API Endpoints
 */
var controllers = require('./controllers');

app.get('/api', controllers.api.index);
app.get('/api/messages', controllers.message.index);
app.post('/api/messages', controllers.message.create);
app.get('/api/messages/:messageId', controllers.message.show);
app.delete('/api/messages/:messageId', controllers.message.destroy);
app.put('/api/messages/:messageId', controllers.message.update);

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
