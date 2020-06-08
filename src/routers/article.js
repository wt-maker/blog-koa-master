const { addArticle, getArticleById, delectArticle, updateArticle, getAllAtricle } = require('../controllers/article')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')
const articleRoute = (router) => {

    const ADD_ARTICLE = async (ctx, next) => {
        let data = ctx.request.body
        try {
            let res = await addArticle(data)
            successResponse({ ctx, message: '插入成功', res })
        } catch (error) {
            errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '插入失败', error })
        }
    }
    router.post('/addArticle', ADD_ARTICLE)

    const GET_ARTICLE_BY_ID = async (ctx, next) => {
        let { id } = ctx.params
        if (id) {
            try {
                let res = await getArticleById(id)
                if (res != null) {
                    successResponse({ ctx, message: '查询成功', res })
                } else {
                    errorResponse({ ctx, status: 404, message: '查询失败', error: '查询数据为空' })
                }
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '查询失败', error })
            }
        } else {
            errorResponse({ ctx, status: RESPONSE_CODE.RESPONSE_CODE_NOT_FOUND, message: '查询失败', error: '缺少参数id' })
        }
    }
    router.get('/get/:id', GET_ARTICLE_BY_ID)

    const DELETE_ARTICLE = async (ctx, next) => {
        let { id } = ctx.params
        if (id) {
            try {
                await delectArticle(id)
                successResponse({ ctx, message: '删除成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '删除失败', error })
            }
        } else {
            errorResponse({ ctx, message: '删除失败', error: '缺少参数id' })
        }
    }
    router.get('/delete/:id', DELETE_ARTICLE)

    const UPDATE_ARTICLE = async (ctx, next) => {
        let { id } = ctx.params
        let data = ctx.request.body

        if (id) {
            try {
                await updateArticle(id, data)
                successResponse({ ctx, message: '更新成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '更新失败', error })
            }
        } else {
            errorResponse({ ctx, message: '更新失败', error: '缺少参数id' })
        }
    }
    router.post('/update/:id', UPDATE_ARTICLE)

    const GET_ALL_ARTICLE = async (ctx, next) => {
        try {
            let res = await getAllAtricle()
            successResponse({ ctx, message: '查询成功', res })
        } catch (error) {
            errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_NOT_FOUND, message: '查询失败', error })
        }
    }
    router.get('/getArticles', GET_ALL_ARTICLE)
}

module.exports = articleRoute