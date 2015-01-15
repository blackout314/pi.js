module("tests", {
	setup: function () {
		pi('body').innerHTML = '<div id="test"> <div class="o" id="d1">1</div> <div class="o" id="d2">2</div> </div>';
	},
	teardown: function () {
		pi.H.remove('#test');
	}
});

test('dom test', function(){
	ok( typeof(pi.classAdd) === 'function' );
});

test('dom classAdd', function(){
	var test = pi('#test');
	pi.classAdd(test,'prova');
	ok( pi.classHas(test,'prova') === true );
});

test('dom H remove', function(){
	pi.H.remove('#d1','#test');
	ok( pi('#d1') === null );
});
