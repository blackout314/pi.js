module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('events test', function(){
	ok( typeof(pi.E) === 'object' );
	var spy = sinon.spy();
});
