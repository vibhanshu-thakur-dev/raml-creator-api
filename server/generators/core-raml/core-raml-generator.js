var fs = require('fs');

var raml = require('./../../templates/http-types/core-raml');

exports.coreRaml = {
	generateCoreRaml : function(ramlObject){
		let outputFile = raml.coreRaml.ramlHeader ;
		outputFile+= raml.coreRaml.title + ramlObject.name + "\n";
		outputFile+= raml.coreRaml.version + ramlObject.version + "\n";
		outputFile+= raml.coreRaml.baseUri + ramlObject.baseUri + "\n";
		outputFile+= raml.coreRaml.protocols + "\n";
		outputFile+= raml.coreRaml.mediaType + "\n";
		outputFile+= raml.coreRaml.customTypes + "\n";
		outputFile+= raml.coreRaml.resourceTypes;
		//
		$.each(ramlObject.resources,function(resourceIndex,resourceItem){
			outputFile+= app.getTab(1) + resourceItem.name +"type: !include " +resourceItem.resourceTypeFileName + "\n";
			ramlObject.resources[resourceIndex].resourceTypeName = resourceItem.name +"type" ;
		})
		
		$.each(ramlObject.resources,function(resourceIndex,resourceItem){
			outputFile+= "\n/" + resourceItem.name + ":\n";
			outputFile+= app.getTab(1) + "type:\n";
			outputFile+= app.getTab(2) + resourceItem.resourceTypeName + ":\n";
			outputFile+= app.getTab(3) + "resourceTypeDescription: " + resourceItem.desc + "\n" ;
			outputFile+= exports.coreRaml.generateResourceDetails(resourceItem.methods,resourceItem.name);
		})

		app.writeFile('./server/output/', ramlObject.name + '-api','.raml',outputFile);
	},
	generateResourceDetails: function(methods,resourceName){
		let resourceList = "";
		$.each(methods,function(methodIndex,methodItem){
			if(methodItem.name == "get"){
				resourceList+= exports.coreRaml.getMethodParams(3,methodItem.desc,methodItem.responseExampleFile,methodItem.name + resourceName + "Response" );
			}else if (methodItem.name == "post") {
				resourceList+= exports.coreRaml.postMethodParams(3,methodItem.desc,methodItem.responseExampleFile,methodItem.name + resourceName + "Response",methodItem.requestExampleFile,methodItem.name + resourceName + "Request");
			}else if (methodItem.name == "patch") {
				resourceList+= exports.coreRaml.postMethodParams(3,methodItem.desc,methodItem.responseExampleFile,methodItem.name + resourceName + "Response",methodItem.requestExampleFile,methodItem.name + resourceName + "Request");
			}else if (methodItem.name == "delete") {
				resourceList+= exports.coreRaml.postMethodParams(3,methodItem.desc,methodItem.responseExampleFile,methodItem.name + resourceName + "Response",methodItem.requestExampleFile,methodItem.name + resourceName + "Request");
			}else if (methodItem.name == "put") {
				resourceList+= exports.coreRaml.postMethodParams(3,methodItem.desc,methodItem.responseExampleFile,methodItem.name + resourceName + "Response",methodItem.requestExampleFile,methodItem.name + resourceName + "Request");
			}
		});
		return resourceList;
	},
	getMethodParams: function(tabCount,desc,resExample,resType){
		return "\n" + app.getTab(tabCount) + "getDescription: " + desc + "\n"+
				app.getTab(tabCount) + "getResponseType: customDataTypes." + resType + "\n"+
				app.getTab(tabCount) + "getResponseExample: !include " + resExample + "\n"; 
	},
	postMethodParams: function(tabCount,desc,resExample,resType,reqExample,reqType){
		return "\n" + app.getTab(tabCount) + "postDescription: " + desc + "\n"+
				app.getTab(tabCount) + "postResponseType: customDataTypes." + resType +"\n"+
				app.getTab(tabCount) + "postResponseExample: !include " + resExample + "\n" +
				app.getTab(tabCount) + "postRequestExample: !include " + reqExample + "\n" +
				app.getTab(tabCount) + "postRequestType: customDataTypes." + reqType + "\n"; 
	},
	patchMethodParams: function(tabCount,desc,resExample,resType,reqExample,reqType){
		return "\n" + app.getTab(tabCount) + "patchDescription: " + "\n"+
				app.getTab(tabCount) + "patchResponseType: customDataTypes." + resType + "\n"+
				app.getTab(tabCount) + "patchResponseExample: !include " + resExample + "\n" +
				app.getTab(tabCount) + "patchRequestExample: !include " + reqExample + "\n" +
				app.getTab(tabCount) + "patchRequestType: customDataTypes." + reqType + "\n";
	},
	putMethodParams: function(tabCount,desc,resExample,resType,reqExample,reqType){
		return "\n" + app.getTab(tabCount) + "putDescription: " + "\n"+
				app.getTab(tabCount) + "putResponseType: customDataTypes." + resType + "\n"+
				app.getTab(tabCount) + "putResponseExample: !include " + resExample + "\n" +
				app.getTab(tabCount) + "putRequestExample: !include " + reqExample + "\n" +
				app.getTab(tabCount) + "putRequestType: customDataTypes." + reqType + "\n";
	},
	deleteMethodParams: function(tabCount,desc,resExample,resType,reqExample,reqType){
		return "\n" + app.getTab(tabCount) + "deleteDescription: " + "\n"+
				app.getTab(tabCount) + "deleteResponseType: customDataTypes." + resType +"\n"+
				app.getTab(tabCount) + "deleteResponseExample: !include " + resExample + "\n" +
				app.getTab(tabCount) + "deleteRequestExample: !include " + reqExample + "\n" +
				app.getTab(tabCount) + "deleteRequestType: customDataTypes." + reqType + "\n"; 
	}
}