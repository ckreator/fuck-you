let fuck = require('../../fuck.you')
let assert = require('assert')

describe('module property accessing', function() {
	// minimal program:
	it('should be able to run minimal function `fuck().you` and return empty object', function(done) {
		//console.log("FUCK.you", fuck().you)
		assert(fuck().you != null) // when the program ended it just returns 0, so you can't use it further
		// should return empty object:
		let empty = fuck().you;
		let i = 0;
		for (let p in empty)
			i++;
		assert(i === 0);
		done()
	})
	
	it('should be able to do some basic assignment', function(done) {
		let res = fuck({x: 5, y:10})                  // initialize a fuck
		    .to.z                    	// start expression routine and store it into z
		        .x.y.add
		    .stfu                           // ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
		.you;
		
		console.log("RES SHOULD BE context object:", res)
		done()
	})
	
	it('should be able to do handle numbers', function(done) {
		let res = fuck({x: 5, y:10})            // initialize a fuck
		    .to.z                    			// start expression routine and store it into z
		        .num(5)
		    .stfu                           	// ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
		.you;
		
		console.log("NUM FUNC:", res)
		assert(typeof res === "object");
		assert(res.z != null);
		assert(typeof res.z === "number")
		done()
	})
	
	it('should be able to do handle numbers', function(done) {
		let res = fuck({x: 5, y:10})            // initialize a fuck
		    .to.z                    			// start expression routine and store it into z
		        .str("Hello there")
		    .stfu                           	// ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
		.you;
		
		console.log("STR FUNC:", res)
		assert(typeof res === "object");
		assert(res.z != null);
		assert(typeof res.z === "string")
		done()
	})
	
	it('should be able to do handle numbers', function(done) {
		let res = fuck({x: 5, y:10})            // initialize a fuck
		    .to.z                    			// start expression routine and store it into z
		        .bool(true)
		    .stfu                           	// ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
		.you;
		
		console.log("BOOL FUNC:", res)
		assert(typeof res === "object");
		assert(res.z != null);
		assert(typeof res.z === "boolean")
		done()
	})
	
	it('should be able to do reassign newly existed values', function(done) {
		let res = fuck()            // initialize a fuck
		    .to.z                    			// start expression routine and store it into z
		        .num(5)
		    .stfu                           	// ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
			.to.z
				.z.num(15).add
			.stfu
			.to.z
				.z.num(19).minus.num(10).mult
			.stfu
		.you;
		
		console.log("REASSIGN FUNC:", res)
		assert(typeof res === "object");
		assert(res.z != null);
		assert(typeof res.z === "number")
		done()
	})
	
	it('should be able to do print values', function(done) {
		let res = fuck()            // initialize a fuck
		    .to.z                    			// start expression routine and store it into z
		        .num(5)
		    .stfu                           	// ‘stfu’ stands for ‘Shut the fuck up’ and it stops the last routine
			.run.print
				.str("Here's Z:").z.num(5).add
			.stfu
		.you;
		
		console.log("PRINT FUNC:", res)
		assert(typeof res === "object");
		assert(res.z != null);
		assert(typeof res.z === "number")
		done()
	})
})