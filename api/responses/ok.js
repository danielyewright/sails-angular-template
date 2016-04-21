/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */
 
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('sails/node_modules/lodash');

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  // Set status code
  res.status(200);

  // If appropriate, serve data as JSON(P)
  /*if (req.wantsJSON) {
    return res.jsonx(data);
  }*/
  
  	/* The query here is the raw query sent to the web server, which means that some of
	the query components may be strings instead of object literals.  This will convert
	them to object literals so the .count() method works as expected. */
	var count_query = req.query;
	delete count_query.limit;
	delete count_query.skip;
	delete count_query.sort;
	delete count_query.callback;
	delete count_query.populate;
	/**var count_query = {
		where: req.param('where')
	};**/
	
	// This will fix any JSON encoded criteria, which appear to be erroneously encoded from something further up
	for (var key in count_query) {
		if (_.isString(count_query[key])) {
			try {
				count_query[key] = JSON.parse(count_query[key]);
			} catch (exception) {
				//delete count_query[key];
			}
		}
	}

  /*// If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  options = (typeof options === 'string') ? { view: options } : options || {};

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  if (options.view) {
    return res.view(options.view, { data: data });
  }

  // If no second argument provided, try to serve the implied view,
  // but fall back to sending JSON(P) if no view can be inferred.
  else return res.guessView({ data: data }, function couldNotGuessView () {
    return res.jsonx(data);
  });*/
  
  	var model = actionUtil.parseModel(req);
	
	// Is this a request for a list of records or a single record?
	if (_.isArray(data)) {
		//_.forEach(data, function(record) {
		//	fix_associations(record);
		//});
		
		model.count(count_query).exec(function(error, total) {
			res.jsonx({
				success: true,
				records: data,
				total: total
			});
		});
	} else {
		//fix_associations(data);
		res.jsonx(data);
	}

};
