const Express = require("express");
const Users = require("../../../Database/Models/Users")

const { hash, compare } = require("bcrypt")

const Bots = require("../../../Database/Models/Bots")

const app = Express();

app.get('/', (req, res) => {
    res.json({
        status: "OK"
    })
})

app.get('/list', async (req, res) => {
    const findAll = await Bots.findAll()

    let data = [];
    if(findAll[0]) {

         data = findAll.map(f => {
            return f.dataValues
        })
    } 

    res.status(200).json({
        success: true,
        data: {
            message: "Listagem concluida com sucesso, identificado " + findAll.length + " bots.",
            bots: data
        }
    })
})

app.post("/create", async (req, res) => {
    const { botid, license } = req.headers

    if(!botid || !license) return res.status(400).json({
        success: false,
        data: {
            message: "Os headers não foram setados."
        }
    })

    const findB = await Bots.findOne({
        where: {
            botId: botid
        }
    })
    if(!findB) {
        const licenseCrypto = await hash(license, 10)
        if(licenseCrypto) {
            await Bots.create({
                botId: botid,
                license: licenseCrypto
            })

            return res.status(200).json({
                success: true,
                data: {
                    message: "Agora quem tiver este id como bot poderá iniciar ele utilizando esta licença."
                }
            })

        } else return res.status(200).json({
        success: false,
        data: {
            message: "Licença invalida para este bot."
        }
    })
    } else return res.status(200).json({
        success: false,
        data: {
            message: "Já existe um bot com este id."
        }
    })

    
})

app.delete("/delete", async (req, res) => {
    const { botid } = req.headers

    if(!botid) return res.status(400).json({
        success: false,
        data: {
            message: "Os headers não foram setados."
        }
    })

    const findB = await Bots.findOne({
        where: {
            botId: botid
        }
    })
    if(findB) {
        findB.destroy()
        return res.status(200).json({
            success: true,
            data: {
                message: "Deletado com sucesso :)."
            }
        })
    } else return res.status(200).json({
        success: false,
        data: {
            message: "Não existe um bot com este id."
        }
    })

    
})

module.exports = app