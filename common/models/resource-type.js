'use strict';

module.exports = function(Customtype) {

	Customtype.beforeRemote('create',function(ctx,res,next){
		if(Array.isArray(ctx.args.data)){
			let err = new Error("Multiple type are not allowed. Only one type can be created at a time.");
			next(err);
		}else{
			app.generateCustomType(ctx.args.data.resourceTypes,ctx.args.data.resourceName)
			next();
		}
	});

};
