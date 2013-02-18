

$(function() {

	// クライアントがページを読んだときに以下のjsが走って、
	// socket.ioのイベントをブラウザ上に登録する
	var socket = new io.connect('/');
	
	socket.on('connect', function() {
		
		$('transportName').text('connect via ' + socket.socket.transport.name);
		
	});

	// サーバの「チャット_受け流すよ」イベントを監視
	socket.on('chat_ukenagasuyo', function(message) {
		
		$('<li>').text(message).prependTo($('#messageArea ul'));
		
	});
	
	
	// 通常のイベントを登録する
	$('#submitButton').click(function() {
	
		console.log('// socket.io proc : ' + 2 + ' - click button ***/');
	
		// 「チャット_送るよ」イベントが発動
		// サーバーへのイベント ※「socket」の emit
		socket.emit('chat_okuruyo', {message: $('#msg').val()});
		$('#msg').val('');
	
	});

});
