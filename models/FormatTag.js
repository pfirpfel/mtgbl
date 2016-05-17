var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * (Game) Format Tags Model
 * ===============
 */

var FormatTag = new keystone.List('FormatTag', {
	autokey: { from: 'name', path: 'key', unique: true }
});

FormatTag.add({
	name: { type: String, required: true }
});


/**
 * Relationships
 * =============
 */

FormatTag.relationship({ ref: 'Pairing', refPath: 'tags', path: 'pairings' });


/**
 * Registration
 * ============
 */

FormatTag.register();
