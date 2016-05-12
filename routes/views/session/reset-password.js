var keystone = require('keystone'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('init', function(next) {

		User.model.findOne().where('resetPasswordKey', req.params.key).exec(function(err, user) {
			if (err) return next(err);
			if (!user) {
				req.flash('error', 'Ung&uuml;ltiger Passwort-Schl&uuml;ssel!');
				return res.redirect('/forgot-password');
			}
			locals.found = user;
			next();
		});

	});

	view.on('post', { action: 'reset-password' }, function(next) {
		/*jshint camelcase: false */
		if (!req.body.password || !req.body.password_confirm) {
			req.flash('error', 'Bitte neues Passwort eingeben.');
			return next();
		}

		if (req.body.password !== req.body.password_confirm) {
			req.flash('error', 'Passw&ouml;rter stimmen nicht &uuml;berein!');
			return next();
		}

		locals.found.password = req.body.password;
		locals.found.resetPasswordKey = '';
		locals.found.save(function(err) {
			if (err) return next(err);
			req.flash('success', 'Passwort wurde zur&uuml;ckgesetzt.');
			res.redirect('/signin');
		});

	});

	view.render('session/reset-password');

};
