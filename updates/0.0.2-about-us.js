/**
 * This script automatically creates initial pages
 */
var jade = require('jade');

var aboutus = jade.compileFile('./templates/views/aboutus.jade');

exports.create = {
	Page: [
		{ 'title': '\xDCber Uns', content: aboutus(), isMemberOnly: false }
	]
};
