const jwt = require('jsonwebtoken');
const role=require('./role');

module.exports = function (request, response, next) {
    const token = request.header('x-auth-header');
    
    if (!token)
    {
        return response.status(401).send('Access Denied: No Token Provided!');
    }

    try {
        const decoded = jwt.verify(token, "secretkey");

        if(role[decoded.role].find(function(url) {
            return url==request.baseUrl
            }))
        {
            request.user=decoded
            next();
        }
        else
        {
            return response.status(401).send('ACCESS DENIED');
        }
    }
    
    catch (ex) {
        res.status(401).send('Invalid Token')
    }
}