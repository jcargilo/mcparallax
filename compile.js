
const compressor = require('node-minify');
const Fs = require('fs');

compressor.minify({
    compressor: 'gcc',
    input: 'src/mcparallax.js',
    output: 'dist/mcparallax.min.js',
    callback: function(err, min) {
        Fs.copyFileSync('dist/mcparallax.min.js', 'demo/mcparallax.min.js');
    }
});
