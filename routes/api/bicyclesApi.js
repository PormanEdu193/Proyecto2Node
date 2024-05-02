var express = require('express')
var router = express.Router()
var bicyclesApiController = require('../../controllers/api/bicycleApiController')

router.get('/', bicyclesApiController.bicycle_list)
router.post('/create', bicyclesApiController.bicycle_create)
router.delete('/delete', bicyclesApiController.bicycle_delete)
router.put('/update', bicyclesApiController.bicycle_update)

module.exports = router