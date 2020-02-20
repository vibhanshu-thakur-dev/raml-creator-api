var fs = require('fs');

exports.dataType = function(){

	return {
		
		generateDataTypeForMethod: function(jsonFileAsString,resourceName,methodName,requestResponse){
			let rootDir="./server/output/library/dataTypes/";
			/*if(!fs.existsSync(rootDir))
				fs.mkdirSync(rootDir);
			rootDir="./server/output/library/dataTypes/" ;
			if(!fs.existsSync(rootDir))
				fs.mkdirSync(rootDir);
			rootDir="./server/output/library/dataTypes/" + resourceName + "/" ;
			if(!fs.existsSync(rootDir))
				fs.mkdirSync(rootDir);
			rootDir="./server/output/library/dataTypes/" + resourceName + "/" + methodName + "/";
			if(!fs.existsSync(rootDir))
				fs.mkdirSync(rootDir);
			rootDir="./server/output/library/dataTypes/" + resourceName + "/" + methodName + "/" + requestResponse + "/";
			if(!fs.existsSync(rootDir))
				fs.mkdirSync(rootDir);*/
			rootDir+= resourceName + "/" + methodName + "/" + requestResponse + "/";
			app.createDirSync(rootDir)			

			let fileExt = ".raml";
			let inputJson = JSON.parse(jsonFileAsString);
			if(Array.isArray(inputJson)){
				exports.dataType.ramlDataTypeForArray(inputJson,resourceName + 'RootArrayDataType',resourceName + 'RootObject',rootDir,fileExt);
				return  resourceName + "/" + methodName + "/" + requestResponse + "/" + resourceName + "RootArrayDataType.raml";
			}else{
				exports.dataType.ramlDataTypeForObject(inputJson,resourceName + 'RootObjectDataType',rootDir,fileExt);
				return  resourceName + "/" + methodName + "/" + requestResponse + "/" + resourceName + "RootObjectDataType.raml";
			}			
		},

		generateObjectTypeHeader : function(){
			return "#%RAML 1.0 DataType\n"+
					"description: Put object description here\n"+
					"type: object\n"+
					"properties:\n";
		},

		generateArrayTypeHeader : function(objectFilePath){
			return "#%RAML 1.0 DataType\n"+
					"description: Put array description here\n"+
					"type: array\n"+
					"items: !include " + objectFilePath + "\n";
		},

		getDataMemberDef : function(key,value,rootDir,fileExt){
			if((typeof value)=="string"){
				//string
				return exports.dataType.getDataMemberBasicString(key,value);
			}else if((typeof value)=="number"){
				//not a string
				return exports.dataType.getDataMemberBasicNumber(key,value);		
			}else if((typeof value)=="boolean"){
				//not a string
				return exports.dataType.getDataMemberBasicBoolean(key,value);		
			}else if((typeof value)=="object"){
				if(value==null){
					//ignore
					return "";
				}else if(Array.isArray(value)){
					//for array
					if(typeof value[0]=="string"){
						return exports.dataType.getDataMemberStringArray(key,value);	  
					}else if(typeof value[0]=="number"){
						return exports.dataType.getDataMemberNumberArray(key,value);		
					}else{
						//exports.dataType.ramlDataTypeForArray(value,key+'Array',key+'Object');
						exports.dataType.ramlDataTypeForObject(value[0],key+'Object',rootDir,fileExt);				
						return exports.dataType.getDataMemberArrayInclusion(key,key+'Object');
					}
				}else{
					exports.dataType.ramlDataTypeForObject(value,key+'Object',rootDir,fileExt);			
					return exports.dataType.getDataMemberObjectInclusion(key,key+'Object');
				}
			}else{
				return "";
			}
		},

		ramlDataTypeForObject : function(jsonObject,fileKeyName,rootDir,fileExt){
			let outputFile = exports.dataType.generateObjectTypeHeader();
			for(let obj in jsonObject){
				outputFile+= exports.dataType.getDataMemberDef(obj,jsonObject[obj],rootDir,fileExt);
			}
			//let outputFilePath = './server/output/'+fileKeyName+'.raml';
			//app.writeFile(rootDir,fileName,fileExt,fileContent);
			app.writeFile(rootDir,fileKeyName,fileExt,outputFile);
			return (fileKeyName + fileExt);
		},

		ramlDataTypeForArray : function(jsonArray,fileKeyName,fileObjectName,rootDir,fileExt){
				let objectFilePath = exports.dataType.ramlDataTypeForObject(jsonArray[0],fileObjectName,rootDir,fileExt);
				//objectFilePath = objectFilePath.substr(objectFilePath.lastIndexOf("/") +1 , objectFilePath.length)
				let outputFile = exports.dataType.generateArrayTypeHeader(objectFilePath);
				app.writeFile(rootDir,fileKeyName,fileExt,outputFile);
		},

		getDataMemberBasicString : function(key,value){
			if(value.length > 40){
				value = value.substr(0,39);
			}
			return  app.getTab(1) + key +":\n" +
					app.getTab(2) + "type: string\n" +
					app.getTab(2) + "required: true\n" +
					app.getTab(2) + "example: \"" + value + "\"\n";	  
		},

		getDataMemberBasicNumber : function(key,value){
			return app.getTab(1) + key +":\n" +
				   app.getTab(2) + "type: number\n" +
				   app.getTab(2) + "required: true\n" +
				   app.getTab(2) + "example: " + value + "\n";
		},

		getDataMemberBasicBoolean : function(key,value){
			return app.getTab(1) + key +":\n" +
				   app.getTab(2) + "type: boolean\n" +
				   app.getTab(2) + "required: true\n" +
				   app.getTab(2) + "example: " + value + "\n";
		},

		getDataMemberStringArray : function(key,value){
			return app.getTab(1) + key +":\n" +
				   app.getTab(2) + "type: string[]\n" +
				   app.getTab(2) + "required: true\n" +
				   app.getTab(2) + "example: " + exports.dataType.getArrayAsString(value) + "\n";
		},

		getDataMemberNumberArray : function(key,value){
			return  app.getTab(1) + key +":\n" +
				    app.getTab(2) + "type: number[]\n" +
					app.getTab(2) + "required: true\n" +
					app.getTab(2) + "example: " + exports.dataType.getArrayAsString(value) + "\n";
		},

		getDataMemberObjectInclusion : function(key,objectFilePath){
			return  app.getTab(1) + key +":\n" +
				    app.getTab(2) + "type: object\n" +
					app.getTab(2) + "required: true\n" +
					app.getTab(2) + "properties: !include " + objectFilePath + ".raml\n";
		},

		getDataMemberArrayInclusion : function(key,arrayFilePath){
			return  app.getTab(1) + key +":\n" +
				    app.getTab(2) + "type: array\n" +
					app.getTab(2) + "required: true\n" +
					app.getTab(2) + "items: !include " + arrayFilePath + ".raml\n";
		},

		getArrayAsString : function(value){
			if(typeof value[0]== "string"){
				let arrayString = '[';
				for(let i=0;(i<value.length && i <3);i++){
					arrayString+= "'"+value[i]+"',";	
				}
				return arrayString.substr(0,arrayString.length-1) + "]";
			}else if(typeof value[0]== "number"){
				return "["+value.toString()+"]";
			}else {
				return ""
			}
		}
	}
}();
