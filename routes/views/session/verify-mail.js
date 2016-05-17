var keystone = require('keystone'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	view.on('init', function(next) {

		User.model.findOne().where('verifyEmailKey', req.params.key).exec(function(err, user) {
			if (err) return next(err);
			if (user) {
				user.isVerified = true;
				user.save(function(err) {
					if (err) return next(err);
					req.flash('success', 'E-mail-Adresse best\xE4tigt');
					res.redirect('/');
				});
			} else {
				// failed
				next('No user object');
			}
		});

	});

	view.render('session/verify-mail');

};
