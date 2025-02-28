const request = require("supertest");
const app = require("../server");
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");

jest.mock("../model/Admin");

describe("Auth Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("✅ Successful login returns token", async () => {
        const mockAdmin = { email: "loise.fenoll@ynov.com", password: "ANKymoUTFu4rbybmQ9Mt" };
        Admin.findOne.mockResolvedValue(mockAdmin);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: mockAdmin.email, password: mockAdmin.password });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    test("❌ Login fails with incorrect email", async () => {
        Admin.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: "wrong@test.com", password: "ANKymoUTFu4rbybmQ9Mt" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid credentials" });
    });

    test("❌ Login fails with incorrect password", async () => {
        const mockAdmin = { email: "loise.fenoll@ynov.com", password: "ANKymoUTFu4rbybmQ9Mt" };
        Admin.findOne.mockResolvedValue(mockAdmin);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: mockAdmin.email, password: "wrongpassword" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "Invalid credentials" });
    });

    test("❌ Login fails when email or password is missing", async () => {
        const response = await request(app).post("/api/auth/login").send({});
        expect(response.status).toBe(400);
    });

    test("❌ Internal server error", async () => {
        Admin.findOne.mockRejectedValue(new Error("Database error"));

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: "loise.fenoll@ynov.com", password: "ANKymoUTFu4rbybmQ9Mt" });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });
});
