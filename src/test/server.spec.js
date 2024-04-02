const request = require('supertest');
const server = require('../app');

describe("Operaciones CRUD de productos", () => {
    it("Obteniendo al menos un producto de la ruta get /productos", async () => {
        const productos = await request(server).get('/productos').send();
        expect(productos.status).toBe(200);
        expect(productos.body).toBeInstanceOf(Array); 
        expect(productos.body.length).toBeGreaterThan(0);
        });
    it("Recibir un status code 404 de la ruta /login al intentar iniciar sesión con un usuario no registrado", async() =>{
        const user = {email: "test@testing.com", password: "1234@Test"}
        const resp = await request(server).post('/login').send(user);
        expect(resp.status).toBe(404);
        });
    it("Recibir un status code 409 de la ruta /registro al intentar registrarse con un email ya registrado", async() =>{
        const user = {name: "administrador", lastName:"administrador", email: "administrador@aromadecafe.com", password: "1234@Test",passwordConfir: "1234@Test"}
        const resp = await request(server).post('/registro').send(user);
        expect(resp.status).toBe(409);
        });
    it("Recibir un code 404 al intentar agregar un producto al carrito en la ruta /carrito", async() =>{
        const producto = {id_producto: 101, cantidad: 9, id_usuario: 1}
        const resp = await request(server).post('/carrito').send(producto);
        expect(resp.status).toBe(404);
            }); 
    });