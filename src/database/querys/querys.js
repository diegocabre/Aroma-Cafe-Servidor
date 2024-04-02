const createTableUsers = `CREATE TABLE IF NOT EXISTS public.usuarios
(
    id_usuario serial NOT NULL,
    nombre_usuario character varying(255) NOT NULL,
    nombre_completo character varying(255) NOT NULL,
    id_rol integer NOT NULL,
    correo character varying(100) NOT NULL,
    contrasenya character varying(250) NOT NULL,
    estado_cuenta boolean NOT NULL,
    fecha_registro timestamp without time zone NOT NULL,
    fecha_actualizacion timestamp without time zone NOT NULL,
    CONSTRAINT id PRIMARY KEY (id_usuario),
    CONSTRAINT corrreo UNIQUE (correo)
        INCLUDE(correo)
);
`;

const createTableRoles = `CREATE TABLE IF NOT EXISTS public.roles
(
    id_rol serial NOT NULL,
    nombre_rol character varying(50) NOT NULL,
    descripcion character varying(100),
    permisos character varying(100),
    estado_rol boolean NOT NULL,
    fecha_creacion date NOT NULL,
    fecha_actualizacion timestamp without time zone NOT NULL,
    PRIMARY KEY (id_rol),
    CONSTRAINT nombre_rol UNIQUE (nombre_rol)
        INCLUDE(nombre_rol)
);
`;

const createTableCategorias = `CREATE TABLE IF NOT EXISTS public.categorias
(
    id_categoria serial NOT NULL,
    nombre_categoria character varying(100) NOT NULL,
    descripcion character varying(255),
    imagen character varying(255) NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    fecha_actualizacion timestamp without time zone,
    PRIMARY KEY (id_categoria),
    CONSTRAINT nombre_categoria UNIQUE (nombre_categoria)
        INCLUDE(nombre_categoria)
);
`;

const createTableProductos = `CREATE TABLE IF NOT EXISTS public.productos
(
    id_producto serial NOT NULL,
    nombre_producto character varying(100) NOT NULL,
    descripcion character varying(255),
    precio integer NOT NULL,
    stock integer NOT NULL,
    id_categoria integer NOT NULL,
    id_marca integer NOT NULL,
    imagen_producto character varying(255) NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    fecha_actualizacion timestamp without time zone NOT NULL,
    PRIMARY KEY (id_producto),
    CONSTRAINT nombre_producto UNIQUE (nombre_producto)
        INCLUDE(nombre_producto)
);
`;

const createTableOrdenes = `CREATE TABLE IF NOT EXISTS public.ordenes
(
    id_orden serial NOT NULL,
    id_carrito integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad_vendida integer NOT NULL,
    precio_unitario integer NOT NULL,
    monto_total integer NOT NULL,
    metodo_pago character varying(50) NOT NULL,
    informacion_envio character varying(255),
    estado character varying(100),
    fecha_venta date NOT NULL,
    PRIMARY KEY (id_orden)
);
`;

// const createTableCarrito = `CREATE TABLE IF NOT EXISTS public.carrito
// (
//     id_carrito serial,
//     id_usuario integer NOT NULL,
//     cantidad integer NOT NULL,
//     fecha_creacion timestamp without time zone,
//     fecha_actualizacion timestamp without time zone,
//     CONSTRAINT id_carrito PRIMARY KEY (id_carrito)
// );
// `;

const createTableCarrito = `CREATE TABLE IF NOT EXISTS public.carrito
(   
    id serial PRIMARY KEY,
    id_carrito integer NOT NULL,
    id_usuario integer NOT NULL,
    id_producto integer NOT NULL,
    cantidad integer NOT NULL,
    precio_unitario integer NOT NULL,
    monto_total integer NOT NULL,
    fecha_creacion timestamp without time zone,
    fecha_actualizacion timestamp without time zone
);
`;

const createTableMarcas = `CREATE TABLE IF NOT EXISTS public.marcas
(
    id_marca serial,
    nombre_marca character varying(100) NOT NULL,
    fecha_creacion timestamp without time zone NOT NULL,
    PRIMARY KEY (id_marca)
);
`;

const AlterTableUsuarios = `ALTER TABLE IF EXISTS public.usuarios
ADD CONSTRAINT fk_rol FOREIGN KEY (id_rol)
REFERENCES public.roles (id_rol) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;

`;

const AlterTableProductos = `ALTER TABLE IF EXISTS public.productos
ADD CONSTRAINT fk_categoria FOREIGN KEY (id_categoria)
REFERENCES public.categorias (id_categoria) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;
`;

const AlterTableOrdenesxProduc = `ALTER TABLE IF EXISTS public.ordenes
ADD CONSTRAINT fk_producto FOREIGN KEY (id_producto)
REFERENCES public.productos (id_producto) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;`;

const AlterTableProductosxMarcas = `ALTER TABLE IF EXISTS public.productos
ADD CONSTRAINT fk_marca FOREIGN KEY (id_marca)
REFERENCES public.marcas (id_marca) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;
`;

const AlterTableCarritoxUser = `ALTER TABLE IF EXISTS public.carrito
ADD CONSTRAINT fk_usuarios FOREIGN KEY (id_usuario)
REFERENCES public.usuarios (id_usuario) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;
`;

const AlterTableOrdenesxCarrito = `ALTER TABLE IF EXISTS public.ordenes
ADD CONSTRAINT fk_carrito FOREIGN KEY (id_carrito)
REFERENCES public.carrito (id_carrito) MATCH SIMPLE
ON UPDATE NO ACTION
ON DELETE CASCADE
NOT VALID;`;

const initial_setup = `CREATE TABLE IF NOT EXISTS initial_setup (
    id SERIAL PRIMARY KEY,
    initialized BOOLEAN DEFAULT FALSE
  );`;

const insertDataIntoProductos = `INSERT INTO productos (id_producto, nombre_producto, descripcion, precio, stock, id_categoria, id_marca, imagen_producto, fecha_creacion, fecha_actualizacion)
VALUES
(DEFAULT, 'Café Brasil', 'Café arabico Incapto', 5490, 45, 1, 1, '/src/components/imgs/brasil.png', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Jo', 'Café hecho en Francia', 1504, 23, 1, 3, '/src/components/imgs/frances.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Etipía', 'Café origen Limu, Moplaco', 2390, 20, 1, 1, '/src/components/imgs/etiopia.png', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Cubico', 'Café arabico de Etiopía', 3290, 5, 1, 2, '/src/components/imgs/etiopia2.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Jungle Blend', 'Café origen Guatemata - Perú', 4500, 13, 1, 1, '/src/components/imgs/brasil.png', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Tanzanian peaBerry', 'Café union entre arabico y robusta', 6070, 3, 1, 5, '/src/components/imgs/brasil.png', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Hawahan kona', 'Café arabico extra fancy', 3500, 38, 1, 1, '/src/components/imgs/Volcanica.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Café Death Wish', 'Café arabico medium roast', 4990, 12, 1, 4, '/src/components/imgs/Volcanica.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Turca', 'Cafetera Turca', 15000, 12, 2, 7, '/src/components/imgs/souvenir/cafeteras-turcas-1-768x644.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Amarilla', 'Cafetera Amarilla', 230000, 3, 2, 7, '/src/components/imgs/souvenir/Cafetera amarilla expreso.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Roja', 'Cafetera Roja por goteo', 69000, 12, 2, 7, '/src/components/imgs/souvenir/cafetera-goteo-roja.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Alicia', 'Cafetera Moka', 4650, 9, 2, 7, '/src/components/imgs/souvenir/cafetera-moka.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Italiana', 'Cafetera italiana 6 tazas', 25900, 3, 2, 7, '/src/components/imgs/souvenir/cafetera-express-6-tazas.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera Expresso Tradicional', 'Cafetera Expresso Tradicional', 340000, 3, 2, 7, '/src/components/imgs/souvenir/cafetera.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Cafetera por goteo - vidrio', 'Cafetera por goteo', 30000, 22, 2, 8, '/src/components/imgs/souvenir/cafeteras-que-utilizan-los-profesionales-1024x1024.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Set de Regalo', 'Set de regalo que incluye mochila y gorra', 25500, 11, 2, 7, '/src/components/imgs/souvenir/GORRA_JPG-2.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Paraguas', 'Paraguas', 6500, 130, 2, 7, '/src/components/imgs/souvenir/SOMBRILLA_JPG-5.jpg', CURRENT_DATE, CURRENT_DATE),
(DEFAULT, 'Gift Card', 'Gift Card', 5000, 400, 2, 7, '/src/components/imgs/souvenir/tarjetaregalo.png', CURRENT_DATE, CURRENT_DATE);`;

const insertDataIntoRoles = `INSERT INTO roles (id_rol, nombre_rol,descripcion,permisos,estado_rol,fecha_creacion,fecha_actualizacion) 
VALUES
(DEFAULT, 'admin', 'admin', 'totales', true, CURRENT_DATE, CURRENT_DATE ),
(DEFAULT, 'cliente', 'cliente', 'parciales', true, CURRENT_DATE, CURRENT_DATE );`;

const insertDataIntoMarcas = `INSERT INTO marcas (id_marca, nombre_marca, fecha_creacion)
VALUES 
(DEFAULT, 'Incapto', CURRENT_DATE),
(DEFAULT, 'Cubico', CURRENT_DATE),
(DEFAULT, 'Jo', CURRENT_DATE),
(DEFAULT, 'Death Wish Coffee co', CURRENT_DATE),
(DEFAULT, 'Fresh Roasted', CURRENT_DATE),
(DEFAULT, 'Volcanica', CURRENT_DATE),
(DEFAULT, 'Aroma de café', CURRENT_DATE),
(DEFAULT, 'Mc COffee', CURRENT_DATE);`;

const insertDataIntoCategoria = `INSERT INTO categorias (id_categoria, nombre_categoria, descripcion, imagen, fecha_creacion, fecha_actualizacion) VALUES (DEFAULT, 'Regalos', 'Merchandising y cafeteras', 'src/components/imgs/souvenir/Cafetera amarilla expreso.jpg', CURRENT_DATE, CURRENT_DATE);
INSERT INTO categorias (id_categoria, nombre_categoria, descripcion, imagen, fecha_creacion, fecha_actualizacion) VALUES (DEFAULT, 'Cafes', 'Cafes', 'src/components/imgs/historiacafeFondo.jpg', CURRENT_DATE, CURRENT_DATE);`;

const insertDataIntoUsuario = `INSERT INTO usuarios (nombre_usuario, nombre_completo, id_rol, correo, contrasenya, estado_cuenta, fecha_registro, fecha_actualizacion)
VALUES ('admin', 'Administrador', 1, 'administrador@aromadecafe.com', '%s', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`

const getDataQuery =`SELECT * FROM productos ORDER BY %s %s LIMIT %s OFFSET %s`
const getDataByIdQuery =`SELECT * FROM productos WHERE id_producto = %s`

const getCorreo =`SELECT * FROM usuarios WHERE correo = '%s'`

const insertUser =`INSERT INTO usuarios (nombre_usuario, nombre_completo, id_rol, correo, contrasenya, estado_cuenta, fecha_registro, fecha_actualizacion)
VALUES ('%s', '%s', '%s', '%s','%s','%s',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`

const getDataCarrito = `SELECT * FROM carrito WHERE id_carrito = '%s'`

const getDataUser =`SELECT * FROM usuarios WHERE id_usuario = %s`

const addProductoToCarrito = `INSERT INTO carrito (id, id_carrito,id_usuario,id_producto,cantidad,precio_unitario,monto_total,fecha_creacion,fecha_actualizacion)
VALUES (DEFAULT, '%s','%s','%s','%s','%s','%s',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`

const actTableCarrito =`UPDATE carrito
SET cantidad = '%s'
WHERE id_carrito = '%s' AND id_producto = '%s';`

const deleteProductoIntoCarrito= `DELETE FROM carrito
WHERE id_producto = '%s' AND id_carrito = '%s';`;

const deleteCarrito= `DELETE FROM carrito
WHERE id_carrito = '%s';`;

module.exports = {
   createTableCarrito,
   createTableProductos,
   createTableCategorias,
   createTableMarcas,
   createTableOrdenes,
   createTableRoles,
   createTableUsers,
   initial_setup,
   insertDataIntoProductos,
   insertDataIntoRoles,
   insertDataIntoMarcas,
   insertDataIntoCategoria,
   insertDataIntoUsuario,
   getCorreo,
   getDataByIdQuery,
   getDataQuery,
   insertUser,
   getDataCarrito,
   addProductoToCarrito,
   getDataUser,
   actTableCarrito,
   deleteProductoIntoCarrito,
   deleteCarrito
};