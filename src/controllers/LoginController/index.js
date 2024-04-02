const jwt = require("jsonwebtoken")
const {KEYTOKEN} = process.env

const login = async(req,res)=>{
    const {email} = req.body;
    const token = jwt.sign({email}, KEYTOKEN)
    res.status(200).json({
        msg: "Acceso concedido",
        email: email,
        token: token
    })
}
module.exports = login