var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Page Model
 * ==========
 */

var Page = new keystone.List('Page');

Page.add({
	title: { type: String, initial: true, required: true },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	isMemberOnly: { type: Boolean, label: 'Only viewable for members', index: true, initial: false }
});

Page.register();
