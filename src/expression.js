const {ctxLookup} = require('./shared')

console.log("CTXLOOKUP:", ctxLookup)

const expression_funcs = [
	'num',
	'str',
	'ary',
	'obj',
	'bool'
]

const expression_handler = {
	get(target, name) {
		console.log("ADDING PROPERTY", name)
		if (name === "stfu")
			 return new Proxy(target.__end(), handler)
			 
		// check whether target has such a property
		if (expression_funcs.find(x => x === name) != null) {
			console.log("SPECIAL FUNC: ", name)
			return function(...args) {
				// first, call the real function:
				target[name].apply({}, args);
				return new Proxy(target, expression_handler);
			}
		} else if (typeof target[name] === "function") {
			target[name](name)
		} else
			target.__push(name)
		console.log("RETURNING TARGET: ", target)
		return new Proxy(target, expression_handler);
	},
	apply(target, thisArg, args) {
		console.log("CALLING FUNCTION: ", target, thisArg, args)
	}
}


function expression(from, name) {
	// check whether there was a value before
	let chain = [];
	chain.stored = {};
	// TODO: find a better way to store the previous value
	if (from[name] != null) {
		//chain.stored = chain.stored || {};
		chain.stored[name] = from[name]
	}
	
	let funcs = (function() {
		let map = {
			'num': Number,
			'bool': Boolean,
			'str': String,
			'ary': Array,
			'obj': Object,
			'null': null
		};
		let out = {}
		for (let p in map) {
			out[p] = function(x) {
				chain.push(map[p](x))
			}
		}
		return out;
	})()
	
	function genOps(len, fn) {
		return function() {
			let values = [];
			for (let i = 0; i < len; i++) {
				let x = chain.pop()
				console.log("DOING X: ", x, chain)
				
				// TODO: extend this to go beyond numbers
				values.push( ctxLookup(chain.stored, x, Number) || ctxLookup(from, x, Number) )
			}
			
			console.log("GENERATED VALUES: ", values)
			
			//chain.push(b + a)
			fn.apply({}, values)	
		}
	}
	
	let ret = {
		// add some basic math:
		add: genOps(2, (b, a) => chain.push(a + b)),
		minus: genOps(2, (b, a) => chain.push(a - b)),
		mult: genOps(2, (b, a) => chain.push(a * b)),
		divide: genOps(2, (b, a) => chain.push(a / b)),
		mod: genOps(2, (b, a) => chain.push(a % b)),
		__push(value) {
			//chain.push(value);
			chain.push(ctxLookup(chain.stored, value) || ctxLookup(from, value));
		},
		__end() {
			// is called whenever we access .stfu
			console.log("GOT THIS CHAIN: ", chain)
			// TODO: add some processing, but it should always use the last element
			from[name] = chain.pop();
			// in the end, delete the value from chain.stored, so we have the freshest value
			//chain.
			return from;
		}
	}	
	Object.assign(ret, funcs);
	console.log("RET IS NOW: ", ret)
	
	return new Proxy(ret, expression_handler)
}


function expression_start(from) {
	return new Proxy(from, {
		// set the name of the property
		get(target, name) {
			target[name] = expression(from, name);
			return target[name];
		}
	})
}

module.exports = {
	expression,
	expression_start
}