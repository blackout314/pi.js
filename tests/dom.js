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

test('dom classAdd classDel classHas', function(){
	var test = pi('#test');
	pi.classAdd(test,'prova');
	ok( pi.classHas(test,'prova') === true );

	pi.classAdd('#test','prova2');
	ok( pi.classHas('#test','prova2') === true );

	pi.classDel(test,'prova');
	pi.classDel('#test','prova2');
	ok( pi.classHas(test,'prova') === false );
	ok( pi.classHas('#test','prova2') === false );
});

test('dom classToggle', function(){
	var test = pi('#test');
	pi.classToggle(test,'prova');
	ok( pi.classHas(test,'prova') === true );

	pi.classToggle('#test','prova');
	ok( pi.classHas('#test','prova') === false );
});

test('dom H remove', function(){
	pi.H.remove('#d1','#test');
	ok( pi('#d1') === null );
});

test('dom classAdd classDel classToggle forEach', function(){
	pii.classAdd('.o', 'prova');
	ok( pi.classHas('#d1','prova') === true );

	pii.classDel('.o', 'prova');
	ok( pi.classHas('#d1','prova') === false );

	pii.classToggle('.o', 'prova');
	ok( pi.classHas('#d1','prova') === true );
});
