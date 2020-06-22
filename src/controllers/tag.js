const Tag = require('../models/tag')

const addTag = async(data) => {
    let res = null
    if(data) {
        res = new Tag(data).save()
    }
    return res
}

const deleteTag = async(id) => {
    return await Tag.findByIdAndRemove(id)
}

const updateTag = async(id, data) => {
    return await Tag.findByIdAndUpdate(id, data)
}

const getAllTags = async() => {
    let res = null
    await Tag.find({}, (err, doc) => {
        res = doc
    })
    return res
}

const getTagById = async(id) => {
    let res = null
    await Tag.findById(id, (err, doc) => {
        res =  doc
    })
    return res
}

module.exports = {
    addTag,
    deleteTag,
    updateTag,
    getAllTags,
    getTagById
}
