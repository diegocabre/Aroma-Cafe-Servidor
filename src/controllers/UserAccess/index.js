const db = require('../../database/db');
const jwt = require("jsonwebtoken");

const format = require('pg-format');
const {getCorreo}= require('../../database/querys/querys')

const userAccess = async (req,res)=>{
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    const { email } = jwt.decode(token)
    const value =[email]
    const query = format(getCorreo,...value)
    const data = await db.query(query);
    const {rows} = data;
    const [{nombre_completo, correo, id_rol}] = rows;
    const usuario =[{nombre: nombre_completo, correo: correo, rol: id_rol}]
    res.status(200).json({data: usuario})

} 

module.exports = userAccess;