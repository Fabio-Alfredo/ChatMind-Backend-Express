import request from 'supertest';
import app from "../../../app"


describe("Logueo de un usuario", () => {

    //Se crea un usuario para las pruebas y no depender de los datos de la db
    //o de otro test
    describe("Registro de un usuario", () => {
        test("Debe devolver status 201 y un mensaje de exito si el usuario se crea correctamente", async () => {
            const response = await request(app).post("/user/create").send({
                name: "loginuser",
                email: "login@gmail.com",
                password: "123456Aa*"
            })
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
        })
    })

    test("Debe devolver status 200 y un token si el usuario se autentica correctamente", async () => {
        const response = await request(app).post("/user/login").send({
            email: "login@gmail.com",
            password: "123456Aa*"
        })
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User authenticated");
        expect(response.body.data).toHaveProperty("token");
    })

    test("Debe devolver status 401 y un mensaje de error si las credenciales son invalidas", async () => {
        const response = await request(app).post("/user/login").send({
            email: "prueba@gmail.com",
            password: "123456Aa*"
        })
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");
    })

    test("Debe devolver status 400 y un mensaje de error si el email no es valido", async () => {
        const response = await request(app).post("/user/login").send({
            email: "login@gmail",
            password: "123456Aa*"
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                {
                    message: expect.stringContaining("Invalid data, email is required")
                }
            ])
        )
    })

    test("Debe devolver status 400 y un mensaje de error si la contraseña no es valida", async () => {
        const response = await request(app).post("/user/login").send({
            email: "prueba@gmail.com",
            password: 1
        })
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                {
                    message: expect.stringContaining("Invalid data, password is required")
                }
            ])
        )
    })

})