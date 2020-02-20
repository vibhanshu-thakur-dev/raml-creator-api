'use strict';

exports.coreRaml = {
	ramlHeader:"#%RAML 1.0 \n",
	title:"title: ",
	version: "version: ",
	baseUri: "baseUri: ",
	protocols: "protocols: [HTTPS,HTTP]\n",
	mediaType: "mediaType: application/json\n",
	customTypes: "uses:\n"+
				 app.getTab(1) + "customDataTypes: library/dataTypes/customDataTypes.raml\n",
	resourceTypes: "resourceTypes:\n"
}