var fs = require('fs');
var types = require('./../../templates/http-types/types');

exports.resourceTypes = {
	generateResourceTypes : function(resource){
		let outputFile = types.resourceTypes.resourceType + types.resourceTypes.description ;
		$.each(resource.methods,function(index,item){
			outputFile+= types.resourceTypes[item.name];
		});

		let rootDir="./server/output/library/";
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);
		rootDir+="resourceTypes/" ;
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);
		app.writeFile(rootDir,resource.name+'-resourceType','.raml',outputFile);
		return ("library/resourceTypes/"+resource.name+'-resourceType.raml' );
	}
}
