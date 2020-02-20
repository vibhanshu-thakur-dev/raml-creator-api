'use strict';

var fs = require('fs');

exports.exampleFiles = {
	/*
	*/
	writeExampleFile : function(fileContent,resourceName,methodName,requestResponse){
		let rootDir="./server/output/examples/";
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);
		rootDir+= resourceName + "/" ;
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);
		rootDir+= methodName + "/";
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);
		rootDir+= requestResponse + "/";
		if(!fs.existsSync(rootDir))
			fs.mkdirSync(rootDir);

		app.writeFile(rootDir,resourceName,'.json',fileContent);
		return ('examples/'+resourceName+"/"+methodName + "/" +requestResponse + "/"+resourceName+'.json');
	}
}