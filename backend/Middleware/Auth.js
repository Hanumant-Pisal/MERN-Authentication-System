const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, resp,next)=>{
    const auth = req.headers['authorization'];

    if(!auth){
        return resp.status(403)
        .json({message:'Unauthorized, jwt token is require'});

    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)

        req.user = decoded;
        next();

    } 
    catch(err){
        return resp.status(403)
        .json({message:'Unauthorized wrong, jwt token is require'})
    }
}

module.exports = ensureAuthenticated;