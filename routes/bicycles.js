var express = require('express')
var router = express.Router()
var bicyclesController = require('../controllers/bicycleController')

router.get('/', bicyclesController.bicycle_list)
router.get('/create', bicyclesController.bicycle_create_get)
router.post('/create', bicyclesController.bicycle_create_post)
router.post('/:id/delete', bicyclesController.bicycle_delete_post)
router.get('/:id/update', bicyclesController.bicycle_update_get)
router.post('/:id/update', bicyclesController.bicycle_update_post)

module.exports = router