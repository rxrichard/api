const express = require('express');
const NoteController = require('./controllers/NoteController');
const router = express.Router();


router.get('/ping', NoteController.ping);

// GET /api/notes -> pega todas as notas ( id, title, content)
router.get('/notes', NoteController.all);

// GET /api/note/123 -> pega informacoes de uma nota especifica
router.get('/note/:id', NoteController.show);

// POST /api/notes -> cria uma nova nota
router.post('/note', NoteController.add);

// PUT /api/notes/123 -> atualiza uma nota especifica
router.put('/note/:id', NoteController.update);

// DELETE /api/notes/123 -> deleta uma nota especifica
router.delete('/note/:id', NoteController.delete);



module.exports = router;