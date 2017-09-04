// VALID KEYWORDS:

// SAMPLE WORKFLOW:
/*
fuck({x: 5, y:10})            // initialize a fuck
    .assign.z                	// assign something to z
        .mult.num(11).plus.x.y      // add x and y (uses reverse polish notation, fuck parenthesis)
                                                 // multiply the result with 11
    .stfu                     // ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
    .do.print
        .str(“Here’s the fucking z: %d”).z
    .stfu
.you
*/

// e.g. -> .mult.sum.minus.num(10).num(5).num(8).num(2).stfu;
// -> ((10 - 5) + 8) * 2

module.exports = require('./src/core');
