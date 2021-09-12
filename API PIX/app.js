const express = require("express")

const app = express()

const { PIX } = require("gpix/dist")

app.get("/create", (req, res) => {
    const { pix, price } = req.query

    if(!pix || !price || isNaN(parseInt(price))) return res.status(400).send("Insira uma chave PIX e um VALOR! Exemplo: /create?pix=chavePIXSemEspaco&price=15")

    const aPix = PIX.static()
    .setReceiverName('A')
    .setReceiverCity('A')
    .setKey(pix)
    .isUniqueTransaction(true) // optional
    .setAmount(parseInt(price)) // optional


    aPix.saveQRCodeFile("./qrcode.png")
    res.sendFile(process.cwd()+"/qrcode.png")
    res.download("./qrcode.png")
})

app.listen(8080, () => {
    console.log("[Back-END] Iniciado na porta 8080")
})