import { body, validationResult } from 'express-validator';

// Validation middleware
export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        });
    }
    next();
};

// User registration validation
export const validateUserRegistration = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    validateRequest
];

// User login validation
export const validateUserLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
];

// Food item validation
export const validateFoodItem = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Food name must be between 2 and 100 characters'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    body('price')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number'),
    body('category')
        .notEmpty()
        .withMessage('Category is required'),
    validateRequest
];

// Order validation
export const validateOrder = [
    body('items')
        .isArray({ min: 1 })
        .withMessage('Order must contain at least one item'),
    body('amount')
        .isFloat({ min: 0.01 })
        .withMessage('Amount must be a positive number'),
    body('address')
        .isObject()
        .withMessage('Address is required'),
    body('address.firstName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('address.lastName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Last name is required'),
    body('address.email')
        .isEmail()
        .withMessage('Valid email is required'),
    body('address.street')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Street address is required'),
    body('address.city')
        .trim()
        .isLength({ min: 2 })
        .withMessage('City is required'),
    body('address.state')
        .trim()
        .isLength({ min: 2 })
        .withMessage('State is required'),
    body('address.zipcode')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Valid zip code is required'),
    body('address.phone')
        .isMobilePhone()
        .withMessage('Valid phone number is required'),
    validateRequest
];