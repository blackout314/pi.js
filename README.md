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

### Listener
```javascript
var listener = function(e) { console.log(e); };
pi('#try').on('click',listener);
pi('#try').rm('click',listener);
pii('.class').on('click',listener);
pii('#try .sub')[0].on('mouseover',listener);
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

### Pub/Sub Notifier
```javascript
var callback = function(a){ console.log('LOG: '+a); };
pi.sub('NOTICE', callback);

pi.pub('NOTICE',['hello']);
pi.unsub({'topic':'NOTICE','callback':callback});
pi.pub('NOTICE',['hello']);
```

### LocalStorage
```javascript
pi.storage.set('key','value');
```

### Namespace on LocalStorage
```javascript
var hello = pi.storage.namespace('hello');
hello.set('key','value');	// set key
hello.get('key');			// get key
```

### AjaxCall
```javascript
var ok = function (data) { console.log(data); };
pi.ajax( {
    type:'GET',
    url:'example.json',
    success:ok
} );
```

### Routes 
```javascript
var ok = function (action,arg1,arg2) { console.log(arg1); };
pi.route.add('news', ok);	-> hash ->	#!/news/arg1/arg2

pi.route.bundle( [
	{
		route:'news',
		callback:function(){ alert('news'); }
	},
	{
		route:'defaultAction',
		callback:function(){ alert('defaultAction'); }
	}
] );
pi.route.start('defaultAction');
```

##Why
In the amazing javascript world we'll found many great framework, but this is the _mine_.
I hate IE and i have no plans to support it.
IE is a ugly program (i call him virus/malware).

##Who
I'm a humble javascript coder

##What
Make website smart and amazing

##Where
Github!

##Browser support:
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
