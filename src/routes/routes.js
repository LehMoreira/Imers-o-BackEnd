import express from "express";
import cors from "cors";
import multer from "multer";
import { listarPost,criarPost,uploadImg,atualizaPost } from "../controller/controller.js";
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});
const routes = (app)=>{
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para buscar todos os posts
    app.get("/posts", listarPost);
    // Rota para criar todos os posts
    app.post("/posts", criarPost);
    app.post("/upload", upload.single("imagem"), uploadImg);
    app.put("/upload/:id", atualizaPost)
};

export default routes
