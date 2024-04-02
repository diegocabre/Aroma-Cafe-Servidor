const bcrypt = require('bcrypt');
const format = require('pg-format');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config();


const {createTableCarrito, 
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
        insertDataIntoUsuario
      } = require('./querys/querys')
const {Pool} = require('pg');

const {HOST, USER, PASSWORD, DATABASE} = process.env;

const db = new Pool ({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    allowExitOnIdle: true
})

db.connect(async (error, client, done) => {
    if (error) {
      console.log("No se logró la conexión a la DB");
    } else {
      console.log("Conexión a la DB exitosa");
  
      try {
        await db.query(initial_setup);
        const res = await db.query('SELECT initialized FROM initial_setup WHERE id = 1');
        const initialized = res.rows[0]?.initialized;
  
        if (!initialized) {
          await db.query(`INSERT INTO initial_setup (id,initialized) VALUES (1,FALSE)`)
          console.log('Inicializando base de datos....');
          await db.query(createTableProductos);
          console.log('Tabla productos creada correctamente');      
          await db.query(insertDataIntoProductos);
          console.log('Datos iniciales en tabla productos insertados correctamente');
          await db.query(createTableUsers);
          console.log('Tabla usuarios creada correctamente ');
          const passwordEncriptada = bcrypt.hashSync("admin", salt);
          const value = [passwordEncriptada]
          const query = format(insertDataIntoUsuario,...value)
          await db.query(query);
          console.log('usuario administrador creado satisfactoriamente');
          await db.query(createTableCategorias);
          console.log('Tabla Categorias creada correctamente');
          await db.query(insertDataIntoCategoria);
          console.log('Datos iniciales en tabla categorias insertados correctamente');
          await db.query(createTableCarrito);
          console.log('Tabla Carrito creada correctamente');
          await db.query(createTableMarcas);
          console.log('Tabla Marcas creada correctamente');
          await db.query(insertDataIntoMarcas);
          console.log('Datos iniciales en tabla Marcas insertados correctamente');
          await db.query(createTableOrdenes);
          console.log('Tabla Ordenes creada correctamente');
          await db.query(createTableRoles);
          console.log('Tabla Roles creada correctamente');
          await db.query(insertDataIntoRoles);
          console.log('Datos iniciales en tabla Roles insertados correctamente');
          await db.query('UPDATE initial_setup SET initialized = TRUE WHERE id = 1');
          console.log('Base de datos inicializada correctamente');
        } else {
          console.log('La base de datos ya ha sido inicializada');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    }
  });

module.exports = db;
