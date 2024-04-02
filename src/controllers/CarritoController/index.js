const db= require('../../database/db');
const {getDataCarrito,
    getDataByIdQuery,
    addProductoToCarrito,
    actTableCarrito,
    deleteProductoIntoCarrito,
    deleteCarrito} = require('../../database/querys/querys');
const format = require('pg-format');


const addProducto = async (req, res) => {   
    try {
        const { id_producto, cantidad, id_usuario =0 } = req.body;
        let {id_carrito} = req.session;
        if (!id_carrito) {
            id_carrito = Math.floor(Math.random() * 1000000);
            req.session.id_carrito = id_carrito; 
        }
        let valueId = [id_producto];
        const querydata = format(getDataByIdQuery,...valueId)
        const {rows: [producto], rowCount} = await db.query(querydata);
        const precio_unitario = producto.precio;
        const monto_total =precio_unitario*cantidad;
        let values = [id_carrito,id_usuario,id_producto,cantidad,precio_unitario,monto_total];
        const query = format(addProductoToCarrito,...values)
        await db.query(query)
        res.status(201).json({ mensaje: `Producto agregado al carrito ${id_carrito}` });
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
};

const getDataIntoCar = async(req,res)=>{
    try {
        let {id_carrito} = req.session;
        const value = [id_carrito];
        const query = format(getDataCarrito,...value);
        const {rows: producto, rowCount} =await db.query(query);
        if(rowCount==0){
            res.status(400).json({
                msg: "Carrito no encontrado"
            })
        }
        else{
            res.status(200).send(producto)
        }  
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor",
            errr: error
        })
    }  
}
const actDataIntoCar = async(req,res)=>{
    try {
        let {id_carrito} = req.session;
        const {id_producto, cantidad} =req.body;
        const values = [cantidad,id_carrito,id_producto];
        const query = format(actTableCarrito,...values);
        await db.query(query);
            res.status(204).json({
            msg: "Cantidad del producto actualizado"
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
    

}

const deleteintoCar = async (req,res)=>{
    try {
        const {id_carrito}= req.session;
        const {id_producto, borrarTodo=false} = req.body;
        if(!borrarTodo){
            const values =[ id_producto, id_carrito];
            const query = format(deleteProductoIntoCarrito,...values);
            await db.query(query);
                res.status(204).json({
                msg: "Producto eliminado del carrito"
                })
        }
        else{
            const value =[id_carrito];
            const query = format(deleteCarrito,...value);
            await db.query(query);
                res.status(204).json({
                msg: "Carrito eliminado"
                })
        }
    } catch (error) {
            res.status(500).json({
            msg: "Error en el servidor"
        })
    }
    
}

module.exports = {addProducto,getDataIntoCar,actDataIntoCar,deleteintoCar}