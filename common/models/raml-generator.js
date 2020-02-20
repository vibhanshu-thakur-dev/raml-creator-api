'use strict';
var types = require('../../server/templates/http-types/types');

module.exports = function(Ramlgenerator) {

	Ramlgenerator.beforeRemote('create',function(ctx,res,next){
		if(Array.isArray(ctx.args.data)){
			let err = new Error("Multiple APIs are not allowed. Only one API can be passed at one time.");
			next(err);
		}else{
			app.generateAPIRaml(ctx.args.data);
			next();
		}
	})

};
/*
	Complete this validation
*/
function validateCreateRamlRequest(resources){
	let errMessage = {};
	errMessage.missingFields = [];
	errMessage.badFormatFields = [];
	$.each(resources,function(index,item){

	})
}
