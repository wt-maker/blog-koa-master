const Fund = require('../models/fund')
const charset = require('superagent-charset')
const superagent = charset(require('superagent'))
const jsdom = require('jsdom')
const { JSDOM } = jsdom

const getFundDataById = async (id) => {
    let url = `http://fund.eastmoney.com/${id}.html?spm=search`
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .end((err, sres) => {
                if (err) {
                    reject(err)
                }
                resolve(sres.text)
            })
    })
}

const getFundData = async (arr) => {
    const length = arr.length
    let res = []

    return await Promise.all(arr.map(async (item, index) => {
        return (async () => {
            let data = await getFundDataById(item.serialNumber)
            let dom = new JSDOM(data)
            let applies = dom.window.document.getElementById('gz_gszzl').innerHTML
            return {
                applies,
                serialNumber: item.serialNumber,
                name: item.name,
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

module.exports = {
    getFundDataById,
    addFund,
    getAllFund,
    getFundData
}