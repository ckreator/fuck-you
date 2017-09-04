const {ctxLookup} = require('./shared')

const built_in = {
	print(from) {
		let args = Array.from(arguments);
		console.log.apply({}, args);
	}
}

console.log("CTXLOOKUP:", ctxLookup)

const runner_funcs = [
	'num',
	'str',
	'ary',
	'obj',
	'bool'
]

const runner_handler = {
	get(target, name) {
		console.log("ADDING PROPERTY", name)
		if (name === "stfu")
			 return new Proxy(target.__end(), handler)
			 
		// check whether target has such a property
		if (runner_funcs.find(x => x === name) != null) {
			console.log("SPECIAL FUNC: ", name)
			return function(...args) {
				// first, call the real function:
				target[name].apply({}, args);
				return new Proxy(target, runner_handler);
			}
		} else if (typeof target[name] === "function") {
			target[name](name)
		} else
			target.__push(name)
		console.log("RETURNING TARGET: ", target)
		return new Proxy(target, runner_handler);
	},
	apply(target, thisArg, args) {
		console.log("CALLING FUNCTION: ", target, thisArg, args)
	}
}


function runner(from, name) {
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
			//console.log("CHECKING VALUE: ", ctxLookup(from, value));
			chain.push(ctxLookup(chain.stored, value) || ctxLookup(from, value));
		},
		__end() {
			// is called whenever we access .stfu
			console.log("GOT THIS CHAIN: ", chain)
			// TODO: add some processing, but it should always use the last element
			delete chain.stored;
			// 1. if any of the built-in functions are used, we run it first.
			// this means that if you stored something with the same name in your context,
			// it will be ignored
			if (typeof built_in[name] === "function") {
				built_in[name].apply({}, chain);
			}
			from[name] = chain;
			return from;
		}
	}	
	Object.assign(ret, funcs);
	console.log("RET IS NOW: ", ret)
	
	return new Proxy(ret, runner_handler)
}


function runner_start(from) {
	return new Proxy(from, {
		// set the name of the property
		get(target, name) {
			target[name] = runner(from, name);
			return target[name];
		}
	})
}

module.exports = {
	runner,
	runner_start
}