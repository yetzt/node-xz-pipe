var comandante = require("comandante");
var path = require("path");
var fs = require("fs");

var spawn = require("child_process").spawn;

var xz = null;

(function(){
	if (!'PATH' in process.env) return;
	var p = process.env.PATH.split(/:/g);
	for (var i = 0; i < p.length; i++) {		
		if (fs.existsSync(path.resolve(p[i], 'xz'))) {
			xz = path.resolve(p[i], 'xz');
			break;
		}
	};
	if (!xz) throw new Error('`xz` command not found');
})();

module.exports.d = function(c){
	if (!xz) return;
	var p = comandante(xz, ['-d', '-c']);
	if (typeof c === 'function') {
		var bufs = [];
		p.stdout.on('data', function(d){
			bufs.push(d);
		});
		p.stdout.on('end', function(){
			c(Buffer.concat(bufs));
		})
	}
	return p;
};

module.exports.z = function(c){
	if (!xz) return;
	var p = comandante(xz, ['-z', '-c']);
	if (typeof c === 'function') {
		var bufs = [];
		p.stdout.on('data', function(d){
			bufs.push(d);
		});
		p.stdout.on('end', function(){
			c(Buffer.concat(bufs));
		})
	}
	return p;
};
