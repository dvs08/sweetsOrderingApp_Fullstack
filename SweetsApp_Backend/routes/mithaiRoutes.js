const express = require('express');
const mithaiController = require('../controllers/mithaiController'); 

const router = express.Router();

router.post('/', mithaiController.createMithai);
router.get('/', mithaiController.getAllMithai);
router.get('/:id', mithaiController.getMithaiById);
router.put('/:id', mithaiController.updateMithai);
router.delete('/:id', mithaiController.deleteMithai);

module.exports = router;
