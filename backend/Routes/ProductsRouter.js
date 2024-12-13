const router = require('express').Router();
const  ensureAuthenticated = require('../Middleware/Auth');



router.get('/',ensureAuthenticated, (req,resp)=>{
    console.log(req.user)
    resp.status(200).json([
        {

          name:"mobile",
          price:10000


        },

        {

            name:"tv",
            price:14000
  
  
          },
    ]) 
})

module.exports = router;