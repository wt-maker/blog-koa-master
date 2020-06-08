const MONGODB = {
    url: 'mongodb://127.0.0.1:27017/blog_data'
}

const RESPONSE_CODE = {
    RESPONSE_CODE_OK: 200,
    RESPONSE_CODE_BAD_REQUEST: 400,
    RESPONSE_CODE_NO_ACCESS: 403,
    RESPONSE_CODE_NOT_FOUND: 404,
    RESPONSE_CODE_SERVER_ERROR: 500
}
module.exports = {
    MONGODB,
    RESPONSE_CODE
}