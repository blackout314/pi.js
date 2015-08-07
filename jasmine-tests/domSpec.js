describe("DOM classAdd classDel classHas", function() {

  beforeEach(function() {
    pi('body').innerHTML = '<div id="test" class="testi"> <div class="o" id="d1">1</div> <div class="o" id="d2">2</div> </div>  <div id="append">append</div> ';
    var test = pi('#test');
  });
  afterEach(function() {
    pi.H.remove('#test');
  });

  it("i try classAdd function", function() {
    pi.classAdd(test, 'prova');
    expect( pi.classHas(test, 'prova') ).toBe(true);
  });

  it("i try classDel function", function() {
    pi.classAdd(test, 'prova');
    pi.classDel(test, 'prova');
    expect( pi.classHas(test, 'prova') ).not.toBe(true);
  });

  it("i try classToggle function", function() {
    pi.classToggle(test, 'prova');
    expect( pi.classHas(test, 'prova') ).toBe(true);
    pi.classToggle(test, 'prova');
    expect( pi.classHas(test, 'prova') ).not.toBe(true);
  });

  it("i try to use pii classAdd", function() {
    pii.classAdd('.o', 'prova');
    var cosa = pi.classHas('#d1','prova');
    expect( cosa ).toBe(true); // DOVREBBE essere true > bug di phantomjs risolto nella 2.0 - in pratica typeof di document.querySelectorAll è function
  });

  if("i try to use H.append", function() {
    pi.H.append('#append','#test');
    expect( pi('body div #append') ).not.toBe(null);
  });

  it("i try domReadt function", function() {
    var addEventListenerStub = sinon.stub(document, "addEventListener"),
        flag = 0;
    pi.ready(function(){
      flag = 1;
    });

    expect( addEventListenerStub.called ).toBe( true );
    addEventListenerStub.restore();
  });
});
