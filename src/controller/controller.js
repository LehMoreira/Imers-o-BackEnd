import fs from "fs";
import gerarDescricaoComGemini from "../service/service.js";
import { getTodosPosts,criandoPost,atualizarPost } from "../model/model.js";
export async function listarPost(req, res) {
    // Chama a função para obter os posts e envia como resposta
    const resultado = await getTodosPosts();
    res.status(200).json(resultado);
    }
export async function criarPost(req,res) {
    const novoPost = req.body;
    try{
        const postCriado = await criandoPost(novoPost);
        res.status(200).json(postCriado)
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro ":"falha na requisição"})
    }
}
export async function uploadImg(req,res) {
    const novoPost = {
        descricao : "",
        imgUrl : req.file.origalname,
        alt : "",
    }
    try{
        const postCriado = await criandoPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro ":"falha na requisição"});
    }
}
export async function atualizaPost(req,res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgUrl : urlImagem,
            descricao : descricao,
            alt : req.body.alt
        }
        const postCriado = await atualizarPost(id,post);
        res.status(200).json(postCriado)
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro ":"falha na requisição"})
    }
}