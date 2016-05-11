var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {

	if (req.user) {
		//return res.redirect(req.cookies.target || '/me'); TODO: profil-page?
		return res.redirect(req.cookies.target || '/');
	}

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'session';
	locals.form = req.body;

	view.on('post', { action: 'join' }, function(next) {

		async.series([

			function(cb) {
				if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
					req.flash('error', 'Bitte gebe Name, E-Mail-Adresse und ein Passwort an.');
					return cb(true);
				}
				return cb();
			},

			function(cb) {
				if (req.body.dci && !/\d+/.test(req.body.dci)) {
					req.flash('error', 'Ung&uuml;ltige DCI-Nummer.');
					return cb(true);
				}
				return cb();
			},

			function(cb) {
				keystone.list('User').model.findOne({ email: req.body.email }, function(err, user) {
					if (err || user) {
						req.flash('error', 'Diese E-Mail-Adresse wird bereits verwendet.');
						return cb(true);
					}
					return cb();
				});
			},

			function(cb) {
				var userData = {
					name: {
						first: req.body.firstname,
						last: req.body.lastname,
					},
					email: req.body.email,
					password: req.body.password,
					dci: req.body.dci
				};
				var User = keystone.list('User').model,
					newUser = new User(userData);

				newUser.save(function(err) {
					return cb(err);
				});
			}

		], function(err){

			if (err) return next();

			var onSuccess = function() {
				if (req.body.target && !/join|signin/.test(req.body.target)) {
					console.log('[join] - Set target as [' + req.body.target + '].');
					res.redirect(req.body.target);
				} else {
					res.redirect('/'); // TODO: profil-page?
				}
			}
				req.flash('error', 'Es gab ein Problem beim Versuch dich einzuloggen. Bitte versuche es erneut!');
				return next();
			}

			keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, onSuccess, onFail);

			var onFail = function(e) {

		});
		
	});

	view.render('session/join');

}
