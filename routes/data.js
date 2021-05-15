const express = require('express');
const dataController = require('../controllers/data');

const router = express.Router();

router.get('/chamados', dataController.chamados );

router.post('/deletar', dataController.deletarChamado);

router.post('/finalizar', dataController.finalizarChamado);

router.post('/busca', dataController.busca);

module.exports = router;
