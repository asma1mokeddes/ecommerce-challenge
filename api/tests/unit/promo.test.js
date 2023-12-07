// Imports
const {
    getPromos,
    createPromo,
    updatePromo,
    deletePromo,
} = require("../../src/routes/promosRoutes.js");
const PromoMongo = require("../../src/models/promo.js");
const Promo = require("../../src/models/promo.model.js");

// Mock dependencies
jest.mock("../../src/models/promo.js", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
}));

jest.mock("../../src/models/promo.model.js", () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
}));

describe("Promo Routes", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    // Test for getPromos
    describe("getPromos", () => {
        it("should retrieve all promos", async () => {
            PromoMongo.find.mockResolvedValue([
                { promoCode: "PROMO1", expirationDate: new Date() },
            ]);
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await getPromos(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });
        // Test for no promotions available
        it("should handle no promotions available", async () => {
            PromoMongo.find.mockResolvedValue([]); // Mock an empty array return
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getPromos(req, res);

            expect(res.json).toHaveBeenCalledWith([]); // Expect an empty array response
            expect(res.status).not.toHaveBeenCalledWith(500); // Ensure no server error
        });

        // Test for handling server errors
        it("should handle server errors gracefully", async () => {
            PromoMongo.find.mockRejectedValue(
                new Error("Database connection error")
            ); // Mock a server error
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getPromos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(
                        "Une erreur est survenue lors de la récupération des promotions."
                    ),
                })
            );
        });
    });

    // Test for createPromo
    describe("createPromo", () => {
        it("should create a new promo with valid data", async () => {
            const req = {
                body: {
                    promoCode: "NEWPROMO",
                    expirationDate: new Date(),
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Promo.findOne.mockResolvedValue(null);
            PromoMongo.findOne.mockResolvedValue(null);

            await createPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Code promo créé avec succès",
                    promoCode: req.body.promoCode,
                })
            );
        });
        // Test for missing required fields
        it("should not create a promo if required fields are missing", async () => {
            const req = {
                body: {
                    // Missing promoCode or expirationDate
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await createPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message:
                        "Champs requis manquants. Veuillez fournir le code ainsi que la date d'expiration de la promotion.",
                })
            );
        });

        // Test for duplicate promo code
        it("should not create a promo if the code already exists", async () => {
            const req = {
                body: {
                    promoCode: "ASMA10",
                    expirationDate: new Date(),
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Simulate finding an existing promo
            Promo.findOne.mockResolvedValue({ promoCode: "ASMA10" });
            PromoMongo.findOne.mockResolvedValue({ promoCode: "ASMA10" });

            await createPromo(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: "Ce code promo existe déjà",
                })
            );
        });
    });

    describe("updatePromo", () => {
        // Test for successful promo update
        it("should update a promo successfully", async () => {
            const promoId = 1; // Example promo ID
            const req = {
                params: { promoId },
                body: {
                    promoCode: "UPDATEDPROMO",
                    expirationDate: new Date(),
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful update scenarios
            Promo.findOne.mockResolvedValue(null);
            Promo.update.mockResolvedValue([
                1,
                [{ promoCode: "UPDATEDPROMO" }],
            ]);
            PromoMongo.findOneAndUpdate.mockResolvedValue({
                promoCode: "UPDATEDPROMO",
                expirationDate: new Date(),
            });

            await updatePromo(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Le code promo a bien été mise à jour.",
                })
            );
        });

        // Test for promo not found
        it("should not update a non-existent promo", async () => {
            const promoId = 2; // Non-existent promo ID
            const req = {
                params: { promoId },
                body: {
                    promoCode: "NONEXISTENTPROMO",
                    expirationDate: new Date(),
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock promo not found scenario
            Promo.findOne.mockResolvedValue(null);
            Promo.update.mockResolvedValue([0, []]);
            PromoMongo.findOneAndUpdate.mockResolvedValue(null);

            await updatePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Le code promo avec l'ID ${promoId} n'existe pas.`,
                })
            );
        });

        // Test for updating a promo with a duplicate code
        it("should not update a promo with a duplicate code", async () => {
            const promoId = 3; // Example promo ID
            const req = {
                params: { promoId },
                body: {
                    promoCode: "DUPLICATEPROMO",
                    expirationDate: new Date(),
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock finding a duplicate promo
            Promo.findOne.mockResolvedValue({ promoCode: "DUPLICATEPROMO" });

            await updatePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Ce code promo existe déjà.",
                })
            );
        });
    });

    describe("deletePromo", () => {
        // Test for successful promo deletion
        it("should delete a promo successfully", async () => {
            const promoId = 1; // Example promo ID
            const req = {
                params: { promoId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful deletion scenarios
            Promo.findOne.mockResolvedValue({ id: promoId });
            Promo.destroy.mockResolvedValue(1);
            PromoMongo.findOneAndDelete.mockResolvedValue({ promoId });

            await deletePromo(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Le code promo a bien été supprimé !",
                })
            );
        });

        // Test for promo not found
        it("should not delete a non-existent promo", async () => {
            const promoId = 2; // Non-existent promo ID
            const req = {
                params: { promoId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock promo not found scenario
            Promo.findOne.mockResolvedValue(null); // Promo not found in PostgreSQL

            await deletePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Ce code promo n'existe pas.`,
                })
            );
        });

        // Test for handling server errors
        it("should handle server errors during deletion", async () => {
            const promoId = 3; // Example
            const req = {
                params: { promoId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock a server error scenario
            Promo.findOne.mockRejectedValue(
                new Error("Database connection error")
            );

            await deletePromo(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Erreur lors de la suppression de ce code promo`,
                })
            );
        });
    });
});
