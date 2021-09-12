module.exports = (req, res, next) => {
    if(req.headers.authorization && req.headers.authorization === String("Bearer KGFJWKG")) return next()
    return res.redirect("/api")
}