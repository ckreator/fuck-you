function ctxLookup(ctx, prop, convert) {
	console.log("GOT PROP: ", prop, ctx[prop])
	if (typeof prop === "number")
		return prop;
	if (ctx[prop] != null) {
		return convert != null ? convert(ctx[prop]) : ctx[prop];
	}
	return null;
}

module.exports = {
	ctxLookup
}