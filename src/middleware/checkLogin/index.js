const db = require('../../database/db')
const { check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const format = require('pg-format');
const {getCorreo}= require('../../database/querys/querys');


const validationFieldLogin =[
	check('email')
		.notEmpty()
		.isEmail(),
    check('password')
		.notEmpty(),
(req,res,next)=>{
	try {
		validationResult(req).throw();
		return next()
	} catch (error) {
		return res.status(500).send({error: error.array()})
	}
}
]
const validateCredentials = async(req,res,next)=>{
    const {email, password} = req.body;
    try {
		value=[email];
        console.log(value);
        const query = format(getCorreo,...value);
        const { rows: [usuario], rowCount } = await db.query(query);
        if(!usuario){
            return res.status(404).json({ msg: "Correo invalido" })
        }
        const passwordEncriptada = usuario.contrasenya;
        console.log(passwordEncriptada)
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
        console.log(passwordEsCorrecta)
        if (!passwordEsCorrecta || rowCount==0){
            return res.status(401).json({ msg: "contraseña incorrecta" })
        }
        else{
            return next();
        }
    } catch (error) {
        return res.status(500).send({error: error})
    }
}



module.exports ={validateCredentials,validationFieldLogin}