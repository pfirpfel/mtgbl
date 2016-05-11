var exports = module.exports = {};

var api_key = process.env.MAILGUN_API_KEY;
var domain  = process.env.MAILGUN_DOMAIN;

if(api_key === null || domain === null){

	console.log("Mailgun is not properly configured.")
	exports.sendMail = function(data, next){
		next({error: "Mailgun is not properly configured."});
	};

} else {

	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

	exports.sendMail = mailgun.messages().send;

}
