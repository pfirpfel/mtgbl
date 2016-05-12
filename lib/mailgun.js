var exports = module.exports = {};

var apiKey = process.env.MAILGUN_API_KEY;
var domain  = process.env.MAILGUN_DOMAIN ;

if(apiKey === null || domain === null){

	console.log('Mailgun is not properly configured.');
	exports.sendMail = function(data, next){
		next({error: 'Mailgun is not properly configured.'});
	};

} else {

	var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

	exports.sendMail = function(data, callback){
		mailgun.messages().send(data, callback);
	};

}
