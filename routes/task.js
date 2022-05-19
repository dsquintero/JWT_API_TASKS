const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task')
const auth = require('../middlewares/auth');

router.get('/', auth, TaskController.ListAll)
router.get('/:id', auth, TaskController.SearchById)
router.post('/', auth, TaskController.Create)
router.put('/:id', auth, TaskController.Update)
router.patch('/:id', auth, TaskController.Update)
router.delete('/:id', auth, TaskController.Delete)

module.exports = router;