'use strict';

const { IssueModel, ProjectModel } = require('../models.js')

module.exports = async function (app) {
  app.route('/api/issues/:project')
    .get(function (req, res) {
      let project = req.params.project;

    })

    .post(async (req, res) => {
      let project = req.params.project
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body
      if (!issue_title || !issue_text || !created_by) {
        res.json({ error: 'required field(s) missing' })
        return
      }
      try {
        let projectDoc = await ProjectModel.findOne({ name: project })
        if (!projectDoc) {
          projectDoc = new ProjectModel({ name: project })
          projectDoc = await projectDoc.save()
        }
        const issueDoc = new IssueModel({
          projectId: projectDoc._id,
          issue_title: issue_title || '',
          issue_text: issue_text || '',
          created_on: new Date(),
          updated_on: new Date(),
          created_by: created_by || '',
          assigned_to: assigned_to || '',
          open: true,
          status_text: status_text || ''
        })
        res.json(await issueDoc.save())
      } catch (err) {
        console.error(err)
      }
    })

    .put(function (req, res) {
      let project = req.params.project;

    })

    .delete(function (req, res) {
      let project = req.params.project;

    });
};
