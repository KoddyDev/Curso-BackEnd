const Express = require("express")
const { hash, compare } = require("bcrypt")
const DW = require("webhook-discord")

/** 
const w = new DW.Webhook("https://ptb.discord.com/api/webhooks/883145944634359889/JbVoZuO3GMS7TSCuhkrHVPrg1c0pO7PwFyOr79xSYw4TG7AlQCeHq1XIed3j75oEPomC")
*/
const app = Express()

const Bots = require("../../../Database/Models/Bots")

app.get("/verify", async (req, res) => {
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
    if(findB) {
        const isBotOfLicence = await compare(license, findB.dataValues.license)
        if(isBotOfLicence) {
            return res.status(200).json({
                success: true,
                data: {
                    message: "Este bot cujo id é " + botid + " está autorizado á logar!"
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
            message: "Não encontrei nenhum bot com este id."
        }
    })

    
})



module.exports = app