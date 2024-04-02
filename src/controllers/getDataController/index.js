const db= require('../../database/db');
const {getDataQuery,getDataByIdQuery} = require('../../database/querys/querys');
const format = require('pg-format')

const getData = async (req,res)=>{
    const {limits=18, page = 1, order_by = "id_producto-ASC"}= req.query;
    const limit = parseInt(limits);
    const offset = (page - 1) * limits;
    const [orderByField, orderByDirection] = order_by.split("-");
    const values = [orderByField,orderByDirection,limit,offset]
    const query = format(getDataQuery,...values)
    console.log(query)
    const data = await db.query(query);
    const {rowCount, rows} = data;
    if(rowCount){
        res.status(200).send(rows)
    }
    else{
        res.status(400).json({
            msg: "Error datos no encontrados"
        })
    }
}

const getDataById =async(req,res)=>{
    const id =req.params.id;
    const value =[id];
    const query =format(getDataByIdQuery,...value);
    const data = await db.query(query);
    const {rowCount, rows} = data;
    if(rowCount){
        res.status(200).send(rows)
    }
    else{
        res.status(400).json({
            msg: "Error datos no encontrados"
        })
    }
}

module.exports = {getData,getDataById};
