const { z } = require("zod");

const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
    }
};

module.exports = validate;
