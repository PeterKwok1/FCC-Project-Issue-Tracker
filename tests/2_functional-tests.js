const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// stub
let issueDoc1

// without done, they'll pass even if they fail.
suite('Functional Tests', function () {
    test('Create an issue with every field: POST request to /api/issues/{project}', (done) => {
        chai
            .request(server)
            .post('/api/issues/test')
            // .set('content-type', 'application/json')
            .send({
                issue_title: 'Issue 1',
                issue_text: 'Functional test 1',
                created_by: 'fCC',
                assigned_to: 'Tom',
                status_text: 'incomplete'
            })
            .end((err, res) => {
                issueDoc1 = res.body
                assert.equal(res.status, 200)
                assert.equal(res.body.issue_title, 'Issue 1')
                done()
            })
    })
    test('Create an issue with only required fields: POST request to /api/issues/{project}', (done) => {
        chai
            .request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Issue 1',
                issue_text: 'Functional test 2',
                created_by: 'fCC',
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.issue_text, 'Functional test 2')
                done()
            })
    })
    test('Create an issue with missing required fields: POST request to /api/issues/{project}', (done) => {
        chai
            .request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Issue 1',
                issue_text: 'Functional test 3'
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.equal(res.body.error, 'required field(s) missing')
                done()
            })
    })
    test('View issues on a project: GET request to /api/issues/{project}', (done) => {
        chai
            .request(server)
            .get('/api/issues/test')
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.instanceOf(res.body, Array)
                done()
            })
    })
    test('View issues on a project with one filter: GET request to /api/issues/{project}', (done) => {
        chai
            .request(server)
            .get('/api/issues/test')
            .query({
                _id: issueDoc1._id
            })
            .end((err, res) => {
                assert.equal(res.status, 200)
                assert.instanceOf(res.body, Array)
                done()
            })
    })
    // test('View issues on a project with multiple filters: GET request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Update one field on an issue: PUT request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Update multiple fields on an issue: PUT request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Update an issue with missing _id: PUT request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Update an issue with no fields to update: PUT request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Delete an issue: DELETE request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
    // test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', () => {
    //     chai
    //         .request(server)
    //         .end((err, res) => {

    //         })
    // })
});
