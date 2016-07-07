/**

Copyright 2016, Cloud Compass, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
/**
 * VCSController
 *
 * @description :: Server-side logic for managing VCS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `VCSController.getCommits()`
   */
  getCommits: function (req, res) {
    // sails.log.debug("getCommits request body", req.param('widget'));
    var widget = req.param('widget');
    GithubService.getCommits(widget, function (err, data, headers) {
      return res.json(data);
    });
  }
};

