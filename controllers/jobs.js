const Job = require('../models/Job')
const statusCodes = require('http-status-codes')
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(statusCodes.OK).json({jobs, count: jobs.length})
}

const getJob = async (req, res) => {
    res.send("get job")
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(statusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    res.send("update job")
}


const deleteJob = async (req, res) => {
    res.send("delete job")
}


module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}