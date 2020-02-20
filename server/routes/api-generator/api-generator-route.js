var express = require('express');
var apigeneratorrouter = express.Router();
var request = require('request');
var rp = require('request-promise');
var moment = require('moment');
require('json-response');
var bodyParser = require('body-parser');

function validateAPIRamlCreationRequest(reqBody){
	let errMessage = {};
	errMessage.missingFields = [];
	errMessage.badFormatFields = [];
	if(! reqBody.name){
		errMessage.missingFields.push("<name> is a mandatory field. API's name should be passed.")
	}
	if(! reqBody.version){
		errMessage.missingFields.push("<version> is a mandatory field. API's version should be passed.")
	}
	if(! reqBody.baseUri){
		errMessage.missingFields.push("<baseUri> is a mandatory field. API's baseUri should be passed.")
	}
	if(! reqBody.resources){
		errMessage.missingFields.push("<resources> is a mandatory field. Cannot create an API without resources.")
	} else if(Array.isArray(reqBody.resources)){

	} else{
		errMessage.badFormatFields.push("<resources> should be an array of objects. Cannot accept non array value");
	}


}

/* Function to send user query to company email.
*/
function generateAPIRaml(req,res,next){
	app.generateCoreRaml
	console.log(req.body);
	res.status(200).send({
		status:"OK",
		message:"API Raml generated successfuly"
	})
}

apigeneratorrouter.post('/raml',generateAPIRaml);

module.exports = apigeneratorrouter;