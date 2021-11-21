//cria funcoes das rotas
const NoteService = require('../services/NoteService');

module.exports = {

  ping:(req, res) => {
    res.json({pong: true})
  },

  // GET /api/notes -> pega todas as notas ( id, title)
  all: async (req, res) => {
    //cria resposta padrao
    let json = {error:'', result:[]}

    let notes = await NoteService.getAll();

    for(let i in notes){
      json.result.push({
        id: notes[i].id,
        title: notes[i].title
      })
    }

    res.json(json)
  },

  show: async(req, res) => {
    let json = {error:'', result:{}}

    //pega o id da rota
    let id = req.params.id;
    
    let note = await NoteService.findById(id);

    if(note){
      json.result =note
    } else {
      json.error = 'Nota não encontrada'
    }

    res.json(json)
    
  },

  add: async (req, res) => {

    let json = {error:'', result:{}}

    let title = req.body.title;
    let body = req.body.body;



    if(title && body){
      let noteId = await NoteService.add(title, body);
      json.result = {
        id: noteId,
        title, 
        body}
    } else {
      json.error = 'Campos não enviados! Verifique os dados'
    }

    res.json(json)
    
  },

  // PUT /api/notes/123 -> atualiza uma nota especifica
  update: async (req, res) => {
    let json = {error:'', result:{}}

    let id = req.params.id; //pega o id da rota
    let title = req.body.title; //pega o titulo do body
    let body = req.body.body; //pega o corpo do body



    if(id && title && body){
     await NoteService.update(id, title, body); //atualiza a nota
     //pega a nota atualizada
      json.result = {
        id,
        title, 
        body
      }

    } else {
      json.error = 'Campos não enviados! Verifique os dados'
    }


    res.json(json)
  },

  delete: async (req, res) => {
    let json = {error:'', result:{}}

    await NoteService.delete(req.params.id);

    res.json(json)
  }


}