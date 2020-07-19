const Fund = require('../models/fund')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const jsdom = require('jsdom')
const axios = require('axios')
const { JSDOM } = jsdom

const getFundDataById = async (id) => {
    let url = `http://fundgz.1234567.com.cn/js/${id}.js`
    return new Promise((resolve, reject) => {
        axios.get(url).then(
            response => {
                resolve(response.data)
            }
        )
    })
}

const getFundData = async (arr) => {

    return await Promise.all(arr.map(async (item) => {
        return (async () => {
            let data = await getFundDataById(item.serialNumber)
            let response = JSON.parse(data.substring(data.indexOf('{'), data.lastIndexOf('}')+1))
            return {
                id: item._id,
                applies: response.gszzl,
                serialNumber: response.fundcode,
                name: response.name,
                position: item.position
            }
        })()
    }))
}

const addFund = async (data) => {
    let res = null
    if (data) {
        res = new Fund(data).save()
    }
    return res
}

const getAllFund = async () => {
    let res = null
    await Fund.find({}, (err, doc) => {
        res = doc
    })
    return res
}

const updateFund = async (id, data) => {
    return await Fund.findByIdAndUpdate(id, data)
}

const deleteFund = async (id) => {
    return await Fund.findByIdAndRemove(id)
}

module.exports = {
    getFundDataById,
    addFund,
    getAllFund,
    getFundData,
    updateFund,
    deleteFund
}