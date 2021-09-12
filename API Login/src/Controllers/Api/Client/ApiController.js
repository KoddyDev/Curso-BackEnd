const Express = require("express")
const { hash, compare } = require("bcrypt")
const DW = require("webhook-discord")

const ytdl = require("ytdl-core-discord")

/** 
const w = new DW.Webhook("https://ptb.discord.com/api/webhooks/883145944634359889/JbVoZuO3GMS7TSCuhkrHVPrg1c0pO7PwFyOr79xSYw4TG7AlQCeHq1XIed3j75oEPomC")
*/
const app = Express()

const Users = require("../../../Database/Models/Users")

app.get("/register", async (req, res) => {
    const { nome, email, senha, csenha, admin } = req.body

    if(!nome || !email || !senha || !csenha || !admin) return res.status(400).send({
        success: false,
        data: {
            message: "Insira todos os campos."
        }
    })
    if(senha !== csenha) return res.status(400).send({
        success: false,
        data: {
            message: "As senhas não são iguais."
        }
    })

    const findUser = await Users.findOne({
        where: {
            email
        }
    })

    if(findUser) return res.status(400).send({
        success: false,
        data: {
            message: "Já existe um usuario cadastrado com este email."
        }
    })

    const SenhaHash = await hash(senha, 10)

    let userC = await Users.create({
        nome,
        email,
        senha: SenhaHash
    })
    res.status(200).send({
        succes: true, 
        data: {
            message: "Registrado com sucesso.",
            registred: true,
            user: {
                ...userC.dataValues
            }
        }
    })
/** 
    const Embed = new DW.MessageBuilder()
    .setName("Usuario Logado")
    .setDescription(`O usuario ${userC.dataValues.nome} acabou de se registrar.\nEmail: ${userC.dataValues.email}`)
    w.send(Embed)
    */
})

app.get("/login", async(req, res) => {
    const { email, senha } = req.body

    if(!email || !senha ) return res.status(400).send({
        success: false,
        data: {
            loggedin: false,
            message: "Insira todos os campos."
        }
    })

    const findUser = await Users.findOne({
        where: {
            email
        }
    })

    if(!findUser) return res.status(400).send({
        success: false,
        data: {
            loggedin: false,
            message: "Não existe um usuario cadastrado com este email."
        }
    })

    const isTheSenha = await compare(senha, findUser.dataValues.senha)
    console.log(isTheSenha)
    if(!isTheSenha) return res.status(400).send({
        success: false,
        data: {
            loggedin: false,
            message: "A senha está incorreta, verifique por favor."
        }
    })

    res.status(200).send({
        succes: true, 
        data: {
            loggedin: true,
            message: "Logado com sucesso.",
            user: {
                ...findUser.dataValues
            }
        }
    })
/** 
    const Embed = new DW.MessageBuilder()
    .setName("Usuario Logado")
    .setDescription(`O usuario ${findUser.dataValues.nome} acabou de logar.\nEmail: ${findUser.dataValues.email}`)
    w.send(Embed)
    */
})


module.exports = app