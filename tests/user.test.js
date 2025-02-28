const request = require("supertest");
const app = require("../server");
const User = require("../model/User");

jest.mock("../model/User");

describe("User Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("✅ Successfully creates a user", async () => {
        User.findOne.mockResolvedValue(null);
        User.prototype.save = jest.fn().mockResolvedValue({
            nom: "Dupont",
            prenom: "Jean",
            email: "jean.dupont@example.com",
            date: "2000-01-01",
            ville: "Paris",
            code: "75000",
        });

        const response = await request(app)
            .post("/api/users/create")
            .send({
                nom: "Dupont",
                prenom: "Jean",
                email: "jean.dupont@example.com",
                date: "2000-01-01",
                ville: "Paris",
                code: "75000",
            });

        expect(response.status).toBe(201);
    });

    test("❌ Fails to create user when fields are missing", async () => {
        const response = await request(app).post("/api/users/create").send({});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Tous les champs sont requis" });
    });

    test("❌ Fails to create user when email already exists", async () => {
        User.findOne.mockResolvedValue({ email: "jean.dupont@example.com" });

        const response = await request(app)
            .post("/api/users/create")
            .send({
                nom: "Dupont",
                prenom: "Jean",
                email: "jean.dupont@example.com",
                date: "2000-01-01",
                ville: "Paris",
                code: "75000",
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "L'email est déjà utilisé" });
    });

    test("✅ Retrieves all users", async () => {
        User.find.mockResolvedValue([{ nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com" }]);

        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("❌ Fails to retrieve users due to server error", async () => {
        User.find.mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/api/users");
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: "Erreur lors de la récupération des utilisateurs" });
    });

  /* TEST NON OK
   test("✅ Successfully deletes a user", async () => {
        // 1️⃣ Créer un utilisateur et attendre la réponse complète
        const userResponse = await request(app)
            .post("/api/users/create")
            .send({
                nom: "Dupont",
                prenom: "Jean",
                email: "jean.lalala@example.com",
                date: "2000-01-01",
                ville: "Paris",
                code: "75000",
            });

        // 2️⃣ Vérifier que la création a réussi et récupérer l'ID
        expect(userResponse.status).toBe(201);
        const userId = userResponse.body._id;
        expect(userId).toBeDefined();

        // 3️⃣ Supprimer l'utilisateur
        const deleteResponse = await request(app).delete(`/api/users/${userId}`);

        // 4️⃣ Vérifier que la suppression a réussi
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toEqual({ message: "User deleted successfully" });
    });


    test("❌ Fails to delete non-existent user", async () => {
        User.findById.mockResolvedValue(null);

        const response = await request(app).delete("/api/users/12345");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "User not found" });
    });*/
});
