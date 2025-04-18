import request from "supertest"
import app from "../../../app";

describe("Register route", () => {

    test("Debe devolver status 201 y un mensaje de exito si el usuario se crea correctamente", async () => {
        const response = await request(app).post("/user/create").send({
            name: "oneuser",
            email: "oneuser@gmail.com",
            password: "123456Aa*"
        })
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("User created");
    });


    test("Debe devolver status 400 si faltan datos obligatorios", async () => {
        const response = await request(app).post("/user/create").send({
            name: "threeuser",
            password: "123456Aa*"
        })
        expect(response.status).toBe(400);
    });

    test("Debe devolver status 409 junto a un mensaje de error si el usuario ya existe", async () => {
        const response = await request(app).post("/user/create").send({
            name: "oneuser",
            email: "oneuser@gmail.com",
            password: "123456Aa*"
        })
        expect(response.status).toBe(409);
        expect(response.body.message).toBe("User already exists");
    });

    test("Debe retornar error si la contraseña no cumple formato", async () => {
        const response = await request(app).post("/user/create").send({
            name: "Carlos",
            email: "test@email.com",
            password: "123"
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                {
                    message: expect.stringContaining("Password must be at least 8 characters long, contain a capital letter, a number and a special character")
                }
            ])
        );
    });

    test("Debe devolver un status 400 y un mensaje de error si el nombre no cumple los requisitos", async () => {
        const response = await request(app).post("/user/create").send({
            name: "Carlos123",
            email: "carlos@gmail.com",
            password: "123456Aa*"
        });
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                {
                    message: expect.stringContaining("Invalid name, must be at least 3 characters long and contain only letters")
                }
            ])
        );
    });

    test("Debe devolver un status 400 y un mensaje de error si la contraseña no cumple los requisitos", async () => {
        const response = await request(app).post("/user/create").send({
            name: "Carlos",
            email: "test@email.com",
            password: "123"
        });

        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual(
            expect.arrayContaining([
                {
                    message: expect.stringContaining("Password must be at least 8 characters long, contain a capital letter, a number and a special character")
                }
            ])
        );
    });


})

