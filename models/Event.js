var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * =============
 */

var Event = new keystone.List('Event', {
	autokey: { from: 'date name', path: 'key', unique: true }
});

var locationDefault = {
	name: 'Excalibur-Keller (Untergeschoss Rathaus)',
	street1: 'Salzgasse',
	postcode: '4410',
	suburb: 'Liestal',
	country: 'Switzerland',
	geo: [ 7.734692, 47.483820 ]
};

Event.add({
	name: { type: String, required: true },
	description: { type: Types.Html, wysiwyg: true },
	date: { type: Types.Datetime, format: 'DD-MM-YYYY HH:mm', default: Date.now, required: true },
	location: { type: Types.Location, defaults: locationDefault, required: true }
});

Event.defaultColumns = 'name, date, location';

Event.register();
