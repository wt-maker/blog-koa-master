const Article = require('../models/article')

const addArticle = async(data) => {
    let res = null
    if(data) {
        res = new Article(data).save()
    }
    return res
}

const getArticleById = async(id) => {
    let res = null
    await Article.findById(id, (err, doc) => {
        res =  doc
    })
    return res
}

const delectArticle = async(id) => {
    return await Article.findByIdAndRemove(id)
}

const updateArticle = async(id, data) => {
    return await Article.findByIdAndUpdate(id, data)
}

const getAllAtricle = async() => {
    let res = null
    await Article.find({}, (err, doc) => {
        res = doc
    })
    return res
}

module.exports = {
    addArticle,
    getArticleById,
    delectArticle,
    updateArticle,
    getAllAtricle
}