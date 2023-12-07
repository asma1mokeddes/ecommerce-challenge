// Imports
const {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand,
} = require("../../src/routes/brandsRoutes.js");
const BrandMongo = require("../../src/models/brand.js");
const Brand = require("../../src/models/brand.model.js");

// Mock dependencies
jest.mock("../../src/models/brand.js", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
}));

jest.mock("../../src/models/brand.model.js", () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
}));

describe("Brands Routes", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    // Test for getBrands
    describe("getBrands", () => {
        it("should retrieve all brands", async () => {
            BrandMongo.find.mockResolvedValue([{ brandName: "Nike" }]);
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await getBrands(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });

        it("Should handle no brands available", async () => {
            BrandMongo.find.mockResolvedValue([]); // Mock an empty array return
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getBrands(req, res);

            expect(res.json).toHaveBeenCalledWith([]); // Expect an empty array response
            expect(res.status).not.toHaveBeenCalledWith(500); // Ensure no server error
        });

        // Test for handling server errors
        it("Should handle server errors gracefully", async () => {
            BrandMongo.find.mockRejectedValue(
                new Error("Database connection error")
            ); // Mock a server error
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getBrands(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(
                        "Une erreur est survenue lors de la récupération des marques."
                    ),
                })
            );
        });
    });

    // Test for createBrand
    describe("createBrand", () => {
        it("should create a new brand with valid data", async () => {
            const req = {
                body: {
                    brandName: "NEWBRAND",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Brand.findOne.mockResolvedValue(null);
            BrandMongo.findOne.mockResolvedValue(null);

            await createBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Marque créé avec succès",
                })
            );
        });
        // Test for missing required fields
        it("should not create a brand if required fields are missing", async () => {
            const req = {
                body: {
                    // Missing brandName
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await createBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message:
                        "Champs requis manquants. Veuillez fournir le nom de la marque.",
                })
            );
        });

        // Test for duplicate brand name
        it("should not create a brand if the code already exists", async () => {
            const req = {
                body: {
                    brandName: "BRANDEXIST",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Simulate finding an existing brand
            Brand.findOne.mockResolvedValue({
                brandName: "BRANDEXIST",
            });
            BrandMongo.findOne.mockResolvedValue({
                brandName: "BRANDEXIST",
            });

            await createBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: "Cette marque existe déjà",
                })
            );
        });
    });

    describe("updateBrand", () => {
        it("should update a brand successfully", async () => {
            const brandId = 1;
            const req = {
                params: { brandId },
                body: {
                    brandName: "UPDATEDBRAND",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful update scenarios
            Brand.findOne.mockResolvedValue(null);
            Brand.update.mockResolvedValue([
                1,
                [{ brandName: "UPDATEDBRAND" }],
            ]);
            BrandMongo.findOneAndUpdate.mockResolvedValue({
                brandName: "UPDATEDBRAND",
            });

            await updateBrand(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "La marque a bien été mise à jour.",
                })
            );
        });

        it("should not update a non-existent brand", async () => {
            const brandId = 2;
            const req = {
                params: { brandId },
                body: {
                    brandName: "NONEXISTENTBRAND",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock brand not found scenario
            Brand.findOne.mockResolvedValue(null);
            Brand.update.mockResolvedValue([0, []]);
            BrandMongo.findOneAndUpdate.mockResolvedValue(null);

            await updateBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `La marque avec l'ID ${brandId} n'existe pas.`,
                })
            );
        });

        it("should not update a brand with a duplicate code", async () => {
            const brandId = 3; // Example brand ID
            const brandName = "DUPLICATEBRAND";
            const req = {
                params: { brandId },
                body: {
                    brandName: "DUPLICATEBRAND",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Brand.findOne.mockResolvedValue({
                brandName: "DUPLICATEBRAND",
            });

            await updateBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Une marque ayant ce nom ${brandName} existe déjà.`,
                })
            );
        });
    });

    describe("deleteBrand", () => {
        it("should delete a brand successfully", async () => {
            const brandId = 1;
            const req = {
                params: { brandId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful deletion scenarios
            Brand.findOne.mockResolvedValue({ brandId: brandId });
            Brand.destroy.mockResolvedValue(1);
            BrandMongo.findOneAndDelete.mockResolvedValue({ brandId });

            await deleteBrand(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "La marque a bien été supprimée!",
                })
            );
        });

        it("should not delete a non-existent brand", async () => {
            const brandId = 2;
            const req = {
                params: { brandId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Brand.findOne.mockResolvedValue(null);

            await deleteBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Cette marque n'existe pas.`,
                })
            );
        });

        // Test for handling server errors
        it("should handle server errors during deletion", async () => {
            const brandId = 3; // Example
            const req = {
                params: { brandId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock a server error scenario
            Brand.findOne.mockRejectedValue(
                new Error("Database connection error")
            );

            await deleteBrand(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Erreur lors de la suppression de la marque",
                })
            );
        });
    });
});
