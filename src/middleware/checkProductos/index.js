
checkProductos = async(req,res,next)=>{
    try {
        const {limits =18, page = 1, order_by = "id_producto-ASC"} = req.query;
        const orderParams = order_by.split("-");
    if (limits <= 0 || page <= 0) {
        res.status(400).json({
          error: "Bad Request",
          msg: "Valores de páginación o límite incorrectos"
        })
      }
    else if (orderParams.length !== 2 ){
        res.status(400).json({
        error: "Bad Request",
        msg: "Parámetro order_by incorrecto debe contener 2 caracteristicas separadas por '-' formato: categoria-dirección"
        })
    }
    else if(!["id_producto", "categoria", "precio"].includes(orderParams[0])){
        res.status(400).json({
            error: "Bad Request",
            msg: "Parámetro order_by incorrecto, categoria de ordenamiento debe contener id_producto, categoria o precio, otro valor no se acepta"
            })
    }
    else if(!["ASC", "DESC"].includes(orderParams[1])){
        res.status(400).json({
            error: "Bad Request",
            msg: "Parámetro order_by incorrecto, dirección de ordenamiento debe conter ASC o DESC, categoria o precio, otro valor no se acepta"
            })
    } 
    else{
        next();
    }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

checkProductoById = async(req,res,next)=>{
    const id = req.params.id;
    if(id<=0 || !/^\d+$/.test(id)){
        res.status(400).json({
            msg:"el valor de id es incorrecto debe ser un número positivo"
        })
    }
    else{
        next();
    }
}

module.exports={checkProductos, checkProductoById}