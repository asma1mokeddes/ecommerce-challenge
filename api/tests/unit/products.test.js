// Imports
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
} = require("../../src/routes/productsRoutes");
const ProductMongo = require("../../src/models/product.js");
const Product = require("../../src/models/product.model.js");

// Mocks
jest.mock("../../src/models/product.js", () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
}));

jest.mock("../../src/models/product.model.js", () => ({
    findOne: jest.fn(),
    create: jest.fn(),
}));

describe("Product Routes", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    // Test for getProducts
    describe("getProducts", () => {
        it("should retrieve all products", async () => {
            ProductMongo.find.mockResolvedValue([
                { productName: "Product1", price: 100 },
            ]);
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            await getProducts(req, res);

            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        });
    });

    describe.only("getProduct", () => {
        // Test for successfully retrieving a specific product
        it.only("should retrieve a specific product by ID", async () => {
            const productId = "123"; // Example product ID
            const req = { params: { productId } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock the database response
            ProductMongo.findOne.mockResolvedValue({
                productId: productId,
                productName: "SpecificProduct",
                price: 200,
                // Other product details
            });

            await getProduct(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    productId: productId,
                    productName: "SpecificProduct",
                    // Assert other product details
                })
            );
        });

        // Test for product not found
        it("should return a 404 if the product does not exist", async () => {
            const productId = "unknown"; // Non-existent product ID
            const req = { params: { productId } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            ProductMongo.findOne.mockResolvedValue(null);

            await getProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: `Product with ID ${productId} not found`,
                })
            );
        });
    });

    //update
    describe("updateProduct", () => {
        it("should successfully update an existing product", async () => {
            const productId = "123"; // Example product ID
            const updatedData = {
                productName: "UpdatedProduct",
                description: "New description of the product",
                price: 250,
                image: "updated-image-url.jpg",
                new: true,
                category: "updatedCategoryID",
                brand: "updatedBrandID",
                promo: "updatedPromoID",
            };
            const req = {
                params: { productId },
                body: updatedData,
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock the findOneAndUpdate method to simulate a successful update
            ProductMongo.findOneAndUpdate.mockResolvedValue({
                productId: productId,
                ...updatedData,
            });

            await updateProduct(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    productName: updatedData.productName,
                    description: updatedData.description,
                    price: updatedData.price,
                    image: updatedData.image,
                    new: updatedData.new,
                    category: updatedData.category,
                    brand: updatedData.brand,
                    promo: updatedData.promo,
                })
            );
        });

        it("should return a 404 if the product to update does not exist", async () => {
            const productId = "nonexistentId"; // Non-existent product ID
            const req = {
                params: { productId },
                body: {
                    productName: "NonExistentProduct",
                    description: "Description for non-existent product",
                    price: 300,
                    image: "nonexistent-image-url.jpg",
                    new: false,
                    category: "nonexistentCategoryID",
                    brand: "nonexistentBrandID",
                    promo: "nonexistentPromoID",
                },
            };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            ProductMongo.findOneAndUpdate.mockResolvedValue(null);

            // Call the function with the mocked request and response
            await updateProduct(req, res);

            // Assertions to check the appropriate handling of non-existent product
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: `Product with ID ${productId} not found`,
                })
            );
        });
    });

    //delete
    describe("deleteProduct", () => {
        // Test for successfully deleting a product
        it("should successfully delete an existing product", async () => {
            const productId = "123"; // Example product ID
            const req = { params: { productId } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            // Mock the database response for deletion
            ProductMongo.findOneAndDelete.mockResolvedValue({ productId });

            // Call the function with the mocked request and response
            await deleteProduct(req, res);

            // Assertions to check if the product was deleted correctly
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: `Product with ID ${productId} successfully deleted`,
                })
            );
        });

        // Test for product not found
        it("should return a 404 if the product to delete does not exist", async () => {
            const productId = "nonexistentId"; // Non-existent product ID
            const req = { params: { productId } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

            ProductMongo.findOneAndDelete.mockResolvedValue(null);

            await deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: `Product with ID ${productId} not found`,
                })
            );
        });
    });
});
