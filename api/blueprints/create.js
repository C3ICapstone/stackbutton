/**
 * Module dependencies
 *
 * AuthService.js
 *
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
/**
 * Create Record
 *
 * post /:modelIdentity
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified criteria.  If an id was specified, just the instance with
 * that unique id will be returned.
 *
 * Optional:
 * @param {String} callback - default jsonp callback param (i.e. the name of the js function returned)
 * @param {*} * - other params will be used as `values` in the create
 *
 * This file has been extended to enforce StackButton security policy
 *
 */
module.exports = function createRecord(req, res) {

  var Model = actionUtil.parseModel(req);
  var data = actionUtil.parseValues(req);

  // Check if user is authorized to modify the (parent) project
  AuthService.canCreate(req.user.id, data, function (err, resp) {
    if (err) return res.negotiate(err);
    if (resp == false) return res.serverError("You are not permitted to modify the parent record.");

    // Create new instance of model using data from params
    Model.create(data).exec(function created(err, newInstance) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Model.subscribe(req, newInstance);
          Model.introduce(newInstance);
        }
        // Make sure data is JSON-serializable before publishing
        var publishData = _.isArray(newInstance) ?
          _.map(newInstance, function (instance) {
            return instance.toJSON();
          }) :
          newInstance.toJSON();
        Model.publishCreate(publishData, !req.options.mirror && req);
      }

      // Send JSONP-friendly response if it's supported
      res.created(newInstance);
    });
  });


};