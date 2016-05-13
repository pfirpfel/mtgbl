var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'page';
	locals.filters = {
		page: req.params.page
	};
	locals.data = {
		page: []
	};

	// Load the page
	view.on('init', function(next) {

		var q = keystone.list('Page').model.findOne({
			slug: locals.filters.page
		});

		q.exec(function(err, page) {
			if (!page) return res.notfound();

			if(page.isMemberOnly){
				if(req.user && req.user.isMember){
					locals.title = page.title;
					locals.data.page = page;
				} else {
					return res.status(403).render('errors/403');
				}
			} else {
				locals.data.page = page;
			}
			next(err);
		});
	});

	// Render the view
	view.render('page');

};
