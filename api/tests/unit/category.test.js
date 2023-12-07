// Imports
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../../src/routes/categoriesRoutes.js");
const CategoryMongo = require("../../src/models/category.js");
const Category = require("../../src/models/category.model.js");

// Mock dependencies
jest.mock("../../src/models/category.js", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    create: jest.fn(),
    findOneAndDelete: jest.fn(),
}));

jest.mock("../../src/models/category.model.js", () => ({
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
}));

describe("Categories Routes", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    // Test for getCategories
    describe("getCategories", () => {
        it("should retrieve all categories", async () => {
            CategoryMongo.find.mockResolvedValue([{ categoryName: "FEMMES" }]);
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
            await getCategories(req, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });

        it("should handle no categories available", async () => {
            CategoryMongo.find.mockResolvedValue([]); // Mock an empty array return
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getCategories(req, res);

            expect(res.json).toHaveBeenCalledWith([]); // Expect an empty array response
            expect(res.status).not.toHaveBeenCalledWith(500); // Ensure no server error
        });

        // Test for handling server errors
        it("should handle server errors gracefully", async () => {
            CategoryMongo.find.mockRejectedValue(
                new Error("Database connection error")
            ); // Mock a server error
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getCategories(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(
                        "Erreur lors de la récupération des catégories."
                    ),
                })
            );
        });
    });

    describe("updateCategory", () => {
        it("should update a category successfully", async () => {
            const categoryId = 1; // Example category ID
            const req = {
                params: { categoryId },
                body: {
                    categoryName: "UPDATEDCATEGORY",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful update scenarios
            Category.findOne.mockResolvedValue(null);
            Category.update.mockResolvedValue([
                1,
                [{ categoryName: "UPDATEDCATEGORY" }],
            ]);
            CategoryMongo.findOneAndUpdate.mockResolvedValue({
                categoryName: "UPDATEDCATEGORY",
            });

            await updateCategory(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "La catégorie a bien été mise à jour.",
                })
            );
        });

        it("should not update a non-existent catégorie", async () => {
            const categoryId = 2;
            const req = {
                params: { categoryId },
                body: {
                    categoryName: "NONEXISTENTCATEGORY",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock category not found scenario
            Category.findOne.mockResolvedValue(null);
            Category.update.mockResolvedValue([0, []]);
            CategoryMongo.findOneAndUpdate.mockResolvedValue(null);

            await updateCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `La catégorie avec l'ID ${categoryId} n'existe pas.`,
                })
            );
        });

        it("should not update a category with a duplicate code", async () => {
            const categoryId = 3; // Example category ID
            const req = {
                params: { categoryId },
                body: {
                    categoryName: "DUPLICATECATEGORY",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Category.findOne.mockResolvedValue({
                categoryName: "DUPLICATECATEGORY",
            });

            await updateCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `La catégorie ayant pour nom ${req.body.categoryName} existe déjà.`,
                })
            );
        });
    });

    describe("updateCategory", () => {
        it("should delete a category successfully", async () => {
            const categoryId = 1;
            const req = {
                params: { categoryId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock successful deletion scenarios
            Category.findOne.mockResolvedValue({ categoryId: categoryId });
            Category.destroy.mockResolvedValue(1);
            CategoryMongo.findOneAndDelete.mockResolvedValue({ categoryId });

            await deleteCategory(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "La catégorie a bien été supprimée!",
                })
            );
        });

        it("should not delete a non-existent category", async () => {
            const categoryId = 2;
            const req = {
                params: { categoryId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            Category.findOne.mockResolvedValue(null);

            await deleteCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Cette catégorie n'existe pas.`,
                })
            );
        });

        // Test for handling server errors
        it("should handle server errors during deletion", async () => {
            const categoryId = 3; // Example
            const req = {
                params: { categoryId },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock a server error scenario
            Category.findOne.mockRejectedValue(
                new Error("Database connection error")
            );

            await deleteCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message:
                        "Erreur lors de la suppression de cette catégorie !",
                })
            );
        });
    });
});
