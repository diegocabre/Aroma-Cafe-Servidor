const format = require('pg-format');
const db = require('../../database/db');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const {insertUser} = require('../../database/querys/querys')

const userRegistrer = async (req,res)=>{
    let {name, lastName, email, password, passwordConfir}= req.body;  
    try {
        const passwordEncriptada = bcrypt.hashSync(password, salt);
        password = passwordEncriptada;
        const values =[name,name+' '+lastName,2,email,passwordEncriptada,"true"]
        const query = format(insertUser,...values);
        await db.query(query);
        res.status(201).json({msg: "usuario registrado correctamente"})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = userRegistrer;