const Express = require("express");
const Cors = require("cors");
const Colors = require("colors");

const Connector = require("./src/Database/Connector")
const Users = require("./src/Database/Models/Users")
const Bots = require("./src/Database/Models/Bots")

const app = Express();

app.use(Cors());
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

/**
 * 
 *   Utilizando Rotas
 * 
 */

 app.use("/api/bots", require("./src/Controllers/Api/Client/ApiController"))
 app.use("/api/admin", require("./src/Middlewares/Api/Admin/IsAdminMiddleware"), require("./src/Controllers/Api/Admin/ApiController"))

 app.get("/api", (req, res) => {
    res.status(200).send({
        status: "ok",
        data: {
            message: "API do Curso Back-End"
        }
    })
})

app.listen(8080, () => {
    console.log("[Back-End] ".red + "Iniciado na porta 8080.".yellow)

    Connector.authenticate()
    .then(() => {
        console.log("[Database] ".cyan + "Conectado ao modulo SQLite.".yellow)

        Users.init(Connector).sync({force: false})
        Bots.init(Connector).sync({force: false})
    })
    .catch((error) => {
        console.log("[Database] ".cyan + "Obtivemos um erro ao conectar ao SQLite3.".red)
        console.log("[Database] ".cyan + "Mensagem do erro: ".red + error.message.blue)  
    })

})