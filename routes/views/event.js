var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'events';
	locals.filters = {
		event: req.params.event
	};
	locals.data = {
		event: null,
		events: []
	};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Event').model.findOne({
			key: locals.filters.event
		});//.populate('author categories');

		q.exec(function(err, result) {
			console.log('found:' + JSON.stringify(result));
			locals.data.event = result;
			next(err);
		});

	});

	// Render the view
	view.render('event');
};
