'use strict';

module.exports = function (app) {

  app.route('/api/issues/:project')
    .get(function (req, res) {
      let project = req.params.project;

    })

    .post(function (req, res) {
      let project = req.params.project;

      const body = req.body
      console.log(body)
      res.json(body)
    })

    .put(function (req, res) {
      let project = req.params.project;

    })

    .delete(function (req, res) {
      let project = req.params.project;

    });

  // app.route('/test')
  //   .get((req, res) => {
  //     res.json({ this: 'that' })
  //   })
};
