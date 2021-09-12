const Express = require("express");
const Users = require("../../../Database/Models/Users")

const app = Express();

app.get('/', (req, res) => {
    res.json({
        status: "OK"
    })
})

app.get("/users", async (req, res) => {
    let findP;
    try {
        findP = await Users.findAll()
    if(req.headers.filter) {
        req.headers.filter = JSON.parse("{"+req.headers.filter+"}")
        findP = await Users.findAll({
            where: {
                ...req.headers.filter
            }
        })
    }
    } catch(error) {
        res.status(500).send({
            success: false,
            error: error.message
        })
    }

    const mapa = findP.map(f => {
        return f.dataValues
    })

    return res.status(200).json({
        success: true,
        data: [
            ...mapa
        ]
    })
})

app.delete("/users/:email", async (req, res) => {
    const { email } = req.params

    const findU = await Users.findOne({
        where: {
            email
        }
    })

    if(findU) {
        findU.destroy()

        return res.status(200).json({
            succes: true,
            data: {
                message: "Deletado com sucesso."
            }
        })
    } else         return res.status(200).json({
        succes: false,
        data: {
            message: "Usuario não encontrado."
        }
    })
})

app.put("/users/:email", async (req, res) => {
    const { email } = req.params

    const findU = await Users.findOne({
        where: {
            email
        }
    })

    if(findU) {

        try {
        if(req.headers.update) {
            req.headers.update = JSON.parse("{"+req.headers.update+"}")
            findU.update({
                ...req.headers.update
            })

            return res.status(200).json({
                succes: true,
                data: {
                    message: "Alterado com sucesso."
                }
            })

        } else return res.status(200).json({
            succes: false,
            data: {
                message: "Não foi possivel encontrar o header Update para realizar as alterações."
            }
        })
        } catch(error) {
            res.status(500).send({
                success: false,
                error: error.message
            })
        }

    } else return res.status(200).json({
        succes: false,
        data: {
            message: "Usuario não encontrado."
        }
    })
})

module.exports = app