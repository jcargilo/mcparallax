
var compressor = require('node-minify');

compressor.minify({
    compressor: 'gcc',
    input: 'src/mcparallax.js',
    output: 'dist/mcparallax.min.js',
    callback: function(err, min) {}
});
