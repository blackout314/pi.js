module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('storage test', function(){
	ok( typeof(pi.S) === 'object' );
});

test('storage namespace', function(){
	var h = pi.S.namespace('test');
	h.set('k','v');
	ok( h.get('k') === 'v' );
});
