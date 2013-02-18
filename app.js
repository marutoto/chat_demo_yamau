
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/main')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/chatroom', routes.chatroom);
app.post('/chatroom', routes.chatroom);
//app.get('/users', user.list);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


// socket.ioイベントの監視設定
var io = require('socket.io').listen(server);

app.configure(function() {
	io.set('log level', 1);
});

console.log('/*** socket.io proc : ' + 1 + ' - waiting ***/');

io.sockets.on('connection', function(client) {
	
	// クライアントの「チャット_送るよ」イベントを監視
	client.on('chat_okuruyo', function(event) {
		
		console.log('// socket.io proc : ' + 3 + ' - from Browser ***/');
		
		console.log('arg (event)');
		console.log(event);

		// 「チャット_受け流すよ」イベントが発動
		// クライアントへのイベント ※「client」の emit
		client.emit('chat_ukenagasuyo', event.message);           // 自分に対してemit
		
		client.broadcast.emit('chat_ukenagasuyo', event.message); // その他のクライアントに対してemit
		//client.broadcast.json.emit('message', {text: event.message});
		
	});
	
});

