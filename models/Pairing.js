var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Pairing Model
 * =============
 */

var Pairing = new keystone.List('Pairing');

Pairing.add({
	round: { type: Types.Number },
	date: { type: Types.Date, format: 'DD-MM-YYYY' },
	remarks: { type: Types.Text },
	formatTags: { type: Types.Relationship, ref: 'FormatTag', many: true },

	playerA: { type: Types.Relationship, ref: 'User', index: true },
	pointsPlayerA { type: Types.Number, default: 0 },
	playerB: { type: Types.Relationship, ref: 'User', index: true },
	pointsPlayerB { type: Types.Number, default: 0 },

	isReported: { type: Boolean, index: true, initial: false },
	reportedBy: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Datetime, format: 'DD-MM-YYYY HH:mm' }
});

Pairing.register();
