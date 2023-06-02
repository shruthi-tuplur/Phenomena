require('dotenv').config();

const { client, getOpenReports, closeReport, createReportComment, createReport} = require('../db/index.js')

// Build an apiRouter using express Router
const express = require('express');
const apiRouter = express.Router();



apiRouter.use((req, res, next) => {
   console.log('a request is being made to the API')

    next()
});


// Import the database adapter functions from the db
const {rebuildDB, testDB} = require('../db/index.js');


/**
 * Set up a GET request for /reports
 * 
 * - it should use an async function
 * - it should await a call to getOpenReports
 * - on success, it should send back an object like { reports: theReports }
 * - on caught error, call next(error)
 */

apiRouter.get('/reports', async(req, res) => {
    const reports = await getOpenReports();
    
    res.send(
        {reports}
    )
})


/**
 * Set up a POST request for /reports
 * 
 * - it should use an async function
 * - it should await a call to createReport, passing in the fields from req.body
 * - on success, it should send back the object returned by createReport
 * - on caught error, call next(error)
 */

apiRouter.post('/reports', async (req, res, next) => {
    const {title, location, description, password} = req.body;
    const reportData = {}

    try {
        reportData.title = title;
        reportData.location = location;
        reportData.description = description;
        reportData.password = password;

        const report = await createReport(reportData);

        if (report){
            res.send(report)
        } else {
            next({message: 'post request unsuccessful'})
        }
    } catch ({name, message}){
        next({name, message})
    }
})


/**
 * Set up a DELETE request for /reports/:reportId
 * 
 * - it should use an async function
 * - it should await a call to closeReport, passing in the reportId from req.params
 *   and the password from req.body
 * - on success, it should send back the object returned by closeReport
 * - on caught error, call next(error)
 */

apiRouter.delete('/reports/:reportId', async(req, res, next) => {

    const {password } = req.body;
    const {reportId} = req.params;
    console.log('password: ', password);

    console.log('reportId: ', reportId);
    try{
        const report = await closeReport(reportId, password);
        res.send(report);
        next({message: 'Report successfully closed!'})
    } catch ({name, message}){
        next({name, message});
    }


})

/**
 * Set up a POST request for /reports/:reportId/comments
 * 
 * - it should use an async function
 * - it should await a call to createReportComment, passing in the reportId and
 *   the fields from req.body
 * - on success, it should send back the object returned by createReportComment
 * - on caught error, call next(error)
 */

apiRouter.post('/reports/:reportId/comments', async(req, res, next) => {
const {reportId} = req.params;

try {
    const comment = await createReportComment(reportId, req.body);
    console.log(comment)
    res.send(comment);
} catch({name, message}){
    next({name, message});
}




})


// Export the apiRouter
module.exports = apiRouter
