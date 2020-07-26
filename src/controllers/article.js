const Article = require('../models/article')

const addArticle = async (data) => {
    let res = null
    if (data) {
        res = new Article(data).save()
    }
    return res
}

const getArticleById = async (id) => {
    let res = await Article.findById(id).populate('tag')
    return res
}

const delectArticle = async (id) => {
    return await Article.findByIdAndRemove(id)
}

const updateArticle = async (id, data) => {
    return await Article.findByIdAndUpdate(id, data)
}

// 分页查询文章
const getAllAtricle = async (data) => {
    let {
        page = 1,
        limit = 10,
        tag,
        keywords
    } = data

    const querys = {}

    if (keywords) {
        const keywordsReg = new RegExp(keywords)
        querys['$or'] = [
            { keywords: keywordsReg },
            { title: keywordsReg }
        ]
    }

    if (tag) {
        querys.tag = tag
    }

    let options = {
        select: '-__v',
        sort: { create_dt: 1 },
        populate: {
            path: 'tag',
            select: 'name color',
            sort: {create_dt: 1}
        },
        page: Number(page),
        limit: Number(limit)
    }
    
    const result = await Article.paginate(querys, options)

    if (result.total !== 0) {
        return {
            paginateInfo: {
                total: result.total,
                current_page: result.page,
                total_page: result.pages,
                page_size: result.limit
            },
            data: result.docs
        }
    }
}

module.exports = {
    addArticle,
    getArticleById,
    delectArticle,
    updateArticle,
    getAllAtricle
}
