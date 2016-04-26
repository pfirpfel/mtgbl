var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// Set locals
	locals.section = 'gallery';

	var query = keystone.list('Gallery').model.find().sort('sortOrder');

	if(req.params.singleGallery){
		locals.filters = {
			name: req.params.singleGallery
		};
		query = keystone.list('Gallery').model.find(locals.filters);
	}

	view.query('galleries', query);
	
	// Render the view
	view.render('gallery');
	
};
