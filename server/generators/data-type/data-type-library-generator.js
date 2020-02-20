var fs = require('fs');

/*migrate the entire peice*/
exports.dataTypeLib = function(){

	return {
		header : "#%RAML 1.0 Library\n"+
				 "types:\n",
		generateDataTypeLibraryFile: function(dataTypeLibArr){
			let fileContent = exports.dataTypeLib.header;
			$.each(dataTypeLibArr,function(dataIndex,dataItem){
				fileContent+= app.getTab(1) + dataItem.key + ": !include " +dataItem.fileName + "\n";
			})
			app.writeFile("./server/output/library/dataTypes/","customDataTypes",".raml",fileContent);
		}
	}
}();
