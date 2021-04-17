const jwt = require('jwt-simple');
const moment = require('moment');
const { secretFrase } = require('../config')

const checkToken = (req, res, next) => {

    if(!req.headers['user-token']){
        return res.json({error: 'Theres not token'})
    }

    const userToken = req.headers['user-token'];
    let payload = {};

    try {
        payload = jwt.decode(userToken, secretFrase)
    } catch (error) {
        return res.json({error: 'Not valid token'})
    }

    if(payload.expiredAt < moment().unix()){
        return res.json({ error: 'Token has expired' })
    }

    next();
}

module.exports = checkToken;