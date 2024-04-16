'use strict';

const { IssueModel, ProjectModel } = require('../models.js')

module.exports = async function (app) {
  app.route('/api/issues/:project')
    .get(async (req, res) => {
      let project = req.params.project;
      try {
        const projectDoc = await ProjectModel.findOne({ name: project })
        if (!projectDoc) {
          res.json({ error: 'project not found' })
          return
        }

        // filter
        const issueDocs = await IssueModel.find({
          projectId: projectDoc._id,
          ...req.query
        })
        if (!issueDocs) {
          res.json({ error: 'no issues found' })
          return
        }

        res.json(issueDocs)
      } catch (err) {
        // console.error(err)
        res.json({ error: 'could not get' })
      }
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
        // console.error(err)
      }
    })

    .put(async (req, res) => {
      let project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body

      if (!_id) {
        res.json({ error: 'missing _id' })
        return
      }
      if (
        !issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open
      ) {
        res.json({ error: 'no update field(s) sent', _id: _id })
        return
      }

      try {
        const projectDoc = await ProjectModel.findOne({ name: project })
        if (!projectDoc) {
          throw new Error('project not found')
        }

        const issueDoc = await IssueModel.findByIdAndUpdate(_id, {
          ...req.body,
          updated_on: new Date()
        })
        // if (!issueDoc) {
        //   throw new Error('issue not found')
        // }
        // When it can't find the doc, it throws an error anyway. 

        await issueDoc.save()
        res.json({ result: 'successfully updated', _id: _id })
      } catch (err) {
        // console.error(err)
        res.json({ error: 'could not update', _id: _id })
      }
    })

    .delete(async (req, res) => {
      let project = req.params.project;
      const { _id } = req.body
      if (!_id) {
        res.json({ error: 'missing _id' })
        return
      }

      try {
        const projectDoc = await ProjectModel.findOne({ name: project })
        if (!projectDoc) {
          throw new Error('Project not found')
        }

        const issueDoc = await IssueModel.deleteOne({
          _id: _id,
          projectId: projectDoc._id
        })
        if (issueDoc.deletedCount === 0) {
          throw new Error('issue id not found')
        } else {
          res.json({ result: 'successfully deleted', _id: _id })
        }
      } catch (err) {
        // console.error(err)
        res.json({ error: 'could not delete', _id: _id })
      }
    });
};
