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

test('track', function () {
    // #TODO fake test -> implement first a track function
    var returned = pi.track();
    ok( returned );
});
