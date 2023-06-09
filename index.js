const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* INICIO DAS CONFIGURAÇÕES DO EJS:  */
app.use(express.static('public'));
app.set('view engine', 'ejs');
/* FIM DAS CONFIGURAÇÕES DO EJS:  */

/* INICIO DAS ROTAS DE ACESSO AS PÁGINAS EJS*/
app.get('/', (req, res)=>{
    res.render('index');
});
/* FIM DAS ROTAS DE ACESSO AS PÁGINAS EJS*/

/* INICIO DAS ROTAS DE CATEGORIA */

/*CADASTRO*/
app.get('/categoria', (req, res)=>{
    res.render('categoria/index');
});

/*LISTAGEM*/
app.get('/listagemBrinquedo', (req, res)=>{
   
    /* CONFIGURAÇÃO DA REQUISIÇÃO BACK END VIA AXIOS*/

    /* ROTA DO BACK END */
    const urlListarBrinquedos= 'http://localhost:3000/listarDados';

    /*
     CHAMADA DO AXIOS PARA A ROTA DO BACK END 
     PARAMETROS DO VERBO:
     1 - ROTA
     2 - .then DE TRATAMENTO DA RESPOSTA
     */
    axios.get(urlListarBrinquedos)
    .then((response)=>{

        console.log(response.data);
        let brinquedos = response.data;
        res.render('categoria/listagemBrinquedo', {brinquedos});

    });
});

//EDITAR

app.get('/editarBrinquedo/:cod_brinquedo', (req, res)=>{

    let {cod_brinquedo} = req.params
    
    urlListarBrinquedoPK = `http://localhost:3000/listarDadosPK/${cod_brinquedo}`

    axios.get(urlListarBrinquedoPK)
    .then((response)=>{
        // console.log(response.data);
        let brinquedos = response.data;
        res.render('categoria/editarBrinquedo.ejs', {brinquedos});
    })
    
})//daydayday

app.post('/editarBrinquedo', (req, res)=>{

    let urlEditar = 'http://localhost:3000/alterarDados'

    axios.put(urlEditar, req.body)
    .then((response)=>{
        res.redirect('/listagemBrinquedo')
    })
})

app.get('/excluirBrinquedo/:cod_brinquedo', (req, res)=>{
    console.log(req.params);
 
     let {cod_brinquedo} = req.params;
 
     const urlExcluirBrinquedo = `http://localhost:3000/excluirDados/${cod_brinquedo}`;
 
     axios.delete(urlExcluirBrinquedo)
     .then((response)=>{
         res.redirect('/listagemBrinquedo');
     });
     
 });
 

/* FIM DAS ROTAS DE CATEGORIA */

app.listen(3001, ()=>{
    console.log("SERVIDOR FRONTEND RODANDO EM - http://localhost:3001");
});