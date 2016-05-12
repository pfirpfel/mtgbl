var keystone = require('keystone');

exports = module.exports = function(req, res) {

	if (req.user) {
		return res.redirect(req.cookies.target || '/'); // TODO: profil-page?
	}

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'session';
	locals.form = req.body;

	view.on('post', { action: 'signin' }, function(next) {

		if (!req.body.email || !req.body.password) {
			req.flash('error', 'Bitte E-Mail-Adresse und Passwort eingeben.');
			return next();
		}

		var onSuccess = function() {
			if (req.body.target && !/join|signin/.test(req.body.target)) {
				console.log('[signin] - Set target as [' + req.body.target + '].');
				res.redirect(req.body.target);
			} else {
				res.redirect('/'); // TODO: profil-page?
			}
		};

		var onFail = function() {
			req.flash('error', 'E-Mail-Adresse oder Passwort sind ung\xFCltig. Bitte nochmal versuchen.');
			return next();
		};

		keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, onSuccess, onFail);

	});

	view.render('session/signin');

};
