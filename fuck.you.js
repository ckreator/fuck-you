// VALID KEYWORDS:

// SAMPLE WORKFLOW:
/*
fuck({x: 5, y:10})                  // initialize a fuck
    .do.to.z                    	// start expression routine and store it into z
        .x.y.plus                   // add x and y (uses reverse polish notation, fuck parenthesis)
            .num(11).mult           // multiply the result with 11
    .stfu                           // ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
    .do.print
        .str(“Here’s the fucking z: %d”).z
    .stfu
.you
*/

const {expression, expression_start} = require('./src/expression')
const {runner, runner_start} = require('./src/runner')

const KEYWORDS = (function() {
	return [
		'do',
		'print',
		'stfu',
		'plus',
		'to',
		'num',
		'mult',
		'divide',
		'str'
		// TODO: add more logic to this
	]
}());

function Scope(parent) {
	let scope = {};
	
	return {
		lookup(prop) {
			if (scope[prop] != null)
				return scope[prop];
			if (parent != null)
				return parent.lookup(prop);
			else
				return null;
		},
		add(prop, value) {
			scope[prop] = value;
		}
	}
}


let fuck = (function() {
	// setup the environment of a fuck
	//const env = {};
	const currScope = Scope(null);
	
	handler = {
		get(target, name) {
			if (name === "you") {
				// stop the 'program' when you is reached
				return target;
			}
			if (name === "to") {
				//target[name] = expression(target);
				return expression_start(target) //target[name];
			}
			if (name === "run") {
				return runner_start(target);
			}
		}
	}
	
	function fuck(e = {}) {
		return new Proxy(e, handler);
	}
	
	return fuck;
})();

module.exports = fuck;