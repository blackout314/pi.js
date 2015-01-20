module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('lazyload test', function(){
	ok( typeof(pii.lazyload) === 'object' );
});
