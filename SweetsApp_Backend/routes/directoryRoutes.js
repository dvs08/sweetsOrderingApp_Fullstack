const express = require('express');
const directoryController = require('../controllers/direcotryController'); 

const router = express.Router();

router.post('/', directoryController.createDirectory)
router.get('/', directoryController.getAllDirectoriesForUser);
router.delete('/:id', directoryController.deleteDirectory)
router.put('/:id', directoryController.updateDirectory)
router.get('/:id', directoryController.getDirectoryById)

module.exports = router;
