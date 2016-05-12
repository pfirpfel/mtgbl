var keystone = require('keystone'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);

	view.on('post', { action: 'forgot-password' }, function(next) {
		
		if (!req.body.email) {
			req.flash('error', 'Bitte E-Mail-Adresse angeben!');
			return next();
		}

		User.model.findOne().where('email', req.body.email).exec(function(err, user) {
			if (err) return next(err);
			if (!user) {
				req.flash('error', 'Unbekannte E-Mail-Adresse.');
				return next();
			}
			user.resetPassword(function(err) {
				if (err) {
					console.error('===== ERROR sending reset password email =====');
					console.error(err);
					req.flash('error', 'Fehler beim Versenden der Zur\xFCcksetz-Email. Bitte mache uns auf den Fehler <a href="https://github.com/pfirpfel/mtgbl/issues" class="alert-link">aufmerksam</a>!');
					next();
				} else {
					req.flash('success', 'Zur\xFCcksetz-Email verschickt!');
					res.redirect('/signin');
				}
			});
		});

	});

	view.render('session/forgot-password');

};
