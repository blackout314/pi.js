[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Built with TravisCI](https://api.travis-ci.org/blackout314/pi.js.svg)](https://travis-ci.org/)

pi.js
=====

*modern minimalist vanilla javascript framework*

## JSPerf
* http://jsperf.com/jquery-vs-pijs
* http://jsperf.com/jquery-vs-pijs-2


## Example
### Elm & Elms select
```javascript
pi('#id')
pii('.class')
```

### Class manipulation
```javascript
pi.classAdd('#try', 'newClass');
pii.classAdd('.class', 'newClass');
```

### jQuery style .ready
```javascript
pi.ready(function(){
});
```

### Html Manipulation
```javascript
// append child to
pi.H.append( pi('#u'), pi('#d') );
// remove child
pi.H.remove( pi('#u') );
```

### Listener
```javascript
var listener = function(e) { console.log(e); };
pi('#try').on('click',listener);
pi('#try').rm('click',listener);
pii('.class').on('click',listener);
pii('#try .sub')[0].on('mouseover',listener);
```

#### Event Listeners Manager
```javascript
var a = function(){ console.log('a'); };
var b = function(){ console.log('b'); };

pi.E.on( '#one', 'click', a );
pi.E.on( '#one', 'click', b );

// when click on #one -> print a \n b

// remove all click listeners

pi.E.purge( '#one', 'click' ); 
```


### Topics Pub/Sub Notifier
```javascript
var callback = function(a){ console.log('LOG: '+a); };
pi.T.sub('NOTICE', callback);
pi.T.pub('NOTICE',['hello']);
pi.T.unsub({'topic':'NOTICE','callback':callback});
pi.T.pub('NOTICE',['hello']);
```


### LocalStorage
```javascript
pi.S.set('key','value');
```

#### Namespace on LocalStorage
```javascript
var hello = pi.S.namespace('hello');
hello.set('key','value');	// set key
hello.get('key');			// get key
```


### AjaxCall
```javascript
var ok = function (data) { console.log(data); };
pi.A({
    type:'GET',
    url:'example.json',
    success:ok
});
```


### Routes 
```javascript
var ok = function (action,arg1,arg2) { console.log(arg1); };
pi.R.add('news', ok);	-> hash ->	#!/news/arg1/arg2

pi.R.bundle( [
	{
		route:'news',
		callback:function(){ alert('news'); }
	},
	{
		route:'defaultAction',
		callback:function(){ alert('defaultAction'); }
	}
] );
pi.R.start('defaultAction');
```


## Questions

###Why
In the amazing javascript world we'll found many great framework, but this is the _mine_.
I hate IE and i have no plans to support it.
IE is a ugly program (i call him virus/malware).

###Who
I'm a humble javascript coder

###What
Make website smart and amazing

###Where
Github!

###Browser support:
- Firefox 3.5+
- Opera 9+
- Safari 4+
- Chrome 1+
- iPhone and iPad iOS1+
- Android phone and tablets 2.1+
- Blackberry OS6+
- Mobile Firefox
- Opera Mobile
- Windows 7.5+
- IE9+

made with <3 from italy
