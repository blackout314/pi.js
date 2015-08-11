describe("Ajax Functions", function() {

  var server = sinon.fakeServer.create();
  beforeEach(function() {
    server.respondWith("GET", "example.json", [
	200,
	{"Content-Type": "application/json"},
	'[{"id": 0, "tweet": "Hello World"}]'
	]
    );
  });

  afterEach(function() {
    server.restore();
  });

  it("i try to load example.json", function() {
    var checkData = {};

    var f = function (data) {
	checkData = JSON.parse(data);
    };
    pi.A({
	type:'GET',
	url:'example.json',
	success:f
    });
    server.respond();

    expect( checkData[0].tweet ).toBe("Hello World");
  });

});
