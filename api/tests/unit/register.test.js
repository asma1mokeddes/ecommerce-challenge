// Import the function to test
const { register } = require("../../src/routes/authRoutes.js");
const UserMongo = require("../../src/models/user.js");
const User = require("../../src/models/user.model.js");
const { sendActivationEmail } = require("../../src/routes/emailsRoutes.js");

// Mock dependencies
jest.mock("../../src/models/user.js", () => ({
    findOne: jest.fn().mockResolvedValue(null), // Mock no existing UserMongo user
    create: jest.fn().mockResolvedValue({ id: 1 }), // Mock UserMongo model creation
}));

jest.mock("../../src/models/user.model.js", () => ({
    findOne: jest.fn().mockResolvedValue(null), // Mock no existing User user
    create: jest.fn().mockResolvedValue({ id: 1 }), // Mock User model creation
}));

jest.mock("../../src/routes/emailsRoutes.js", () => ({
    sendActivationEmail: jest.fn().mockResolvedValue(), // Mock email sending
}));

describe("register function", () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    });

    it("should handle missing data gracefully", async () => {
        // Mock request object with missing data
        const req = {
            body: {
                // Intentionally leaving out some required fields
                firstName: "John",
                lastName: "Doe",
                // emailAddress and password are missing
            },
        };

        // Mock response object
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Execute the register function
        await register(req, res);

        // Check if the status method was called with 500 (Internal Server Error)
        expect(res.status).toHaveBeenCalledWith(500);
        // Check if the json method was called with an error message
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: expect.stringContaining("Invalid arguments"),
            })
        );
    });

    it("should handle duplicate email address", async () => {
        // Mock request object with a duplicate email address
        const req = {
            body: {
                firstName: "Asma",
                lastName: "Mokeddes",
                emailAddress: "mokeddes.asma@yopmail.com",
                password: "Asma17930303@ye!@h",
                dateOfBirth: "2000-10-07",
            },
        };

        // Mock response object
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        // Mock findOne to simulate existing user
        UserMongo.findOne.mockResolvedValue({
            emailAddress: "john@example.com",
        });

        // Execute the register function
        await register(req, res);

        // Check if the status method was called with 500 (Internal Server Error)
        expect(res.status).toHaveBeenCalledWith(500);
        // Check if the json method was called with an error message indicating duplicate email
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: expect.stringContaining("déjà utilisée"), // Part of the error message in your code
            })
        );
    });
});
