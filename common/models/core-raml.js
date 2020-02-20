'use strict';

module.exports = function(Coreraml) {

	Coreraml.beforeRemote('create',function(ctx,res,next){
		if(Array.isArray(ctx.args.data)){
			let err = new Error("Multiple APIs are not allowed. Only one API can be generated at one time.");
			next(err);
		}else{
			app.generateCoreRaml(ctx.args.data.apiName,ctx.args.data.apiVersion,ctx.args.data.apiBaseUri);
			next();
		}
	})	

};
