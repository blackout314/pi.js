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
	h.del('k');
	ok( h.get('k') === null );
});

test('storage manual', function(){
	pi.S.set('k','v');
	ok( pi.S.get('k') === 'v' );
	pi.S.del('k');
	ok( pi.S.get('k') === null );
});
