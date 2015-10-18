module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('pi.T : topics test ok', function(){
	ok( typeof(pi.T) === 'object' );
});

test('pi.T topics on', function(){
	var global = 0;
	var callback = function(a){ /*console.log('LOG: '+a);*/ global = global + 1;};
	pi.T.sub('NOTICE', callback);
	pi.T.pub('NOTICE',['hello']);
	ok( global === 1 );

	pi.T.unsub({'topic':'NOTICE','callback':callback});
	pi.T.pub('NOTICE',['hello']);
	ok( global === 1 );
});
