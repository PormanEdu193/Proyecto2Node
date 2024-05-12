var express = require('express');
var router = express.Router()
var usuariosApiController = require('../../controllers/api/usuarioApiController')

router.get('/',usuariosApiController.listUsers)
router.post('/create',(req,res)=>{
    usuariosApiController.createUser(req,res,req.body)
})
router.post('/book',(req,res)=>{
    usuariosApiController.bookUser(req,res,req.body)
})

module.exports = router;
