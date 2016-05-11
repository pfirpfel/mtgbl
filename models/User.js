var async = require('async');
var keystone = require('keystone');
var Types = keystone.Field.Types;
var crypto = require('crypto');

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	dci: { type: Types.Text, initial: true },
	password: { type: Types.Password, initial: true, required: true },
	gravatar: { type: String, noedit: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isMember: { type: Boolean, label: 'Is club member', index: true, initial: true },
	isEditor: { type: Boolean, label: 'Can edit/create content', index: true, initial: true }
});


/**
 * Virtuals
 */

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

// Pull out avatar image
User.schema.virtual('avatarUrl').get(function() {
	if (this.gravatar) return 'http://www.gravatar.com/avatar/' + this.gravatar + '?d=http%3A%2F%2Fsydjs.com%2Fimages%2Favatar.png&r=pg';
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Pre-save
 */

User.schema.pre('save', function(next) {
	var member = this;
	async.parallel([
		function(done) {
			if (!member.email) return done();
			member.gravatar = crypto.createHash('md5').update(member.email.toLowerCase().trim()).digest('hex');
			return done();
		}
	], next);
});


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
