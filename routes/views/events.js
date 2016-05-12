var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'events';
	locals.data = {
		events: []
	};

	// Load upcoming events
	view.on('init', function(next) {

		var now = new Date();

		var q = keystone.list('Event').paginate({
				page: req.query.page || 1,
				perPage: 20,
				maxPages: 10
			})
			.where('date').gt(now)
			.sort('date');

		q.exec(function(err, results) {
			locals.data.events = results;
			next(err);
		});

	});

	// Render the view
	view.render('events');
};
