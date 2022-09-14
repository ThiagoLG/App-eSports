import Express from "express";

/*- Criação do app com base no express -*/
const app = Express();


/*- Configuração de rota para a url "/ads" -*/
app.get('/ads', (request, response) => {

    return response.json([
        { id: 1, name: 'Anúncio 1' },
        { id: 2, name: 'Anúncio 2' },
        { id: 3, name: 'Anúncio 3' }
    ]);

})


/*- Ativa o listener para a porta 3333 -*/
app.listen(3333);