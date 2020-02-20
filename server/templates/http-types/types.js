'use strict';

exports.resourceTypes = {
	allowedMethods:["get","post","delete","patch","put"],
	resourceType: "#%RAML 1.0 ResourceType\n",
	description:"description: <<resourceTypeDescription>>\n",
	get: "get:\n" +
  		app.getTab(1) + "description: <<getDescription>>\n" +
  		app.getTab(1) + "responses:\n" +
    	app.getTab(2) + "200:\n" +
	    app.getTab(3) + "body:\n" +
        app.getTab(4) + "type: <<getResponseType>>\n" +
        app.getTab(4) + "example: <<getResponseExample>>\n",
    post: "post:\n" +
		app.getTab(1) + "description: <<postDescription>>\n" +
		app.getTab(1) + "body:\n" +
		app.getTab(2) + "type: <<postRequestType>>\n" +
		app.getTab(2) + "example: <<postRequestExample>>\n" +
		app.getTab(1) + "responses:\n" +
		app.getTab(2) + "200:\n" +
		app.getTab(3) + "body:\n" +
		app.getTab(4) + "type: <<postResponseType>> \n" +
		app.getTab(4) + "example: <<postResponseExample>> \n",
	delete:"delete: \n" +
		app.getTab(1) + "description: <<deleteDescription>>\n" +
		app.getTab(1) + "body: \n" +
		app.getTab(2) + "example: <<deleteRequestExample>> \n" +
		app.getTab(2) + "type: <<deleteRequestType>> \n" +
		app.getTab(1) + "responses: \n" +
		app.getTab(2) + "200: \n" +
		app.getTab(3) + "body: \n" +
		app.getTab(4) + "type: <<deleteResponseType>> \n" +
		app.getTab(4) + "example: <<deleteResponseExample>> \n",
	put: "put:\n" +
		app.getTab(1) + "description: <<putDescription>>\n" +
		app.getTab(1) + "body:\n" +
		app.getTab(2) + "type: <<putRequestType>>\n" +
		app.getTab(2) + "example: <<putRequestExample>>\n" +
		app.getTab(1) + "responses:\n" +
		app.getTab(2) + "200:\n" +
		app.getTab(3) + "body:\n" +
		app.getTab(4) + "type: <<putResponseType>> \n" +
		app.getTab(4) + "example: <<putResponseExample>> \n",
	 patch: "patch:\n" +
		app.getTab(1) + "description: <<patchDescription>>\n" +
		app.getTab(1) + "body:\n" +
		app.getTab(2) + "type: <<patchRequestType>>\n" +
		app.getTab(2) + "example: <<patchRequestExample>>\n" +
		app.getTab(1) + "responses:\n" +
		app.getTab(2) + "200:\n" +
		app.getTab(3) + "body:\n" +
		app.getTab(4) + "type: <<patchResponseType>> \n" +
		app.getTab(4) + "example: <<patchResponseExample>> \n"	

}