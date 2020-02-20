'use strict';

var fs = require('fs');



module.exports = function(Datatype) {

	Datatype.beforeRemote('create',function(ctx,res,next){
		
		if(Array.isArray(ctx.args.data)){
			let err = new Error("Multiple files are not allowed. Only one JSON file can be passed at one time.");
			next(err);
		}else{
			fs.writeFile('server/output/Example.json' , ctx.args.data.inputJson, function(err, data){
			    if (err) console.log(err);
			    console.log("Successfully Written Example File." + "Example.json");
			});
			let inputJson = JSON.parse(ctx.args.data.inputJson);
			if(Array.isArray(inputJson)){
				app.ramlDataTypeForArray(inputJson,'rootArrayDataType','rootObject');
			}else{
				app.ramlDataTypeForObject(inputJson,'rootObjectDataType');
			}
			next();
		}

	})

};





