module("tests", {
	setup: function () {
		pi('body').innerHTML = '<div id="test" class="testi"> <div class="o" id="d1">1</div> <div class="o" id="d2">2</div> </div>  <div id="append">append</div> ';
	},
	teardown: function () {
		pi.H.remove('#test');
	}
});

test('dom classAdd classDel classHas', function(){
	var test = pi('#test');
	test.addClass('prova');
	ok( test.hasClass('prova') === true );

	test.delClass('prova');
	ok( test.hasClass('prova') === false );
});

test('dom classToggle', function(){
	var test = pi('#test');
	test.toggleClass('prova');
	ok( test.hasClass('prova') === true );

	test.toggleClass('prova');
	ok( test.hasClass('prova') === false );
});

test('dom H remove', function(){
	pi.H.remove('#d1','#test');
	ok( pi('#d1') === null );
});

test('dom classAdd classDel classToggle forEach', function(){
  var d1 = pi('#d1');
	pii('.o').addClass('prova');
	ok( d1.hasClass('prova') === true );

	pii('.o').delClass('prova');
	ok( d1.hasClass('prova') === false );

	pii('.o').toggleClass('prova');
	ok( d1.hasClass('prova') === true );
});

test('dom H append', function(){
	pi.H.append('#append','#test');
	ok( pi('body div #append') !== null );

	pi.H.append('#append','#test', 'top');
	ok( pi('body div:nth-child(1)').id === 'append' );

	pi.H.append('#append','#test', 'down');
	ok( pi('body div:nth-child(1)').id !== 'append' ); // #TODO more tests
});

test('dom foreach', function() {
    var result = pii.forEach('#not', 'classAdd', 'class');
    //console.log(result);
    ok( result === false );
});

test('getPos', function() {
    var pos = pi('#d1').getPos(),
        pos2 = pi('#d2').getPos();
    ok(pos.left==8);
    ok(pos.top==8);
    ok(pos2.top>=27);
});

test('scrollTo', function() {
    var getPosStub = sinon.stub(Element.prototype, 'getPos', function(){ return {left:10,top:10}; } ),
        stub = sinon.stub(window, 'scrollTo');
    pi('#d2').scrollTo();
    ok( getPosStub.called == true );
    stub.restore();
    getPosStub.restore();
});

test('domReady', function() {
    var stub = sinon.stub(document, 'addEventListener'),
        flag = 0;
    pi.ready(function(){
        flag = 1;
    });
    ok( stub.called == true );
    stub.restore();
});
