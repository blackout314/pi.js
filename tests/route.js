module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('pi.R : route test ok', function(){
	ok( typeof(pi.R) === 'object' );
});

test('pi.R route on', function(){
	var counter = 0;
	pi.R.bundle( [
		{
			route:'defaultAction',
			callback:function(){ counter = counter + 1; }
		}
	] );
	pi.R.start('defaultAction');

	ok( counter === 1 );
});
