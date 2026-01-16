import { body, validationResult } from 'express-validator';

export const validateCreateIssues = [
    // Validate 'repoOwner' field
    body('repository.owner')
        .exists({ checkNull: true })
        .withMessage('Owner is required')
        .isString()
        .withMessage('Owner must be a string')
        .trim().notEmpty()
        .withMessage('Owner must have at least 1 character'),
    
    // Validate 'repoName' field
    body('repository.name')
        .exists({ checkNull: true })
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .trim().notEmpty()
        .withMessage('Name must have at least 1 character'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];