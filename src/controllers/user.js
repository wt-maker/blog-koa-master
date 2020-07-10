const User = require('../models/user')
const crypto = require('crypto')

const addUser = async (data) => {
    let res = null
    if (data) {
        let {password} = data
        encryptPassword = crypto.createHash('md5').update(password).digest('hex')
        let userInfo = {
            ...data,
            password: encryptPassword
        }
        res = await new User(userInfo).save()
    }
    return res
}

const getUserByName = async (username) => {
    let res = null
    if (username) {
        res = await User.findOne({username}, 'password')
    }
    return res
}

module.exports = {
    addUser,
    getUserByName
}
