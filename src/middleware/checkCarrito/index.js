const db = require('../../database/db')
const { check, validationResult} = require('express-validator');
const format = require('pg-format');
const {getDataByIdQuery,getDataUser}=require('../../database/querys/querys')


const checkCarritoField = [
    check('id_producto')
        .isNumeric()
        .notEmpty(),
    check('cantidad')
        .isNumeric()
        .notEmpty(),
    (req,res,next)=>{
        try {
            validationResult(req).throw()
            const { id_producto, cantidad, id_usuario =0 } = req.body;
            if(id_producto<=0){
                return res.status(400).json({
                    msg:"el valor de id_producto es incorrecto debe ser un número positivo"
                })
            }
            else if( cantidad < 0 ){
                return res.status(400).json({
                    msg:"el valor de cantidad es incorrecto debe ser un número positivo"
                })
            }
            else if(id_usuario<0){
                return res.status(400).json({
                    msg:"el valor de id_usuario es incorrecto debe ser un número positivo"
                })
            }
            else{
                return next()
            }
        } catch (error) {
            return res.status(500).send({error: error.array()})
        }
}]

const checkCarrito = async(req,res,next)=>{
    try {
        const {id_producto, cantidad,id_usuario=0 } = req.body;
        const value =[id_producto];
        const query=format(getDataByIdQuery,...value);
        const {rowCount}= await db.query(query);
        if(rowCount==0){
            return res.status(404).json({
                msg:`el producto con id ${ id_producto}, no existe en la base de datos`
            })
        }
        else if(id_usuario>0){
            const value = [id_usuario];
            const query = format(getDataUser,...value);
            const {rowCount} = await db.query(query);
            
            if(rowCount==0){
                return res.status(404).json({
                    msg:`el usuario con id ${ id_usuario}, no existe en la base de datos`
                })
            }
            else{
                return next() 
            }
        }
        else{
            return next()
        }   
    } catch (error) {
        res.status(500).send({error: error.array()})
    }
    
    
}

const checkSesion = (req,res,next)=>{

    try {
        let {id_carrito} = req.session;
        if (!id_carrito) {
            res.status(400).json({
                msg: "id_carrito indefinido"
            }) 
        }
        else if(id_carrito<=0|| !/^\d+$/.test(id_carrito)){
            res.status(400).json({
                msg: "El id_carrito debe ser un valor númerico mayor a cero"
            })
        }
        else{
            return next()
        } 
    } catch (error) {
        res.status(500).send({error: error.array()})
    }
    
}

const checkDeleteCarrito = (req,res,next)=>{
    try {
        const {id_carrito}= req.session;
        const {id_producto, borrarTodo=false} = req.body;
            if(!borrarTodo){
                if( id_carrito<=0|| !/^\d+$/.test(id_carrito)){
                    res.status(400).json({
                    msg: "El id_carrito debe ser un valor númerico mayor a cero"
                    })
                }
                else{
                    return next();
                }
            }
            else{
                return next();
            }
    } catch (error) {
        res.status(500).send({error: error.array()})
    }
    
}

module.exports ={checkCarritoField,checkCarrito,checkSesion,checkDeleteCarrito}