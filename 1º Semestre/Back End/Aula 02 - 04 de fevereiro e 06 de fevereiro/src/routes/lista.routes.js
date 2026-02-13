const listaController = require("../controllers/lista.controller");

const express = require("express");

const router = express.Router();

router.get('/listar', listaController.listadois);
router.post('/cadastrar', listaController.cadastrarItens);
router.put('/atualizar/:id', listaController.atualizarItem);
router.delete('/deletar/:id', listaController.deleteItem);

module.exports = router;