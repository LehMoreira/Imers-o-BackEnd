import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/debConfig.js";
// Conecta ao banco de dados MongoDB usando as informações da string de conexão
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados e a coleção "posts"
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}
export async function criandoPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.insertOne(novoPost);
}
export async function atualizarPost(id,novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost});
}
