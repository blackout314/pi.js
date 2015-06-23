module("tests", {
	setup: function () {
		pi('body').innerHTML = '<div id="test"></div><div class="classe" id="c1"></div><div class="classe" id="c2"></div>';
	},
	teardown: function () {
		pi.H.remove('#test');
	}
});

test('pi.E : events test ok', function(){
	ok( typeof(pi.E) === 'object' );
});

test('pi.E events on', function(){
	var a = function(){ console.log('x'); };
	pi.E.on('#test','click',a); // add event
	ok( pi.E.eventsArray['#test']['click'].length === 1 );

	pi.E.purge('#test', 'click'); // remove event
	ok( pi.E.eventsArray['#test']['click'].length === 0 );
});

test('pi.E events rm', function(){
	var a = function(){ console.log('x'); };
	pi.E.on('#test','click',a); // add event
	ok( pi.E.eventsArray['#test']['click'].length === 1 );

	pi.E.rm('#test','click',a); // rm event
	ok( pi.E.eventsArray['#test']['click'].length === 0 );
});

test('pii cycle', function(){
    var variabile = false,
        callback = function(){ variabile = true; };
    pii('.classe').on('click', callback);
    pi('#c1').click();
    ok(variabile);

    variabile = false;

    pii('.classe').rm('click', callback);
    pi('#c1').click();
    ok(variabile === false);
});
