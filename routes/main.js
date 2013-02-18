
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.chatroom = function(req, res){
	
	console.log(req.param('username'));
	
	if(req.param('username') == undefined) {
		res.render('index', { title: 'Express' });
	} else {
		res.render('chatroom', {
			title: 'Express',
			username: req.param('username')
		});
	}
	
	
};

