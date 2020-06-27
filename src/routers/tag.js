const {addTag, deleteTag, updateTag, getAllTags, getTagById} = require('../controllers/tag')
const { successResponse, errorResponse } = require('../utils/responstHandle')
const { RESPONSE_CODE } = require('../config')

const tagRouter = (router) => {

    const ADD_TAG = async(ctx, next) => {
        let data = ctx.request.body
        try{
            let res = await addTag(data)
            successResponse({ctx, message:'插入成功', res})
        }catch(error){
            errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '插入失败', error })
        }
    }

    router.post('/addTag', ADD_TAG)

    const DELETE_TAG = async(ctx, next) => {
        let {id} = ctx.params
        if (id) {
            try {
                await deleteTag(id)
                successResponse({ ctx, message: '删除成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '删除失败', error })
            }
        } else {
            errorResponse({ ctx, message: '删除失败', error: '缺少参数id' })
        }
    }

    router.get('/deleteTag/:id', DELETE_TAG)

    const UPDATE_TAG = async(ctx, next) => {
        let {id} = ctx.params
        let data = ctx.request.body
        if(id) {
            try {
                await updateTag(id, data)
                successResponse({ ctx, message: '更新成功' })
            } catch (error) {
                errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_SERVER_ERROR, message: '更新失败', error })
            }
        } else {
            errorResponse({ ctx, message: '更新失败', error: '缺少参数id' })
        }
    }

    router.post('/updateTag/:id', UPDATE_TAG)

    const GET_ALL_TAGS = async(ctx, next) => {
        try {
            let res = await getAllTags()
            successResponse({ ctx, message: '查询成功', res })
        } catch (error) {
            errorResponse({ ctx, status:RESPONSE_CODE.RESPONSE_CODE_NOT_FOUND,message: '查询失败', error})
        }
    }

    router.get('/getAllTags', GET_ALL_TAGS)


    const GET_TAG_BY_ID = async (ctx, next) => {
        let { id } = ctx.params
        if (id) {
            try {
                let res = await getTagById(id)
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
    router.get('/getTag/:id', GET_TAG_BY_ID)
}

module.exports = tagRouter
