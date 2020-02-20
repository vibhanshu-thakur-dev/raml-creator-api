'use strict'

var fs = require('fs');
var coreRamlTemplate = require('./../../templates/http-types/core-raml');
var typesTemplate = require('./../../templates/http-types/types');
var dataTypeGenerator = require('./../data-type/data-type-generator');
var dataTypeLibGenerator = require('./../data-type/data-type-library-generator');
var exampleFileGenerator = require('./../data-type/example-file-generator');
var resourceTypeGenerator = require('./../resource-type/resource-type-generator');
var coreRamlGenerator = require('./../core-raml/core-raml-generator');

app.generateAPIRaml = function(ramlObject){
	ramlObject = generateDataTypes(ramlObject);

	//generate resourceTypes
	$.each(ramlObject.resources,function(resourceIndex,resourceItem){
		ramlObject.resources[resourceIndex].resourceTypeFileName = resourceTypeGenerator.resourceTypes.generateResourceTypes(resourceItem);
	});

	//generate core API RAML
	coreRamlGenerator.coreRaml.generateCoreRaml(ramlObject);
}

function generateDataTypes(ramlObject){

	let requestRootDataTypeFileName = "", responseRootDataTypeFileName = "";
	let dataTypeLibArr = [];
	//generate RAML Data types:
	$.each(ramlObject.resources,function(resourceIndex,resourceItem){
		$.each(resourceItem.methods,function(methodIndex,methodItem){
			//generate file data type for response
			responseRootDataTypeFileName = dataTypeGenerator.dataType.generateDataTypeForMethod(methodItem.responseExample,resourceItem.name,methodItem.name,"response");
			//pushing dataType key and filename for generating custom types library
			dataTypeLibArr.push({
				key: methodItem.name + resourceItem.name + "Response",
				fileName : responseRootDataTypeFileName
			});
			//storing root data type file names in core ramlObject for future reference
			ramlObject.resources[resourceIndex].methods[methodIndex].responseDataTypeFile = responseRootDataTypeFileName;
			//writing example file
			ramlObject.resources[resourceIndex].methods[methodIndex].responseExampleFile = exampleFileGenerator.exampleFiles.writeExampleFile(methodItem.responseExample,resourceItem.name,methodItem.name,"response");
			// non get methods have request as a part of the method. Generating request datatype for them
			if(methodItem.name != "get"){
				//geneate data type for request
				requestRootDataTypeFileName = dataTypeGenerator.dataType.generateDataTypeForMethod(methodItem.requestExample,resourceItem.name,methodItem.name,"request");
				//pushing dataType key and filename for generating custom types library
				dataTypeLibArr.push({
					key: methodItem.name + resourceItem.name + "Request",
					fileName : responseRootDataTypeFileName
				});
				//storing root data type file names in core ramlObject for future reference
				ramlObject.resources[resourceIndex].methods[methodIndex].requestDataTypeFile = requestRootDataTypeFileName;
				//writing exapmle file
				ramlObject.resources[resourceIndex].methods[methodIndex].requestExampleFile = exampleFileGenerator.exampleFiles.writeExampleFile(methodItem.requestExample,resourceItem.name,methodItem.name,"request");
			}	
		});
		if(resourceItem.resources){
			console.log(resourceItem.resources)
			ramlObject.resources[resourceIndex] = generateDataTypes(resourceItem); 
		}	
	});
	//generate custom data type library file
	dataTypeLibGenerator.dataTypeLib.generateDataTypeLibraryFile(dataTypeLibArr);
	dataTypeLibArr=null;

	return ramlObject;
}