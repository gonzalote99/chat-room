var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var data = fs.readFileSync('data.json');
var chatObject = JSON.parse(data);
const PORT = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var server = app.listen(PORT, listening);

function listening() {
  console.log(`server in ${PORT}`);
}

app.use(express.static('public'));


app.get('/api/v1/chat/data', getChatData);

app.post('/api/v1/chat/data', addChatDataElement);

app.delete('/api/v1/chat/data', clearChatData);


app.get('/api/v1/chat/numvisitors', getChatNumVisitors);

app.put('/api/v1/chat/numvisitors/:num', updateChatNumVisitors);

function getChatData(request, response) {
response.json(chatObject.data);
}


function addChatDataElement(request, response) {
  chatObject.data.push({name: request.body.name, message: request.body.message});
  var data = JSON.stringify(chatObject, null, 2);
  fs.writeFile('data.json', data, finished);

  function finished(err) {
    response.json(chatObject.data)
  }
}

function clearChatData(request, response) {
  chatObject.data = [];
  var data = JSON.stringify(chatObject, null, 2);
  fs.writeFile('data.json', data, finished);

  function finished(err) {
    response.json(chatObject.data)
  }
}

function getChatNumVisitors(request, response) {
  response.json(chatObject.numVisitors);
}

function updateChatNumVisitors(request, response) {
  chatObject.numVisitors = Number(request.params.num);
  var data = JSON.stringify(chatObject, null, 2);
  fs.writeFile('data.json', data, finished);

  function finished(err) {
    response.json(chatObject.numVisitors);
  }
}