# xz-pipe

Pipes for xz

## Installation

    $ npm install xz-pipe

You will need to have the [xz](http://tukaani.org/xz/) binary in your $PATH.

## Examples

### With pipes

```javascript
var xz = require("xz-pipe");
var fs = require("fs");

var file_in = fs.createReadStream('./file.txt.xz');
var file_out = fs.createWriteStream('file.txt');

file_in.pipe(xz.d()).pipe(file_out);
```

### With a callback

```javascript
var xz = require("xz-pipe");
var fs = require("fs");

var file_in = fs.createReadStream('./file.txt.xz');

file_in.pipe(xz.d(function(uncompressed){
	// uncompressed is a Buffer.
	console.log(uncompressed.toString());
}));
```

## License

It's in the [Public Domain](http://creativecommons.org/publicdomain/mark/1.0/).