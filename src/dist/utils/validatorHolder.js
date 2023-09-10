"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (Schema) => {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(404).json({
                message: "validation error",
                data: error,
            });
        }
        else {
            next();
        }
    };
};
// else {
//     next();
//   }
