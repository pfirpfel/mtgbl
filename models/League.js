var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * League Model
 * =============
 */

var League = new keystone.List('League', {
	autokey: { from: 'startDate name', path: 'key', unique: true }
});

League.add({
	name: { type: Types.Text, required: true },
	description: { type: Types.Html, wysiwyg: true },
	startDate: { type: Types.Date, format: 'DD-MM-YYYY', default: Date.now, required: true },

	players: { type: Types.Relationship, ref: 'User', many: true },
	pairings: { type: Types.Relationship, ref: 'Pairing', many: true },

	hasStarted: { type: Boolean, index: true, initial: false },
	hasFinished: { type: Boolean, index: true, initial: false }
});

League.register();
