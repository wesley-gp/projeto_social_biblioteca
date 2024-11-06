import express from "express";
import cors from "cors";
import routes from "./routes/user.js"; 

const app = express();

app.use(express.json());
app.use(cors());

// Configura as rotas da API
app.use("/", routes);

// Rota para testar se o servidor está rodando


// Inicia o servidor
app.listen(8800, () => {
    console.log("Servidor rodando no localhost:8800");
});

