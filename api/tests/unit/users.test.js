// Imports
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} = require("../../src/routes/usersRoutes.js");
const UserMango = require("../../src/models/user.js");
const User = require("../../src/models/user.model.js");

// Mock dependencies
jest.mock("../../src/models/user.js", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
}));

jest.mock("../../src/models/user.model.js", () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
}));

describe("Users Routes", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    // Test for getUsers
    describe("Get Users", () => {
        it("should retrieve all users", async () => {
            UserMango.find.mockResolvedValue([
                {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: new Date(),
                    emailAddress: "user@gmail.com",
                    role: "ROLE_USER",
                },
            ]);
            const req = {};

            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await getUsers(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });

        it("Should handle no users available", async () => {
            UserMango.find.mockResolvedValue([]); // Mock an empty array return
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getUsers(req, res);

            expect(res.json).toHaveBeenCalledWith([]); // Expect an empty array response
            expect(res.status).not.toHaveBeenCalledWith(500); // Ensure no server error
        });

        // Test for handling server errors
        it("Should handle server errors gracefully", async () => {
            UserMango.find.mockRejectedValue(
                new Error("Database connection error")
            ); // Mock a server error
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(
                        "Une erreur est survenue lors de la récupération des utilisateurs."
                    ),
                })
            );
        });
    });

    // Test for createUser
    describe("Create user", () => {
        it("should create a new user with valid data", async () => {
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );

            const req = {
                body: {
                    firstName: "Asma",
                    lastName: "Mokeddes",
                    emailAddress: "asma.mokeddes@gmail.com",
                    password: "Asma17930303@ye!@h",
                    dateOfBirth: birthDate.toISOString().split("T")[0],
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            User.findOne.mockResolvedValue(null);
            UserMango.findOne.mockResolvedValue(null);

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: expect.anything(),
                })
            );
        });
        // Test for missing required fields
        it("should not create a user if required fields are missing", async () => {
            const req = {
                body: {
                    // Missing data
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message:
                        "Champs requis manquants. Veuillez fournir nom, prénom, email, dateDeNaissance et motDePasse.",
                })
            );
        });

        // Test for duplicate user name
        it("should not create a user if the code already exists", async () => {
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );

            const req = {
                body: {
                    firstName: "Asma",
                    lastName: "Mokeddes",
                    emailAddress: "asma.mokeddes@gmail.com",
                    password: "Asma17930303@ye!@h",
                    dateOfBirth: birthDate.toISOString().split("T")[0],
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Simulate finding an existing user
            User.findOne.mockResolvedValue({
                emailAddress: "asma.mokeddes@gmail.com",
            });
            UserMango.findOne.mockResolvedValue({
                emailAddress: "asma.mokeddes@gmail.com",
            });

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: "Cet utilisateur existe déjà.",
                })
            );
        });
    });

    // Test for updateUser

    describe("Update user", () => {
        // Test for successful user update
        it("should update a user successfully", async () => {
            const userId = 1; // Example user ID
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );
            const req = {
                params: { userId },
                body: {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: birthDate,
                    emailAddress: "user@gmail.com",
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful update scenarios
            User.findOne.mockResolvedValue(null);
            User.update.mockResolvedValue([
                1,
                [{ emailAddress: "updated.user@yopmail.com" }],
            ]);
            UserMango.findOneAndUpdate.mockResolvedValue({
                emailAddress: "updated.user@yopmail.com",
            });

            await updateUser(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "L'utilisateur a bien été mis à jour.",
                })
            );
        });

        // Test for user not found
        it("should not update a non-existent user", async () => {
            const userId = 2;
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );
            const req = {
                params: { userId },
                body: {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: birthDate,
                    emailAddress: "user@gmail.com",
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock user not found scenario
            User.findOne.mockResolvedValue(null);
            User.update.mockResolvedValue([0, []]);
            UserMango.findOneAndUpdate.mockResolvedValue(null);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `L'utilisateur avec l'ID ${userId} n'existe pas.`,
                })
            );
        });

        // Test for updating a user with a duplicate code
        it("should not update a user with a duplicate code", async () => {
            const userId = 3;
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );
            const req = {
                params: { userId },
                body: {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: birthDate,
                    emailAddress: "user@gmail.com",
                    role: "ROLE_USER",
                },
            };

            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock finding a duplicate user
            User.findOne.mockResolvedValue({
                emailAddress: "email.exist@gmail.com",
            });

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Cet utilisateur existe déjà.",
                })
            );
        });

        it("should not create a user under 18 years old", async () => {
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 10,
                today.getMonth(),
                today.getDate()
            );
            const req = {
                body: {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: birthDate,
                    emailAddress: "user@gmail.com",
                    password: "test123@abc",
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await createUser(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: "Une erreur est survenue lors de la création de l'utilisateur : Error: Les utilisateurs doivent avoir minimum 18 ans pour s'inscrire.",
                })
            );
        });

        it("should not create a user with an invalid password", async () => {
            const today = new Date();
            const birthDate = new Date(
                today.getFullYear() - 20,
                today.getMonth(),
                today.getDate()
            );
            const req = {
                body: {
                    firstName: "User",
                    lastName: "Valide",
                    dateOfBirth: birthDate,
                    emailAddress: "user@gmail.com",
                    password: "weakpassword", // Invalid password
                    role: "ROLE_USER",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Mot de passe invalide.",
                })
            );
        });
    });

    describe("Deleted user", () => {
        // Test for successful user deletion
        it("should delete a user successfully", async () => {
            const userId = 1; // Example user ID
            const req = {
                params: { userId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful deletion scenarios
            User.findOne.mockResolvedValue({ id: userId });
            User.destroy.mockResolvedValue(1);
            UserMango.findOneAndDelete.mockResolvedValue({ userId });

            await deleteUser(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "L'utilisateur a bien été supprimé !",
                })
            );
        });

        // Test for user not found
        it("should not delete a non-existent user", async () => {
            const userId = 2; // Non-existent user ID
            const req = {
                params: { userId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock user not found scenario
            User.findOne.mockResolvedValue(null); // user not found in PostgreSQL

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Cet utilisateur n'existe pas.`,
                })
            );
        });

        // Test for handling server errors
        it("should handle server errors during deletion", async () => {
            const userId = 3; // Example
            const req = {
                params: { userId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock a server error scenario
            User.findOne.mockRejectedValue(
                new Error("Database connection error")
            );

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message:
                        "Erreur lors de la suppression de ce cet utilisateur",
                })
            );
        });
    });
});
