module("tests", {
	setup: function () {
	},
	teardown: function () {
	}
});

test('pi.A ok', function(){
	ok( typeof(pi.A) === 'function' );
});

test('pi.A ajax on', function(){
	var checkData = {};

	var server = sinon.fakeServer.create();
	server.respondWith("GET", "example.json", [
		200,
		{"Content-Type": "application/json"},
		'[{"id": 0, "tweet": "Hello World"}]'
		]
	);

	var f = function (data) {
		checkData = JSON.parse(data);
	};
	pi.A({
		type:'GET',
		url:'example.json',
		success:f
	});
	server.respond();
	server.restore();

	ok( checkData[0].tweet === 'Hello World' );
});
